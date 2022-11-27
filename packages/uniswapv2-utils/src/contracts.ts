import { TokenAmount } from "@dahlia-labs/token-utils";
import type { Multicall, ProviderOrSigner } from "@dahlia-labs/use-ethers";
import { getContract } from "@dahlia-labs/use-ethers";
import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";

import PAIR_ABI from "./abis/UniswapV2Pair.json";
import type {
  UniswapV2Pair,
  UniswapV2PairInterface,
} from "./generated/UniswapV2Pair";
import type { IUniswapV2Pair } from "./types";

export function getPairInterface(): UniswapV2PairInterface {
  return new Interface(PAIR_ABI) as UniswapV2PairInterface;
}

export const pairInterface = getPairInterface();

export const getUniswapPairContract = (
  address: string,
  provider: ProviderOrSigner
): UniswapV2Pair => getContract(address, PAIR_ABI, provider) as UniswapV2Pair;

export const reservesMulticall = (
  pair: IUniswapV2Pair
): Multicall<Readonly<[TokenAmount, TokenAmount]>> =>
  ({
    call: {
      target: pair.address,
      callData: pairInterface.encodeFunctionData("getReserves"),
    },
    parseReturn: (returnData: string) => {
      const data = pairInterface.decodeFunctionResult(
        "getReserves",
        returnData
      ) as [BigNumber, BigNumber];
      return [
        new TokenAmount(pair.tokens[0], data[0].toString()),
        new TokenAmount(pair.tokens[1], data[1].toString()),
      ] as const;
    },
  } as const);
