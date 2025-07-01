// btc.ts - utility to fetch current BTC to USD rate
import axios from 'axios';

/**
 * Fetch the current Bitcoin to USD exchange rate using CoinGecko
 * @returns Promise<number> - current BTC/USD rate
 */
export const getCurrentBTCUSDPrice = async (): Promise<number> => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin',
        vs_currencies: 'usd'
      }
    });

    return response.data.bitcoin.usd;
  } catch (error) {
    console.error('Failed to fetch BTC price:', error);
    throw new Error('Failed to fetch BTC price');
  }
};
