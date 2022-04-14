import type { Token, TokenAmount } from "@dahlia-labs/token-utils";
import { Percent } from "@dahlia-labs/token-utils";
import JSBI from "jsbi";

export type Fees = {
  trade: Percent;
  admin: Percent;
  deposit: Percent;
  withdraw: Percent;
};

const recommendedFeesRaw = {
  adminFeeNumerator: "50",
  adminFeeDenominator: "100",
  depositFeeNumerator: "50",
  depositFeeDenominator: "100",
  tradeFeeNumerator: "20",
  tradeFeeDenominator: "10000",
  withdrawFeeNumerator: "50",
  withdrawFeeDenominator: "10000",
};

export const RECOMMENDED_FEES: Fees = {
  trade: new Percent(
    recommendedFeesRaw.tradeFeeNumerator,
    recommendedFeesRaw.tradeFeeDenominator
  ),
  withdraw: new Percent(
    recommendedFeesRaw.withdrawFeeNumerator,
    recommendedFeesRaw.withdrawFeeDenominator
  ),
  admin: new Percent(
    recommendedFeesRaw.adminFeeNumerator,
    recommendedFeesRaw.adminFeeDenominator
  ),
  deposit: new Percent(
    recommendedFeesRaw.depositFeeNumerator,
    recommendedFeesRaw.depositFeeDenominator
  ),
};

export const RECOMMENDED_AMP = JSBI.BigInt("100");

/**
 * Static definition of an exchange.
 */
export interface IExchange {
  address: string;
  lpToken: Token;
  tokens: readonly [Token, Token];
}

/**
 * Info loaded from the exchange. This is used by the calculator.
 */
export interface IExchangeInfo {
  ampFactor: JSBI;
  fees: Fees;
  lpTotalSupply: TokenAmount;
  reserves: readonly [TokenAmount, TokenAmount];
}
