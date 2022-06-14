import type { BigintIsh, FractionObject } from "@ubeswap/token-math";
import {
  parseAmountFromString,
  TokenAmount as UTokenAmount,
} from "@ubeswap/token-math";

import type { Token } from "./token";

export interface TokenAmountObject extends FractionObject {
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
    const prev = parseAmountFromString(token, uiAmount, ".", ",");
    return new TokenAmount(token, prev);
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
  override toJSON(): TokenAmountObject {
    return {
      ...super.toJSON(),
      _isTA: true,
      mint: this.token.address,
      uiAmount: this.toExact(),
    };
  }
}
