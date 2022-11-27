import type { ProviderOrSigner } from "@dahlia-labs/use-ethers";
import { getContract } from "@dahlia-labs/use-ethers";
import { Interface } from "@ethersproject/abi";

import FACTORY_ABI from "./abis/Factory.json";
import LENDGINE_ABI from "./abis/Lendgine.json";
import LENDGINE_ROUTER_ABI from "./abis/LendgineRouter.json";
import LIQUIDITY_MANAGER_ABI from "./abis/LiquidityManager.json";
import PAIR_ABI from "./abis/Pair.json";
import { FACTORY, LENDGINEROUTER, LIQUIDITYMANAGER } from "./constants";
import type { Factory, FactoryInterface } from "./generated/Factory";
import type { Lendgine, LendgineInterface } from "./generated/Lendgine";
import type {
  LendgineRouter,
  LendgineRouterInterface,
} from "./generated/LendgineRouter";
import type {
  LiquidityManager,
  LiquidityManagerInterface,
} from "./generated/LiquidityManager";
import type { Pair, PairInterface } from "./generated/Pair";
import type { ChainsV1, IMarket, IPair } from "./types";

export function getPairInterface(): PairInterface {
  return new Interface(PAIR_ABI.abi) as PairInterface;
}

export function getLendgineInterface(): LendgineInterface {
  return new Interface(LENDGINE_ABI.abi) as LendgineInterface;
}

export function getFactoryInterface(): FactoryInterface {
  return new Interface(FACTORY_ABI.abi) as FactoryInterface;
}

export function getLendgineRouterInterface(): LendgineRouterInterface {
  return new Interface(LENDGINE_ROUTER_ABI.abi) as LendgineRouterInterface;
}

export function getLiquidityManagerInterface(): LiquidityManagerInterface {
  return new Interface(LIQUIDITY_MANAGER_ABI.abi) as LiquidityManagerInterface;
}

export const pairInterface = getPairInterface();

export const lendgineInterface = getLendgineInterface();

export const factoryInterface = getFactoryInterface();

export const liquidityManagerInterface = getLiquidityManagerInterface();

export const lendgineRouterInterface = getLendgineInterface();

export const getPairContract = (
  pair: IPair,
  provider: ProviderOrSigner
): Pair => getContract(pair.address, PAIR_ABI.abi, provider) as Pair;

export const getLendgineContract = (
  market: IMarket,
  provider: ProviderOrSigner
): Lendgine =>
  getContract(market.address, LENDGINE_ABI.abi, provider) as Lendgine;

export const getFactoryContract = (
  provider: ProviderOrSigner,
  chainID: ChainsV1
): Factory =>
  getContract(FACTORY[chainID], FACTORY_ABI.abi, provider) as Factory;

export const getLendgineRouterContract = (
  provider: ProviderOrSigner,
  chainID: ChainsV1
): LendgineRouter =>
  getContract(
    LENDGINEROUTER[chainID],
    LENDGINE_ROUTER_ABI.abi,
    provider
  ) as LendgineRouter;

export const getLiquidityManagerContract = (
  provider: ProviderOrSigner,
  chainID: ChainsV1
): LiquidityManager =>
  getContract(
    LIQUIDITYMANAGER[chainID],
    LIQUIDITY_MANAGER_ABI.abi,
    provider
  ) as LiquidityManager;
