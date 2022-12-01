import type { ChainsV1 } from "./types";

type AddressMap = { [chain in ChainsV1]: string };

export const FACTORY: AddressMap = {
  goerli: "0xd7a59E4D53f08AE80F8776044A764d97cd96DEcB",
  arbitrum: "0xd7a59E4D53f08AE80F8776044A764d97cd96DEcB",
};
export const LIQUIDITYMANAGER: AddressMap = {
  goerli: "0x0d9A2Eb3CBe96deeF3d6d62c5f3B620d5021941a",
  arbitrum: "0x0d9A2Eb3CBe96deeF3d6d62c5f3B620d5021941a",
};
export const LENDGINEROUTER: AddressMap = {
  goerli: "0x27972ad7875BC17ADA5922C80db45B015DD554Df",
  arbitrum: "0x27972ad7875BC17ADA5922C80db45B015DD554Df",
};
