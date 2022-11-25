import { TokenAmount } from "@dahlia-labs/token-utils";
import type { Multicall, Multicall2 } from "@dahlia-labs/use-ethers";
import { fetchMulticalls, totalSupplyMulticall } from "@dahlia-labs/use-ethers";

import { pairInterface } from "./contracts";
import { factoryMulticall } from "./lendgineMulticall";
import type { IPair, IPairImmutables, IPairInfo } from "./types";

export const reserve0Multicall = (pair: IPair): Multicall<TokenAmount> =>
  ({
    call: {
      target: pair.address,
      callData: pairInterface.encodeFunctionData("reserve0"),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        pair.baseToken,
        pairInterface.decodeFunctionResult("reserve0", returnData).toString()
      ),
  } as const);

export const reserve1Multicall = (pair: IPair): Multicall<TokenAmount> =>
  ({
    call: {
      target: pair.address,
      callData: pairInterface.encodeFunctionData("reserve1"),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        pair.speculativeToken,
        pairInterface.decodeFunctionResult("reserve1", returnData).toString()
      ),
  } as const);

export const baseMulticall = (pairAddress: string): Multicall<string> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("base"),
    },
    parseReturn: (returnData: string) =>
      pairInterface.decodeFunctionResult("base", returnData).toString(),
  } as const);

export const speculativeMulticall = (pairAddress: string): Multicall<string> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("speculative"),
    },
    parseReturn: (returnData: string) =>
      pairInterface.decodeFunctionResult("speculative", returnData).toString(),
  } as const);

export const lendgineMulticall = (pairAddress: string): Multicall<string> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("lendgine"),
    },
    parseReturn: (returnData: string) =>
      pairInterface.decodeFunctionResult("lendgine", returnData).toString(),
  } as const);

export const upperBoundMulticall = (pairAddress: string): Multicall<string> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("upperBound"),
    },
    parseReturn: (returnData: string) =>
      pairInterface.decodeFunctionResult("lendgine", returnData).toString(),
  } as const);

export const baseScaleFactorMulticall = (
  pairAddress: string
): Multicall<number> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("baseScaleFactor"),
    },
    parseReturn: (returnData: string) =>
      +pairInterface
        .decodeFunctionResult("baseScaleFactor", returnData)
        .toString(),
  } as const);

export const speculativeScaleFactorMulticall = (
  pairAddress: string
): Multicall<number> =>
  ({
    call: {
      target: pairAddress,
      callData: pairInterface.encodeFunctionData("speculativeScaleFactor"),
    },
    parseReturn: (returnData: string) =>
      +pairInterface
        .decodeFunctionResult("speculativeScaleFactor", returnData)
        .toString(),
  } as const);

export const getPairInfo = async (
  multicallContract: Multicall2,
  pair: IPair
): Promise<IPairInfo> => {
  const multicallData = await fetchMulticalls(
    [
      reserve0Multicall(pair),
      reserve1Multicall(pair),
      totalSupplyMulticall(pair.lp),
    ],
    multicallContract
  );

  return {
    baseAmount: multicallData[0],
    speculativeAmount: multicallData[1],
    totalLPSupply: multicallData[2],
  };
};

export const getPairImmutables = async (
  multicallContract: Multicall2,
  pairAddress: string
): Promise<IPairImmutables> => {
  const multicallData = await fetchMulticalls(
    [
      factoryMulticall(pairAddress),
      lendgineMulticall(pairAddress),
      baseMulticall(pairAddress),
      speculativeMulticall(pairAddress),
      upperBoundMulticall(pairAddress),
      baseScaleFactorMulticall(pairAddress),
      speculativeScaleFactorMulticall(pairAddress),
    ],
    multicallContract
  );

  return {
    factory: multicallData[0],
    lendgine: multicallData[1],
    base: multicallData[2],
    speculative: multicallData[3],
    upperBound: multicallData[4],
    baseScaleFactor: multicallData[5],
    speculativeScaleFactor: multicallData[6],
  };
};
