import type { ChainsV1 } from "./types";

type AddressMap = { [chain in ChainsV1]: string };

export const FACTORY: AddressMap = {
  goerli: "0x9e9815D2019787A2eca3E9BB1fd6cd95ae43eF7E",
  arbitrum: "0xd7a59E4D53f08AE80F8776044A764d97cd96DEcB",
};
export const LIQUIDITYMANAGER: AddressMap = {
  goerli: "0x1b55E429f8D1e6F15754Da9D3a43CF5d02CdADC4",
  arbitrum: "0x0d9A2Eb3CBe96deeF3d6d62c5f3B620d5021941a",
};
export const LENDGINEROUTER: AddressMap = {
  goerli: "0x74c2188B50451D91d455Fcc0d16299A0A1777b99",
  arbitrum: "0x27972ad7875BC17ADA5922C80db45B015DD554Df",
};
