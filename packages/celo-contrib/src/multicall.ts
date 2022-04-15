import { ChainId } from "./network";

export const Multicall: { [chainId in ChainId]: string } = {
  [ChainId.Mainnet]: "0x9aac9048fC8139667D6a2597B902865bfdc225d3",
  [ChainId.Alfajores]: "0x9aac9048fC8139667D6a2597B902865bfdc225d3",
  [ChainId.Baklava]: "0x9aac9048fC8139667D6a2597B902865bfdc225d3",
};
