import type { ChainId } from "@dahlia-labs/celo-contrib";
import { Multicall as MulticallAddress } from "@dahlia-labs/celo-contrib";
import chunk from "lodash/chunk";

import MULTICALL_ABI from "./abis/multicall2.json";
import { getContract } from "./contracts";
import type { Multicall2 } from "./generated";
import type { Call, Multicall, ProviderOrSigner } from "./types";

export const getMulticall = (
  chainID: ChainId,
  provider: ProviderOrSigner
): Multicall2 =>
  getContract(MulticallAddress[chainID], MULTICALL_ABI, provider) as Multicall2;

export async function fetchMulticalls<T extends unknown[]>(
  multicalls: readonly [...{ [I in keyof T]: Multicall<T[I]> }],
  multicallContract: Multicall2,
  maxChunk = 100
): Promise<Readonly<T>> {
  const data = await fetchCalls(
    multicalls.map((m) => m.call),
    multicallContract,
    maxChunk
  );
  return data.map((v, i) => {
    return multicalls[i].parseReturn(v);
  }) as T;
}

export const fetchCalls = async (
  calls: readonly Call[],
  multicallContract: Multicall2,
  maxChunk = 100
): Promise<Readonly<string[]>> => {
  const callChunks = chunk(calls, maxChunk);
  return (
    await Promise.all(
      callChunks.map((c) => multicallContract?.callStatic.aggregate(c))
    )
  ).flatMap((c) => c?.returnData);
};
