import type { ChainsV1 } from "./types";

type AddressMap = { [chain in ChainsV1]: string };

export const FACTORY: AddressMap = {
  goerli: "0x926DE2040e0f0DCC6524d3cFADf25A59A8f16Ee7",
};
export const LIQUIDITYMANAGER: AddressMap = {
  goerli: "0x1b8dd4f91b5d8b814fbc03b75171be9792b4ab69",
};
export const LENDGINEROUTER: AddressMap = {
  goerli: "0xd1a74569f97eceb08800b4349a9dfd02fbbfab2f",
};
