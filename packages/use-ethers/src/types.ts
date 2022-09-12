import { Token } from "@dahlia-labs/token-utils";
import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";

import type { Multicall2 } from "./generated";
import { decimalsMulticall, nameMulticall, symbolMulticall } from "./token";

export type ProviderOrSigner = Provider | Signer;

export type Call = Readonly<Multicall2.CallStruct>;

export type Return = Awaited<ReturnType<Multicall2["callStatic"]["aggregate"]>>;

export type Multicall<T> = Readonly<{
  call: Call;
  parseReturn: (returnData: string) => T;
}>;

export type Metacall<T, U extends unknown[]> = Readonly<{
  multicalls: readonly [...{ [I in keyof U]: Multicall<U[I]> }];
  metaParse: (data: Readonly<U>) => Readonly<T>;
}>;

export const getTokenMetacall = (
  address: string,
  chainId: number
): Metacall<Token | null, [string, string, number]> => ({
  multicalls: [
    nameMulticall(address),
    symbolMulticall(address),
    decimalsMulticall(address),
  ] as const,
  metaParse: (data) =>
    new Token({
      chainId,
      address,
      name: data[0],
      symbol: data[1],
      decimals: data[2],
    }),
});
