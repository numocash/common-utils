import { ChainId } from "@dahlia-labs/celo-contrib";
import type { TokenExtensions } from "@dahlia-labs/token-utils";
import { Token } from "@dahlia-labs/token-utils";
import mapValues from "lodash.mapvalues";

const imageRegistry =
  "https://raw.githubusercontent.com/DahliaLabs/dahlia-common/master/packages/celo-tokens/src/svgs/";

export const makeTokens = (
  addresses: { [net in ChainId]: string },
  decimals: number,
  symbol: string,
  name: string,
  logoURI?: string,
  extensions?: TokenExtensions
): { [net in ChainId]: Token } => {
  return mapValues(addresses, (tokenAddress, network) => {
    return new Token({
      chainId: parseInt(network),
      address: tokenAddress,
      decimals,
      symbol,
      name,
      logoURI:
        logoURI ?? imageRegistry.concat(symbol.toLowerCase()).concat(".svg"),
      extensions,
    });
  });
};

export const MOBI = makeTokens(
  {
    [ChainId.Mainnet]: "0x73a210637f6F6B7005512677Ba6B3C96bb4AA44B",
    [ChainId.Alfajores]: "0x17a139f275102bBaB5BcbF1c4b7143F08B635EA2",
    [ChainId.Baklava]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
  },
  18,
  "MOBI",
  "Mobius DAO Token",
  undefined,
  { coingeckoId: "mobius-money" }
);

export const CELO = makeTokens(
  {
    [ChainId.Mainnet]: "0x471EcE3750Da237f93B8E339c536989b8978a438",
    [ChainId.Alfajores]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    [ChainId.Baklava]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
  },
  18,
  "CELO",
  "Celo native asset",
  undefined,
  { coingeckoId: "celo" }
);

export const CUSD = makeTokens(
  {
    [ChainId.Mainnet]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    [ChainId.Baklava]: "0x62492A644A588FD904270BeD06ad52B9abfEA1aE",
  },
  18,
  "cUSD",
  "Celo Dollar",
  undefined,
  { coingeckoId: "celo-dollar" }
);

export const CEUR = makeTokens(
  {
    [ChainId.Mainnet]: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
    [ChainId.Alfajores]: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
    [ChainId.Baklava]: "0xf9ecE301247aD2CE21894941830A2470f4E774ca",
  },
  18,
  "cEUR",
  "Celo Euro",
  undefined,
  { coingeckoId: "celo-euro" }
);

export const CREAL = makeTokens(
  {
    [ChainId.Mainnet]: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787",
    [ChainId.Alfajores]: "0xE4D517785D091D3c54818832dB6094bcc2744545",
    [ChainId.Baklava]: "0xf9ecE301247aD2CE21894941830A2470f4E774ca",
  },
  18,
  "cREAL",
  "Celo Brazilian Real"
);

export const UBE = makeTokens(
  {
    [ChainId.Mainnet]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
    [ChainId.Alfajores]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
    [ChainId.Baklava]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
  },
  18,
  "UBE",
  "Ubeswap",
  undefined,
  { coingeckoId: "ubeswap" }
);

export const SUSHI = makeTokens(
  {
    [ChainId.Mainnet]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
    [ChainId.Alfajores]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
    [ChainId.Baklava]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
  },
  18,
  "SUSHI",
  "Sushi",
  undefined,
  { coingeckoId: "sushi" }
);

export const dCELO = makeTokens(
  {
    [ChainId.Mainnet]: "0x7a6d627b0464dd33C988AE3a99aa6372191E7EB2",
    [ChainId.Alfajores]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    [ChainId.Baklava]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
  },
  10,
  "dCELO",
  "Dahlia Celo"
);

export const dcUSD = makeTokens(
  {
    [ChainId.Mainnet]: "0xb104422F2Fbc050055671265b95E08aD6057B0B3",
    [ChainId.Alfajores]: "0xb104422F2Fbc050055671265b95E08aD6057B0B3",
    [ChainId.Baklava]: "0xb104422F2Fbc050055671265b95E08aD6057B0B3",
  },
  10,
  "dcUSD",
  "Dahlia cUSD"
);

export const dcEUR = makeTokens(
  {
    [ChainId.Mainnet]: "0x998BA352aD84CC0CD7E71B1Cc11Fd192D624254C",
    [ChainId.Alfajores]: "0x998BA352aD84CC0CD7E71B1Cc11Fd192D624254C",
    [ChainId.Baklava]: "0x998BA352aD84CC0CD7E71B1Cc11Fd192D624254C",
  },
  10,
  "dcEUR",
  "Dahlia cEUR"
);

