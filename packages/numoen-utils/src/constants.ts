import type { ChainsV1 } from "./types";

type AddressMap = { [chain in ChainsV1]: string };

export const FACTORY: AddressMap = {
  goerli: "0x010797814E619634c0A6bbaA9FaCa48FBD0D3E33",
};
export const LIQUIDITYMANAGER: AddressMap = {
  goerli: "0x82d4D8a3609F8C5d19b59339A75E2a25AfC3e564",
};
export const LENDGINEROUTER: AddressMap = {
  goerli: "0x0a0E6120228f521f38b16dD12aA6CD859c307bC4",
};
