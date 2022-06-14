import { ChainId } from "./network";

export const Multicall: { [chainId in ChainId]: string } = {
  [ChainId.Mainnet]: "0x7b4a79f847267c9370d29Ea74dc4d9D9Cff45942",
  [ChainId.Alfajores]: "0x9542dEDe04a20a0f7bC192Ed3aa20CA7eE7772Fd",
  [ChainId.Baklava]: "0x9aac9048fC8139667D6a2597B902865bfdc225d3",
};
