// types/index.ts
export interface Payment {
    _id: string;
    merchantId: string;
    usdAmount: number;
    btcAmount: number;
    btcAddress: string;
    status: 'pending' | 'confirmed' | 'failed';
    txHash?: string;
    createdAt: string;
    updatedAt: string;
  }
  