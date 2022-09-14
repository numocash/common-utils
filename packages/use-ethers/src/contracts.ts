import { getAddress } from "@ethersproject/address";
import type { ContractInterface } from "@ethersproject/contracts";
import { Contract } from "@ethersproject/contracts";

import type { ProviderOrSigner } from "./types";

export function getContract(
  address: string,
  ABI: ContractInterface,
  provider: ProviderOrSigner
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, provider);
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
