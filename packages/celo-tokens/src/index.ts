import { ChainId } from "@dahlia-labs/celo-contrib";
import { Token } from "@dahlia-labs/token-utils";
import mapValues from "lodash.mapvalues";

const imageRegistry =
  "https://raw.githubusercontent.com/DahliaLabs/dahlia-common/master/packages/celo-tokens/src/svgs/";

export const makeTokens = (
  addresses: { [net in ChainId]: string },
  decimals: number,
  symbol: string,
  name: string,
  logoURI?: string
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
  "Mobius DAO Token"
);

export const CELO = makeTokens(
  {
    [ChainId.Mainnet]: "0x471EcE3750Da237f93B8E339c536989b8978a438",
    [ChainId.Alfajores]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    [ChainId.Baklava]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
  },
  18,
  "CELO",
  "Celo native asset"
);

export const CUSD = makeTokens(
  {
    [ChainId.Mainnet]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    [ChainId.Alfajores]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    [ChainId.Baklava]: "0x62492A644A588FD904270BeD06ad52B9abfEA1aE",
  },
  18,
  "cUSD",
  "Celo Dollar"
);

export const CEUR = makeTokens(
  {
    [ChainId.Mainnet]: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
    [ChainId.Alfajores]: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
    [ChainId.Baklava]: "0xf9ecE301247aD2CE21894941830A2470f4E774ca",
  },
  18,
  "cEUR",
  "Celo Euro"
);

export const UBE = makeTokens(
  {
    [ChainId.Mainnet]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
    [ChainId.Alfajores]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
    [ChainId.Baklava]: "0x00Be915B9dCf56a3CBE739D9B9c202ca692409EC",
  },
  18,
  "UBE",
  "Ubeswap"
);

export const SUSHI = makeTokens(
  {
    [ChainId.Mainnet]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
    [ChainId.Alfajores]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
    [ChainId.Baklava]: "0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1",
  },
  18,
  "SUSHI",
  "Sushi"
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
