import { BigintIsh, NumberFormat, parseAmountFromString } from "@ubeswap/token-math";
import { TokenAmount as UTokenAmount } from "@ubeswap/token-math";

import type { Token } from "./token";

export interface IFormatUint {
  /**
   * If specified, format this according to `toLocaleString`
   */
  numberFormatOptions?: Intl.NumberFormatOptions;
  /**
   * Locale of the number
   */
  locale?: string;
}

export class TokenAmount extends UTokenAmount<Token> {
  // amount _must_ be raw, i.e. in the native representation
  constructor(token: Token, amount: BigintIsh) {
    super(token, amount);
  }

  new(token: Token, amount: BigintIsh): this {
    // unsafe but nobody will be extending this anyway probably
    return new TokenAmount(token, amount) as this;
  }

   /**
   * Parses a token amount from a decimal representation.
   * @param token
   * @param uiAmount
   * @returns
   */
    static parse(token: Token, uiAmount: string): TokenAmount {
      const prev = parseAmountFromString(token, uiAmount);
      return new TokenAmount(token, prev);
    }


  /**
   * Formats the token amount with units and decimal adjustment, e.g. "100.42 SOL"
   * @returns
   */
  formatUnits(format: NumberFormat = { groupSeparator: "," }): string {
    return `${this.toExact(format)} ${this.token.symbol}`;
  }

  /**
   * String representation of this token amount.
   */
  override toString(): string {
    return `TokenAmount[Token=(${this.token.toString()}), amount=${this.toExact()}`;
  }

  /**
   * JSON representation of the token amount.
   */
  toJSON(): {
    /**
     * Discriminator to show this is a token amount.
     */
    _isTA: true;
    /**
     * Mint of the token.
     */
    mint: string;
    /**
     * Amount of tokens in string representation.
     */
    uiAmount: string;
  } {
    return {
      _isTA: true,
      mint: this.token.address,
      uiAmount: this.toExact(),
    };
  }
}