export const dMOBI = makeTokens(
  {
    [ChainId.Mainnet]: "0xEfbD2788A0dea9EB959a61CE0098Be6499fB0d78",
    [ChainId.Alfajores]: "0xEfbD2788A0dea9EB959a61CE0098Be6499fB0d78",
    [ChainId.Baklava]: "0xEfbD2788A0dea9EB959a61CE0098Be6499fB0d78",
  },
  10,
  "dMOBI",
  "Dahlia Mobi"
);

export const dUBE = makeTokens(
  {
    [ChainId.Mainnet]: "0x37a022Bd03A8b0F66ea68996410E0F70EC395C5e",
    [ChainId.Alfajores]: "0x37a022Bd03A8b0F66ea68996410E0F70EC395C5e",
    [ChainId.Baklava]: "0x37a022Bd03A8b0F66ea68996410E0F70EC395C5e",
  },
  10,
  "dUBE",
  "Dahlia Ube"
);

export const UST = makeTokens(
  {
    [ChainId.Mainnet]: "0xEd193C4E69F591E42398eF54DEa65aa1bb02835c",
    [ChainId.Alfajores]: "0xEd193C4E69F591E42398eF54DEa65aa1bb02835c",
    [ChainId.Baklava]: "0xEd193C4E69F591E42398eF54DEa65aa1bb02835c",
  },
  18,
  "UST",
  "Allbridge UST",
  undefined,
  { coingeckoId: "terrausd" }
);

export const CETH = makeTokens(
  {
    [ChainId.Mainnet]: "0x2DEf4285787d58a2f811AF24755A8150622f4361",
    [ChainId.Alfajores]: "0x2DEf4285787d58a2f811AF24755A8150622f4361",
    [ChainId.Baklava]: "0x2DEf4285787d58a2f811AF24755A8150622f4361",
  },
  18,
  "cETH",
  "Wrapped Ethereum",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cETH.svg"
);

export const WETH = makeTokens(
  {
    [ChainId.Mainnet]: "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
    [ChainId.Alfajores]: "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
    [ChainId.Baklava]: "0x122013fd7dF1C6F636a5bb8f03108E876548b455",
  },
  18,
  "wETH",
  "Wrapped Ether (Optics Bridge)",
  "https://etherscan.io/token/images/weth_28.png",
  { coingeckoId: "weth" }
);

export const USDC = makeTokens(
  {
    [ChainId.Mainnet]: "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a",
    [ChainId.Alfajores]: "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a",
    [ChainId.Baklava]: "0xef4229c8c3250C675F21BCefa42f58EfbfF6002a",
  },
  6,
  "cUSDC",
  "US Dollar Coin (Optics Bridge)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const USDCet = makeTokens(
  {
    [ChainId.Mainnet]: "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
    [ChainId.Alfajores]: "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
    [ChainId.Baklava]: "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd",
  },
  6,
  "USDCet",
  "USDCet (Portal from Ethereum)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const DAI = makeTokens(
  {
    [ChainId.Mainnet]: "0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd",
    [ChainId.Alfajores]: "0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd",
    [ChainId.Baklava]: "0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd",
  },
  18,
  "DAI",
  "Optics DAI",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_DAI.png",
  { coingeckoId: "dai" }
);

export const CBTC = makeTokens(
  {
    [ChainId.Mainnet]: "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b",
    [ChainId.Alfajores]: "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b",
    [ChainId.Baklava]: "0xD629eb00dEced2a080B7EC630eF6aC117e614f1b",
  },
  18,
  "cBTC",
  "Wrapped Bitcoin",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_cBTC.png"
);

export const WBTC = makeTokens(
  {
    [ChainId.Mainnet]: "0xBAAB46E28388d2779e6E31Fd00cF0e5Ad95E327B",
    [ChainId.Alfajores]: "0xBAAB46E28388d2779e6E31Fd00cF0e5Ad95E327B",
    [ChainId.Baklava]: "0xBAAB46E28388d2779e6E31Fd00cF0e5Ad95E327B",
  },
  8,
  "wBTC",
  "Wrapped Bitcoin (Optics Bridge)",
  "https://etherscan.io/token/images/wbtc_28.png?v=1",
  { coingeckoId: "wrapped-bitcoin" }
);

