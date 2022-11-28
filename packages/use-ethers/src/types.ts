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

export const chainID = {
  mainnet: 1,
  goerli: 5,
  optimism: 10,
  optimismGoerli: 420,
  polygon: 137,
  polygonMumbai: 80_001,
  arbitrum: 42_161,
  arbitrumGoerli: 421_613,
  celo: 42_220,
  celoAlfajores: 44_787,
} as const;

export type ChainType = keyof typeof chainID;
