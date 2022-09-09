import type { ChainId } from "@dahlia-labs/celo-contrib";
import { Multicall } from "@dahlia-labs/celo-contrib";

import MULTICALL_ABI from "./abis/multicall2.json";
import { getContract } from "./contracts";
import type { Multicall2 } from "./generated";
import type { ProviderOrSigner } from "./types";

export const getMulticall = (
  chainID: ChainId,
  provider: ProviderOrSigner
): Multicall2 =>
  getContract(Multicall[chainID], MULTICALL_ABI, provider) as Multicall2;
