import chunk from "lodash/chunk";

import MULTICALL_ABI from "./abis/multicall2.json";
import { MulticallAddress } from "./constants";
import { getContract } from "./contracts";
import type { Multicall2 } from "./generated";
import type { Call, ChainType, Multicall, ProviderOrSigner } from "./types";

export const getMulticall = (
  provider: ProviderOrSigner,
  chain: ChainType
): Multicall2 =>
  getContract(MulticallAddress[chain], MULTICALL_ABI, provider) as Multicall2;

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
