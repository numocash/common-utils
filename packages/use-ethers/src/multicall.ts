import type { ChainId } from "@dahlia-labs/celo-contrib";
import { Multicall as MulticallAddress } from "@dahlia-labs/celo-contrib";
import chunk from "lodash/chunk";

import MULTICALL_ABI from "./abis/multicall2.json";
import { getContract } from "./contracts";
import type { Multicall2 } from "./generated";
import type { Call, Metacall, Multicall, ProviderOrSigner } from "./types";

export const getMulticall = (
  chainID: ChainId,
  provider: ProviderOrSigner
): Multicall2 =>
  getContract(MulticallAddress[chainID], MULTICALL_ABI, provider) as Multicall2;

// export type Multicall<T> = Readonly<{
//   call: Call;
//   parseReturn: (returnData: string) => T;
// }>;

// export type Metacall<T, U extends unknown[]> = Readonly<{
//   multicalls: readonly [...{ [I in keyof U]: Multicall<U[I]> }];
//   metaParse: (data: U) => T;
// }>;

//: Promise<readonly [...{ [I in keyof T]: ReturnType<T[I]> }]>

// T is the return types of the various metacalls
export async function fetchMetacalls<
  T extends ((data: unknown[]) => unknown)[]
>(
  metacalls: readonly [
    ...{ [I in keyof T]: Metacall<ReturnType<T[I]>, Parameters<T[I]>> }
  ],
  multicallContract: Multicall2,
  maxChunk = 100
) {
  const multicallData = await fetchMulticalls(
    metacalls.flatMap((m) => m.multicalls),
    multicallContract,
    maxChunk
  );

  // find sizes of chunks
  const chunkSizes = metacalls.map((m) => m.multicalls.length);

  // const testData = [[1, 2, 3], [4, 5, 6], [7, 8], [9]] as const;

  // const flatData = testData.flat();

  // const testChunkSizes: readonly number[] = testData.map((t) => t.length);

  // let chunkedData: typeof flatData[] = [];
  // let remainingData: typeof flatData = flatData;

  // for (const chunkSize of testChunkSizes) {
  //   chunkedData = [...chunkedData, remainingData.slice(0, chunkSize)];
  //   remainingData = remainingData.slice(chunkSize);
  // }

  let chunkedData: typeof multicallData[] = [];
  let remainingData: typeof multicallData = multicallData;

  for (const chunkSize of chunkSizes) {
    chunkedData = [...chunkedData, remainingData.slice(0, chunkSize)];
    remainingData = remainingData.slice(chunkSize);
  }

  return metacalls.map(
    (m, i) =>
      m.metaParse(
        (chunkedData as readonly [...{ [I in keyof T]: Parameters<T[I]> }])[i]
      ) as [...{ [I in keyof T]: ReturnType<T[I]> }][typeof i]
  );
}

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
