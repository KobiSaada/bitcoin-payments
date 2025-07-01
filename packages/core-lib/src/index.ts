// core-lib/src/index.ts
import axios from 'axios';

/**
 * Utility to fetch the current BTC/USD price
 */
export const fetchBTCPrice = async (): Promise<number> => {
  const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: { ids: 'bitcoin', vs_currencies: 'usd' },
  });
  return res.data.bitcoin.usd;
};
