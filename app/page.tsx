"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Trash2 } from 'lucide-react';

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p className="text-sm text-orange-600">Loading PDF...</p> }
);

import { InvoicePDF } from '@/components/InvoicePDF';

export default function InvoicePage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: 'DA256.34',
    clientName: 'Pascal',
    clientLocation: 'Jalan Dramaga No. 12, Bogor',
    clientPhone: '0812-3456-7890',
    clientEmail: 'pascal@example.com',
    paymentNumber: '1436268740 (BNI)',
    paymentName: 'Helmi Falah',
    items: [{ description: 'Analisis Multinomial Logit Regression', qty: 1, rate: 120000 }]
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    // @ts-ignore
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', qty: 1, rate: 0 }] });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  };

  const today = new Date().toLocaleDateString('id-ID');
  const dueDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID');

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* UPDATED HEADER: Gradient from #FF7B00 to #C40700 */}
        <div className="bg-gradient-to-r from-[#FF7B00] to-[#C40700] p-6 sm:p-8 text-white flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between sm:items-end">
          <div className="flex items-center gap-4 sm:gap-5">
            <img src="/image 46.png" alt="GSB Logo" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-white/20 shadow-sm shrink-0" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Invoice Builder</h1>
              <p className="text-orange-100 text-xs sm:text-sm font-medium mt-1">Department of Data Analytics GSB</p>
            </div>
          </div>
          <div className="text-left sm:text-right border-t border-white/20 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
            <div className="text-sm opacity-80">Grand Total</div>
            <div className="text-3xl sm:text-3xl font-bold">Rp{calculateTotal().toLocaleString('id-ID')}</div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4 border-b pb-2">1. Invoice Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Invoice Number</label>
                <input type="text" placeholder="e.g. DA256.34" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.invoiceNumber} onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4 border-b pb-2">2. Client Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Client Name" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
              <input type="text" placeholder="Location / Address" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.clientLocation} onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })} />
              <input type="text" placeholder="Phone Number" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.clientPhone} onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })} />
              <input type="text" placeholder="Email Address" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} />
            </div>
          </section>

          <section>
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4 border-b pb-2">3. Payment Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400">Payment Number (Bank)</label>
                <input type="text" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.paymentNumber} onChange={(e) => setFormData({ ...formData, paymentNumber: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-gray-400">Payment Name</label>
                <input type="text" className="border border-gray-300 text-gray-800 p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-500 outline-none"
                  value={formData.paymentName} onChange={(e) => setFormData({ ...formData, paymentName: e.target.value })} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4 border-b pb-2">4. Items List</h3>
            <div className="space-y-4 md:space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-gray-50 p-4 md:p-0 md:bg-transparent rounded-lg md:rounded-none border md:border-0 border-gray-100">
                  <input type="text" placeholder="Description" className="w-full md:w-auto md:flex-grow border border-gray-300 text-gray-800 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                  <div className="flex w-full md:w-auto gap-3 items-center">
                    <input type="number" placeholder="Qty" className="w-full md:w-20 border border-gray-300 text-gray-800 p-3 rounded-lg text-center focus:ring-2 focus:ring-orange-500 outline-none"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))} />
                    <input type="number" placeholder="Rate" className="w-full md:w-32 border border-gray-300 text-gray-800 p-3 rounded-lg text-right focus:ring-2 focus:ring-orange-500 outline-none"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))} />
                    <button onClick={() => removeItem(index)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addItem} className="flex items-center gap-2 text-[#0038A8] font-medium mt-2 px-2 py-1 hover:bg-blue-50 rounded">
                <Plus size={18} /> Add Item
              </button>
            </div>
          </section>

          <div className="pt-8 border-t flex justify-center sm:justify-end">
            {isClient && (
              <PDFDownloadLink
                document={<InvoicePDF data={{ ...formData, total: calculateTotal(), today, dueDate }} />}
                fileName={`Invoice-${formData.clientName || 'Draft'}.pdf`}
                className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#0038A8] to-[#001952] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition flex items-center gap-2"
              >
                {/* @ts-ignore */}
                {({ loading }) => (loading ? 'Preparing Document...' : 'Download Invoice PDF')}
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}