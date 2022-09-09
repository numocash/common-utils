import chunk from "lodash/chunk";

import type { Multicall2 } from "./generated";
import type { Call, Multicall } from "./types";

export async function fetchMulticall<T extends unknown[]>(
  multicalls: readonly [...{ [I in keyof T]: Multicall<T[I]> }],
  multicallContract: Multicall2,
  maxChunk = 100
) {
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
) => {
  const callChunks = chunk(calls, maxChunk);
  return (
    await Promise.all(
      callChunks.map((c) => multicallContract?.callStatic.aggregate(c))
    )
  ).flatMap((c) => c?.returnData);
};
