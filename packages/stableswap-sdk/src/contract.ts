import { Fraction, Percent } from "@dahlia-labs/token-utils";
import type { Multicall, ProviderOrSigner } from "@dahlia-labs/use-ethers";
import { getContract } from "@dahlia-labs/use-ethers";
import { Interface } from "@ethersproject/abi";
import type { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import JSBI from "jsbi";

import LPTOKEN_ABI from "./abis/LPToken.json";
import SWAP_ABI from "./abis/Swap.json";
import type { LPToken, LPTokenInterface } from "./generated/LPToken";
import type { Swap, SwapInterface } from "./generated/Swap";
import type { Fees } from "./index";

export const FEE_BASE = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(10));

export function getLPTokenInterface(): LPTokenInterface {
  return new Interface(LPTOKEN_ABI) as LPTokenInterface;
}

export function getSwapInterface(): SwapInterface {
  return new Interface(SWAP_ABI) as SwapInterface;
}

export const lpTokenInterface = getLPTokenInterface();

export const swapInterface = getSwapInterface();

export const getLPTokenContract = (
  address: string,
  provider: ProviderOrSigner
): LPToken => getContract(address, LPTOKEN_ABI, provider) as LPToken;

export const getSwapContract = (
  address: string,
  provider: ProviderOrSigner
): Swap => getContract(address, SWAP_ABI, provider) as Swap;

export interface SwapStorage {
  swapFee: BigNumber;
  adminFee: BigNumber;
  defaultDepositFee: BigNumber;
  defaultWithdrawFee: BigNumber;
}

type t = Awaited<ReturnType<Swap["getLpToken"]>>;

export const LPMulticall = (swapAddress: string): Multicall<string> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("getLpToken"),
    },
    parseReturn: (returnData: string) => returnData,
  } as const);

export const ampMulticall = (swapAddress: string): Multicall<JSBI> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("getA"),
    },
    parseReturn: (returnData: string) => JSBI.BigInt(returnData),
  } as const);

export const pausedMulticall = (swapAddress: string): Multicall<boolean> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("paused"),
    },
    parseReturn: (returnData: string) =>
      (
        swapInterface.decodeFunctionResult("paused", returnData) as [boolean]
      )[0],
  } as const);

export const feesMulticall = (swapAddress: string): Multicall<Fees> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("swapStorage"),
    },
    parseReturn: (returnData: string) => {
      const data = swapInterface.decodeFunctionResult(
        "swapStorage",
        returnData
      ) as unknown as Awaited<ReturnType<Swap["swapStorage"]>>;

      return {
        trade: new Percent(data.swapFee.toString(), FEE_BASE),
        admin: new Percent(data.adminFee.toString(), FEE_BASE),
        deposit: new Percent(data.defaultDepositFee.toString(), FEE_BASE),
        withdraw: new Percent(data.defaultWithdrawFee.toString(), FEE_BASE),
      };
    },
  } as const);

export const tokenBalanceMulticall = (
  swapAddress: string,
  index: number
): Multicall<Fraction> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("getTokenBalance", [index]),
    },
    parseReturn: (returnData: string) =>
      new Fraction(
        swapInterface
          .decodeFunctionResult("getTokenBalance", returnData)
          .toString()
      ),
  } as const);

export const calculateSwapMulticall = (
  swapAddress: string,
  fromIndex: number,
  toIndex: number,
  amountIn: BigNumberish
): Multicall<Fraction> =>
  ({
    call: {
      target: swapAddress,
      callData: swapInterface.encodeFunctionData("calculateSwap", [
        fromIndex,
        toIndex,
        amountIn,
      ]),
    },
    parseReturn: (returnData: string) =>
      new Fraction(
        swapInterface
          .decodeFunctionResult("calculateSwap", returnData)
          .toString()
      ),
  } as const);
