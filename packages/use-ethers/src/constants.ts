import type { chainID } from "./types";

type ChainID = keyof typeof chainID;

export const MulticallAddress: { [chain in ChainID]: string } = {
  mainnet: "0xca11bde05977b3631167028862be2a173976ca11",
  goerli: "0xca11bde05977b3631167028862be2a173976ca11",
  optimism: "0xca11bde05977b3631167028862be2a173976ca11",
  optimismGoerli: "0xca11bde05977b3631167028862be2a173976ca11",
  arbitrum: "0xca11bde05977b3631167028862be2a173976ca11",
  arbitrumGoerli: "0xca11bde05977b3631167028862be2a173976ca11",
  polygon: "0xca11bde05977b3631167028862be2a173976ca11",
  polygonMumbai: "0xca11bde05977b3631167028862be2a173976ca11",
  celo: "0x7b4a79f847267c9370d29Ea74dc4d9D9Cff45942",
  celoAlfajores: "0x9542dEDe04a20a0f7bC192Ed3aa20CA7eE7772Fd",
};
