// apps/merchant-dashboard/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Payment {
  paymentId: string;
  usdAmount: number;
  btcAmount: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/payments'); // adjust port if needed
        setPayments(res.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Payments Dashboard</h1>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">USD</th>
            <th className="p-2 border">BTC</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.paymentId}>
              <td className="p-2 border">{p.paymentId}</td>
              <td className="p-2 border">${p.usdAmount}</td>
              <td className="p-2 border">{p.btcAmount}</td>
              <td className="p-2 border">{p.status}</td>
              <td className="p-2 border">{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
