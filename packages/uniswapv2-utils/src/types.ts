import type { Token, TokenAmount } from "@dahlia-labs/token-utils";

export interface IUniswapV2Pair {
  address: string;
  lpToken: Token;
  tokens: readonly [Token, Token];
}

export interface IUniswapV2PairInfo {
  lpTotalSupply: TokenAmount;
  reserves: readonly [TokenAmount, TokenAmount];
}
