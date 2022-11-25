import { TokenAmount } from "@dahlia-labs/token-utils";
import type { Multicall, Multicall2 } from "@dahlia-labs/use-ethers";
import { fetchMulticalls, totalSupplyMulticall } from "@dahlia-labs/use-ethers";
import type { BigNumber } from "@ethersproject/bignumber";

import { LIQUIDITYMANAGER } from "./constants";
import { lendgineInterface, liquidityManagerInterface } from "./contracts";
import type {
  ILendgineImmutables,
  IMarket,
  IMarketInfo,
  IMarketUserInfo,
} from "./types";

export const totalLiquidityMulticall = (
  market: IMarket
): Multicall<TokenAmount> =>
  ({
    call: {
      target: market.address,
      callData: lendgineInterface.encodeFunctionData("totalLiquidity"),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        market.pair.lp,
        lendgineInterface
          .decodeFunctionResult("totalLiquidity", returnData)
          .toString()
      ),
  } as const);

export const totalLiquidityBorrowedMulticall = (
  market: IMarket
): Multicall<TokenAmount> =>
  ({
    call: {
      target: market.address,
      callData: lendgineInterface.encodeFunctionData("totalLiquidityBorrowed"),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        market.pair.lp,
        lendgineInterface
          .decodeFunctionResult("totalLiquidityBorrowed", returnData)
          .toString()
      ),
  } as const);

export const rewardPerLiquidityStoredMulticall = (
  market: IMarket
): Multicall<TokenAmount> =>
  ({
    call: {
      target: market.address,
      callData: lendgineInterface.encodeFunctionData(
        "rewardPerLiquidityStored"
      ),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        market.pair.speculativeToken,
        lendgineInterface
          .decodeFunctionResult("rewardPerLiquidityStored", returnData)
          .toString()
      ),
  } as const);

export const lastUpdateMulticall = (market: IMarket): Multicall<number> =>
  ({
    call: {
      target: market.address,
      callData: lendgineInterface.encodeFunctionData("lastUpdate"),
    },
    parseReturn: (returnData: string) =>
      +lendgineInterface
        .decodeFunctionResult("lastUpdate", returnData)
        .toString(),
  } as const);

export const getPositionMulticall = (
  tokenID: number,
  market: IMarket
): Multicall<IMarketUserInfo> => ({
  call: {
    target: LIQUIDITYMANAGER,
    callData: liquidityManagerInterface.encodeFunctionData("getPosition", [
      tokenID,
    ]),
  },
  parseReturn: (returnData: string) => {
    const data = liquidityManagerInterface.decodeFunctionResult(
      "getPosition",
      returnData
    ) as unknown as {
      liquidity: BigNumber;
      rewardPerLiquidityPaid: BigNumber;
      tokensOwed: BigNumber;
    };

    return {
      tokenID,
      market,
      liquidity: new TokenAmount(market.pair.lp, data.liquidity.toString()),
      rewardPerLiquidityPaid: new TokenAmount(
        market.pair.speculativeToken,
        data.rewardPerLiquidityPaid.toString()
      ),
      tokensOwed: new TokenAmount(
        market.pair.speculativeToken,
        data.rewardPerLiquidityPaid.toString()
      ),
    };
  },
});

export const factoryMulticall = (address: string): Multicall<string> =>
  ({
    call: {
      target: address,
      callData: lendgineInterface.encodeFunctionData("factory"),
    },
    parseReturn: (returnData: string) =>
      lendgineInterface.decodeFunctionResult("factory", returnData).toString(),
  } as const);

export const pairMulticall = (lendgineAddress: string): Multicall<string> =>
  ({
    call: {
      target: lendgineAddress,
      callData: lendgineInterface.encodeFunctionData("pair"),
    },
    parseReturn: (returnData: string) =>
      lendgineInterface.decodeFunctionResult("pair", returnData).toString(),
  } as const);

export const getLendgineInfo = async (
  multicallContract: Multicall2,
  market: IMarket
): Promise<IMarketInfo> => {
  const multicallData = await fetchMulticalls(
    [
      totalLiquidityMulticall(market),
      totalLiquidityBorrowedMulticall(market),
      rewardPerLiquidityStoredMulticall(market),
      totalSupplyMulticall(market.token),
      lastUpdateMulticall(market),
    ],
    multicallContract
  );

  return {
    totalLiquidity: multicallData[0],
    totalLiquidityBorrowed: multicallData[1],
    rewardPerLiquidityStored: multicallData[2],
    totalSupply: multicallData[3],
    lastUpdate: multicallData[4],
  };
};

export const getLendgineImmutables = async (
  multicallContract: Multicall2,
  lendgineAddress: string
): Promise<ILendgineImmutables> => {
  const multicallData = await fetchMulticalls(
    [factoryMulticall(lendgineAddress), pairMulticall(lendgineAddress)],
    multicallContract
  );

  return {
    factory: multicallData[0],
    pair: multicallData[1],
  };
};