export const PUSDC = makeTokens(
  {
    [ChainId.Mainnet]: "0x1bfc26cE035c368503fAE319Cc2596716428ca44",
    [ChainId.Alfajores]: "0x1bfc26cE035c368503fAE319Cc2596716428ca44",
    [ChainId.Baklava]: "0x1bfc26cE035c368503fAE319Cc2596716428ca44",
  },
  6,
  "pUSDC",
  "USD Coin (PoS Optics)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const USDC1 = makeTokens(
  {
    [ChainId.Mainnet]: "0x2A3684e9Dc20B857375EA04235F2F7edBe818FA7",
    [ChainId.Alfajores]: "0x2A3684e9Dc20B857375EA04235F2F7edBe818FA7",
    [ChainId.Baklava]: "0x2A3684e9Dc20B857375EA04235F2F7edBe818FA7",
  },
  6,
  "cUSDCxV1",
  "US Dollar Coin (Optics Bridge)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const AAUSDC = makeTokens(
  {
    [ChainId.Mainnet]: "0xb70e0a782b058BFdb0d109a3599BEc1f19328E36",
    [ChainId.Alfajores]: "0xb70e0a782b058BFdb0d109a3599BEc1f19328E36",
    [ChainId.Baklava]: "0xb70e0a782b058BFdb0d109a3599BEc1f19328E36",
  },
  18,
  "aaUSDC",
  "US Dollar Coin (Avalanche Allbridge)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const PUSD = makeTokens(
  {
    [ChainId.Mainnet]: "0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226",
    [ChainId.Alfajores]: "0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226",
    [ChainId.Baklava]: "0xEadf4A7168A82D30Ba0619e64d5BCf5B30B45226",
  },
  18,
  "pUSD",
  "Poof USD V2",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pUSD.png"
);

export const PCELO = makeTokens(
  {
    [ChainId.Mainnet]: "0x301a61D01A63c8D670c2B8a43f37d12eF181F997",
    [ChainId.Alfajores]: "0x301a61D01A63c8D670c2B8a43f37d12eF181F997",
    [ChainId.Baklava]: "0x301a61D01A63c8D670c2B8a43f37d12eF181F997",
  },
  18,
  "pCELO",
  "Poof CELO V2",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pCELO.png"
);

export const PEUR = makeTokens(
  {
    [ChainId.Mainnet]: "0xD8761DD6c7cB54febD33adD699F5E4440b62E01B",
    [ChainId.Alfajores]: "0xD8761DD6c7cB54febD33adD699F5E4440b62E01B",
    [ChainId.Baklava]: "0xD8761DD6c7cB54febD33adD699F5E4440b62E01B",
  },
  18,
  "pEUR",
  "Poof EUR",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pEUR.png"
);

export const PUSD1 = makeTokens(
  {
    [ChainId.Mainnet]: "0xB4aa2986622249B1F45eb93F28Cfca2b2606d809",
    [ChainId.Alfajores]: "0xB4aa2986622249B1F45eb93F28Cfca2b2606d809",
    [ChainId.Baklava]: "0xB4aa2986622249B1F45eb93F28Cfca2b2606d809",
  },
  18,
  "pUSDxV1",
  "Poof USD V1",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pUSD.png"
);

export const ASUSDC = makeTokens(
  {
    [ChainId.Mainnet]: "0xCD7D7Ff64746C1909E44Db8e95331F9316478817",
    [ChainId.Alfajores]: "0xCD7D7Ff64746C1909E44Db8e95331F9316478817",
    [ChainId.Baklava]: "0xCD7D7Ff64746C1909E44Db8e95331F9316478817",
  },
  18,
  "asUSDC",
  "US Dollar Coin (Solana Allbridge)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const PUSDC1 = makeTokens(
  {
    [ChainId.Mainnet]: "0xcC82628f6A8dEFA1e2B0aD7ed448bef3647F7941",
    [ChainId.Alfajores]: "0xcC82628f6A8dEFA1e2B0aD7ed448bef3647F7941",
    [ChainId.Baklava]: "0xcC82628f6A8dEFA1e2B0aD7ed448bef3647F7941",
  },
  6,
  "pUSDCxV1",
  "USD Coin (PoS Optics)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const WBTC1 = makeTokens(
  {
    [ChainId.Mainnet]: "0xBe50a3013A1c94768A1ABb78c3cB79AB28fc1aCE",
    [ChainId.Alfajores]: "0xBe50a3013A1c94768A1ABb78c3cB79AB28fc1aCE",
    [ChainId.Baklava]: "0xBe50a3013A1c94768A1ABb78c3cB79AB28fc1aCE",
  },
  8,
  "wBTCxV1",
  "Wrapped Bitcoin (Optics Bridge)",
  "https://etherscan.io/token/images/wbtc_28.png?v=1",
  { coingeckoId: "wrapped-bitcoin" }
);

