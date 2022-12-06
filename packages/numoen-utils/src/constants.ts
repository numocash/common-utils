import type { ChainsV1 } from "./types";

type AddressMap = { [chain in ChainsV1]: string };

export const FACTORY: AddressMap = {
  goerli: "0x1B327eFf5033922B0f88FC4D56C29d7AF5a8ecdB",
  arbitrum: "0x1B327eFf5033922B0f88FC4D56C29d7AF5a8ecdB",
};
export const LIQUIDITYMANAGER: AddressMap = {
  goerli: "0x7F5B1B07b91Ac3853891E6837143F77F38466D78",
  arbitrum: "0x7F5B1B07b91Ac3853891E6837143F77F38466D78",
};
export const LENDGINEROUTER: AddressMap = {
  goerli: "0xE9c7FD75768c1104440590607bdCE5a7Be05333A",
  arbitrum: "0xE9c7FD75768c1104440590607bdCE5a7Be05333A",
};
