import type { Price, Token, TokenAmount } from "@dahlia-labs/token-utils";
import type { IUniswapV2Pair } from "@dahlia-labs/uniswapv2-utils";
import type { chainID } from "@dahlia-labs/use-ethers";

export type ChainsV1 = keyof Pick<typeof chainID, "goerli">;

export interface IMarket {
  token: Token;

  address: string;
  pair: IPair;
  referenceMarket: IUniswapV2Pair;
}

export interface IMarketInfo {
  totalLiquidity: TokenAmount;
  totalLiquidityBorrowed: TokenAmount;
  rewardPerLiquidityStored: TokenAmount;
  totalSupply: TokenAmount;
  lastUpdate: number;
}

export interface IMarketUserInfo {
  tokenID: number;
  liquidity: TokenAmount;
  market: IMarket;
  rewardPerLiquidityPaid: TokenAmount;
  tokensOwed: TokenAmount;
}

export interface IPair {
  speculativeToken: Token;
  baseToken: Token;

  lp: Token;

  bound: Price;
  baseScaleFactor: number;
  speculativeScaleFactor: number;

  address: string;
}

export interface IPairInfo {
  baseAmount: TokenAmount;
  speculativeAmount: TokenAmount;
  totalLPSupply: TokenAmount;
}

export interface IPairImmutables {
  factory: string;
  lendgine: string;
  base: string;
  speculative: string;
  upperBound: string;
  baseScaleFactor: number;
  speculativeScaleFactor: number;
}

export interface ILendgineImmutables {
  factory: string;
  pair: string;
}