export const WETH1 = makeTokens(
  {
    [ChainId.Mainnet]: "0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4",
    [ChainId.Alfajores]: "0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4",
    [ChainId.Baklava]: "0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4",
  },
  18,
  "wETHxV1",
  "Wrapped Ether (Optics Bridge)",
  "https://etherscan.io/token/images/weth_28.png",
  { coingeckoId: "weth" }
);

export const USDTM = makeTokens(
  {
    [ChainId.Mainnet]: "0xcFFfE0c89a779c09Df3DF5624f54cDf7EF5fDd5D",
    [ChainId.Alfajores]: "0xcFFfE0c89a779c09Df3DF5624f54cDf7EF5fDd5D",
    [ChainId.Baklava]: "0xcFFfE0c89a779c09Df3DF5624f54cDf7EF5fDd5D",
  },
  18,
  "cUSDTm",
  "Tether (Moss Bridge)",
  "https://bit.ly/3AMrCyD",
  { coingeckoId: "tether" }
);

export const USDCM = makeTokens(
  {
    [ChainId.Mainnet]: "0x93DB49bE12B864019dA9Cb147ba75cDC0506190e",
    [ChainId.Alfajores]: "0x93DB49bE12B864019dA9Cb147ba75cDC0506190e",
    [ChainId.Baklava]: "0x93DB49bE12B864019dA9Cb147ba75cDC0506190e",
  },
  18,
  "cUSDCm",
  "US Dollar Coin (Moss Bridge)",
  "https://bit.ly/3CwGimW",
  { coingeckoId: "usd-coin" }
);

export const PCELO1 = makeTokens(
  {
    [ChainId.Mainnet]: "0xE74AbF23E1Fdf7ACbec2F3a30a772eF77f1601E1",
    [ChainId.Alfajores]: "0xE74AbF23E1Fdf7ACbec2F3a30a772eF77f1601E1",
    [ChainId.Baklava]: "0xE74AbF23E1Fdf7ACbec2F3a30a772eF77f1601E1",
  },
  18,
  "pCELOxV1",
  "Poof Celo V1",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pCELO.png"
);

export const PEUR1 = makeTokens(
  {
    [ChainId.Mainnet]: "0x56072D4832642dB29225dA12d6Fd1290E4744682",
    [ChainId.Alfajores]: "0x56072D4832642dB29225dA12d6Fd1290E4744682",
    [ChainId.Baklava]: "0x56072D4832642dB29225dA12d6Fd1290E4744682",
  },
  18,
  "pEURxV1",
  "Poof EUR V1",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_pEUR.png"
);

export const POOF = makeTokens(
  {
    [ChainId.Mainnet]: "0x00400FcbF0816bebB94654259de7273f4A05c762",
    [ChainId.Alfajores]: "0x00400FcbF0816bebB94654259de7273f4A05c762",
    [ChainId.Baklava]: "0x00400FcbF0816bebB94654259de7273f4A05c762",
  },
  18,
  "Poof",
  "POOF",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_POOF.png",
  { coingeckoId: "poofcash" }
);

export const MOO = makeTokens(
  {
    [ChainId.Mainnet]: "0x17700282592D6917F6A73D0bF8AcCf4D578c131e",
    [ChainId.Alfajores]: "0x17700282592D6917F6A73D0bF8AcCf4D578c131e",
    [ChainId.Baklava]: "0x17700282592D6917F6A73D0bF8AcCf4D578c131e",
  },
  18,
  "Moola",
  "MOO",
  "https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_MOO.png",
  { coingeckoId: "moola-market" }
);

export const STCELO = makeTokens(
  {
    [ChainId.Mainnet]: "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24",
    [ChainId.Alfajores]: "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24",
    [ChainId.Baklava]: "0xC668583dcbDc9ae6FA3CE46462758188adfdfC24",
  },
  18,
  "stCELO",
  "Staked CELO",
  undefined,
  { coingeckoId: "celo" }
);

export const RSTCELO = makeTokens(
  {
    [ChainId.Mainnet]: "0x6b8bb0ACA4bDE7E844DFA6F6bC90aD0a3D2352Aa",
    [ChainId.Alfajores]: "0x6b8bb0ACA4bDE7E844DFA6F6bC90aD0a3D2352Aa",
    [ChainId.Baklava]: "0x6b8bb0ACA4bDE7E844DFA6F6bC90aD0a3D2352Aa",
  },
  18,
  "rstCELO",
  "Rebased Staked CELO",
  undefined,
  { coingeckoId: "celo" }
);
