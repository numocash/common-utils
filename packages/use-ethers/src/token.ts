import type { Token } from "@dahlia-labs/token-utils";
import { Interface } from "@ethersproject/abi";

import ERC20_ABI from "./abis/erc20.json";
import { getContract } from "./contracts";
import type { Erc20, Erc20Interface } from "./generated/Erc20";
import type { ProviderOrSigner } from "./types";

export function getTokenInterface(): Erc20Interface {
  return new Interface(ERC20_ABI) as Erc20Interface;
}

export const getTokenContractFromAddress = (
  address: string,
  provider: ProviderOrSigner
): Erc20 => getContract(address, ERC20_ABI, provider) as Erc20;

export const getTokenContract = (
  token: Token,
  provider: ProviderOrSigner
): Erc20 => getContract(token.address, ERC20_ABI, provider) as Erc20;
