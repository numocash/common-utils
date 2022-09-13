import { Token, TokenAmount } from "@dahlia-labs/token-utils";
import { Interface } from "@ethersproject/abi";
import { AddressZero } from "@ethersproject/constants";

import ERC20_ABI from "./abis/erc20.json";
import { getContract } from "./contracts";
import type { Erc20, Erc20Interface } from "./generated/Erc20";
import type { Multicall2 } from "./index";
import { fetchMulticalls } from "./index";
import type { Multicall, ProviderOrSigner } from "./types";

export function getTokenInterface(): Erc20Interface {
  return new Interface(ERC20_ABI) as Erc20Interface;
}

export const tokenInterface = getTokenInterface();

export const getTokenContractFromAddress = (
  address: string,
  provider: ProviderOrSigner
): Erc20 => getContract(address, ERC20_ABI, provider) as Erc20;

export const getTokenContract = (
  token: Token,
  provider: ProviderOrSigner
): Erc20 => getContract(token.address, ERC20_ABI, provider) as Erc20;

export const balanceOfMulticall = (
  token: Token,
  address: string | null
): Multicall<TokenAmount> =>
  ({
    call: {
      target: token.address,
      callData: tokenInterface.encodeFunctionData("balanceOf", [
        address ?? AddressZero,
      ]),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        token,
        tokenInterface.decodeFunctionResult("balanceOf", returnData).toString()
      ),
  } as const);

export const nameMulticall = (tokenAddress: string): Multicall<string> =>
  ({
    call: {
      target: tokenAddress,
      callData: tokenInterface.encodeFunctionData("name"),
    },
    parseReturn: (returnData: string) =>
      tokenInterface.decodeFunctionResult("name", returnData).toString(),
  } as const);

export const symbolMulticall = (tokenAddress: string): Multicall<string> =>
  ({
    call: {
      target: tokenAddress,
      callData: tokenInterface.encodeFunctionData("symbol"),
    },
    parseReturn: (returnData: string) =>
      tokenInterface.decodeFunctionResult("symbol", returnData).toString(),
  } as const);

export const decimalsMulticall = (tokenAddress: string): Multicall<number> =>
  ({
    call: {
      target: tokenAddress,
      callData: tokenInterface.encodeFunctionData("decimals"),
    },
    parseReturn: (returnData: string) =>
      +tokenInterface.decodeFunctionResult("decimals", returnData).toString(),
  } as const);

export const totalSupplyMulticall = (token: Token): Multicall<TokenAmount> =>
  ({
    call: {
      target: token.address,
      callData: tokenInterface.encodeFunctionData("totalSupply"),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        token,
        tokenInterface
          .decodeFunctionResult("totalSupply", returnData)
          .toString()
      ),
  } as const);

export const allowanceMulticall = (
  token: Token,
  address: string | null,
  spender: string | null
): Multicall<TokenAmount> =>
  ({
    call: {
      target: token.address,
      callData: tokenInterface.encodeFunctionData("allowance", [
        address ?? AddressZero,
        spender ?? AddressZero,
      ]),
    },
    parseReturn: (returnData: string) =>
      new TokenAmount(
        token,
        tokenInterface.decodeFunctionResult("allowance", returnData).toString()
      ),
  } as const);

export const getToken = async (
  multicallContract: Multicall2,
  address: string,
  chainId: number
): Promise<Token | null> => {
  const multicallData = await fetchMulticalls(
    [
      nameMulticall(address),
      symbolMulticall(address),
      decimalsMulticall(address),
    ],
    multicallContract
  );

  return new Token({
    chainId,
    address,
    name: multicallData[0],
    symbol: multicallData[1],
    decimals: multicallData[2],
  });
};

// want meta callbacks that take multiple multicalls and return one type
