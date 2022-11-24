import type { Multicall2 } from "@dahlia-labs/use-ethers";
import { fetchMulticalls, totalSupplyMulticall } from "@dahlia-labs/use-ethers";

import { reservesMulticall } from "./contracts";
import type { IUniswapV2Pair, IUniswapV2PairInfo } from "./types";

export const getPairInfo = async (
  multicallContract: Multicall2,
  pair: IUniswapV2Pair
): Promise<IUniswapV2PairInfo> => {
  const multicallData = await fetchMulticalls(
    [reservesMulticall(pair), totalSupplyMulticall(pair.lpToken)],
    multicallContract
  );

  return {
    reserves: multicallData[0],
    lpTotalSupply: multicallData[1],
  };
};
