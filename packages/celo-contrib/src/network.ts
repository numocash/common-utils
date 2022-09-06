export enum ChainId {
  Mainnet = 42220,
  Alfajores = 44787,
  Baklava = 62320,
}

export enum NetworkNames {
  Alfajores = "Alfajores",
  Baklava = "Baklava",
  Mainnet = "Mainnet",
}

export interface Network {
  name: NetworkNames;
  rpcUrl: string;
  graphQl: string;
  explorer: string;
  chainId: ChainId;
}

export const Alfajores: Network = {
  name: NetworkNames.Alfajores,
  rpcUrl: "https://alfajores-forno.celo-testnet.org",
  graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
  explorer: "https://alfajores.celoscan.io/",
  chainId: ChainId.Alfajores,
};
export const Baklava: Network = {
  name: NetworkNames.Baklava,
  rpcUrl: "https://baklava-forno.celo-testnet.org",
  graphQl: "https://baklava-blockscout.celo-testnet.org/graphiql",
  explorer: "https://baklava-blockscout.celo-testnet.org",
  chainId: ChainId.Baklava,
};
export const Mainnet: Network = {
  name: NetworkNames.Mainnet,
  rpcUrl: "https://forno.celo.org",
  graphQl: "https://explorer.celo.org/graphiql",
  explorer: "https://celoscan.io",
  chainId: ChainId.Mainnet,
};

export const CHAIN_ID_TO_NETWORK = {
  [ChainId.Mainnet]: Mainnet,
  [ChainId.Alfajores]: Alfajores,
  [ChainId.Baklava]: Baklava,
};

/**
 * Gets the Network associated with a chain id.
 * @param network
 * @returns
 */
export const chainIdToNetwork = (env: ChainId): Network =>
  CHAIN_ID_TO_NETWORK[env];
