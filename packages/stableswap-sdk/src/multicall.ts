import { TokenAmount } from "@dahlia-labs/token-utils";
import type { Multicall2 } from "@dahlia-labs/use-ethers";
import { fetchMulticalls, totalSupplyMulticall } from "@dahlia-labs/use-ethers";

import {
  ampMulticall,
  feesMulticall,
  pausedMulticall,
  tokenBalanceMulticall,
} from "./contract";
import type { IExchange, IExchangeInfo } from "./index";

export const getExchangeInfo = async (
  multicallContract: Multicall2,
  exchange: IExchange
): Promise<IExchangeInfo> => {
  const multicallData = await fetchMulticalls(
    [
      pausedMulticall(exchange.address),
      feesMulticall(exchange.address),
      ampMulticall(exchange.address),
      totalSupplyMulticall(exchange.lpToken),
      tokenBalanceMulticall(exchange.address, 0),
      tokenBalanceMulticall(exchange.address, 1),
    ],
    multicallContract
  );

  return {
    paused: multicallData[0],
    fees: multicallData[1],
    ampFactor: multicallData[2],
    lpTotalSupply: multicallData[3],
    reserves: [
      new TokenAmount(exchange.tokens[0], multicallData[4].quotient),
      new TokenAmount(exchange.tokens[1], multicallData[5].quotient),
    ],
  };
};
