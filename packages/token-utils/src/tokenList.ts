import { Token } from "./token";

/**
 * These types are all based from the @solana/spl-token-registry package.
 *
 * We re-export them here so we do not have to have a hard dependency on
 * that package, which is massive.
 */

/**
 * Known origin chains.
 */
export const ORIGIN_CHAINS = [
  "bitcoin",
  "ethereum",
  "terra",
  "avalanche",
  "binance",
  "celo",
  "polygon",
  "fantom",
  "polygon",
  "heco",
] as const;

/**
 * Known origin chains.
 */
export type OriginChain = typeof ORIGIN_CHAINS[number];

/**
 * Token extensions with additional information.
 */
export type TokenExtensions = {
  readonly website?: string;
  readonly bridgeContract?: string;
  readonly assetContract?: string;
  readonly address?: string;
  readonly explorer?: string;
  readonly twitter?: string;
  readonly github?: string;
  readonly medium?: string;
  readonly tgann?: string;
  readonly tggroup?: string;
  readonly discord?: string;
  readonly serumV3Usdt?: string;
  readonly serumV3Usdc?: string;
  readonly coingeckoId?: string;
  readonly imageUrl?: string;
  readonly description?: string;

  /**
   * Mints of the underlying tokens that make up this token.
   * E.g. a Mobius USDC-USDT LP token would use the USDC and USDT mints.
   */
  readonly underlyingTokens?: string[];
  /**
   * The protocol that this token comes from.
   * E.g. `wormhole-v1`, `wormhole-v2`, `allbridge`, `optics`, `mobius`.
   */
  readonly source?: string;

  /*
   ** Link to the source's website where you can acquire this token
   */
  readonly sourceUrl?: string;
  /**
   * The currency code of what this token represents, e.g. BTC, ETH, USD.
   */
  readonly currency?: string;
  /**
   * If this token is a bridged token, this is the chain that the asset originates from.
   */
  readonly originChain?: OriginChain;
};

/**
 * Token info.
 */
export type TokenInfo = {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: TokenExtensions;
};

/**
 * A list of tokens, based off of the Uniswap standard.
 */
export interface TokenList {
  readonly name: string;
  readonly logoURI: string;
  readonly tags: { [tag: string]: TagDetails };
  readonly timestamp: string;
  readonly tokens: TokenInfo[];
}

/**
 * Tag details.
 */
export interface TagDetails {
  readonly name: string;
  readonly description: string;
}

/**
 * Creates a token map from a TokenList.
 * @param tokens
 * @returns
 */
export const makeTokenMap = (tokenList: TokenList): Record<string, Token> => {
  const ret: Record<string, Token> = {};
  tokenList.tokens.forEach((item) => {
    ret[item.address] = new Token(item);
  });
  return ret;
};

/**
 * Dedupes a list of tokens, picking the first instance of the token in a list.
 * @param tokens
 * @returns
 */
export const dedupeTokens = (tokens: TokenInfo[]): TokenInfo[] => {
  const seen = new Set<string>();
  return tokens.filter((token) => {
    const tokenID = `${token.address}_${token.chainId}`;
    if (seen.has(tokenID)) {
      return false;
    } else {
      seen.add(tokenID);
      return true;
    }
  });
};
