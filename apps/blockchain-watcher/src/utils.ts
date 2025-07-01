// apps/blockchain-watcher/src/utils.ts
import axios from 'axios';

export const checkTransaction = async (btcAddress: string): Promise<{ confirmed: boolean, txHash?: string }> => {
  try {
    const res = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}`);

    type BlockCypherResponse = {
      total_received: number;
      txrefs?: { tx_hash: string }[];
    };

    const blockCypherData = res.data as BlockCypherResponse;
    const totalReceived = blockCypherData.total_received;
    const txrefs = blockCypherData.txrefs || [];

    if (totalReceived > 0 && txrefs.length > 0) {
      return { confirmed: true, txHash: txrefs[0].tx_hash };
    }

    return { confirmed: false };
  } catch (error) {
    console.error(`❌ Failed to check transaction for ${btcAddress}:`, error);
    return { confirmed: false };
  }
};
