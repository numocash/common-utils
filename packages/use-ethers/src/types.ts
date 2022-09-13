import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";

import type { Multicall2 } from "./generated";

export type ProviderOrSigner = Provider | Signer;

export type Call = Readonly<Multicall2.CallStruct>;

export type Return = Awaited<ReturnType<Multicall2["callStatic"]["aggregate"]>>;

export type Multicall<T> = Readonly<{
  call: Call;
  parseReturn: (returnData: string) => T;
}>;
