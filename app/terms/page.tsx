'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      <section className="py-20 bg-[#0B0E14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-display font-black text-white mb-10 uppercase italic tracking-tighter">Terms of Play</h1>
          
          <div className="space-y-10 text-slate-400 font-medium">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500">Last Updated: February 23, 2026</p>
            
            <section className="bg-[#1A1F2B] p-8 rounded-[2rem] border border-white/5">
              <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">1. Participation</h2>
              <p>Entry into any pool requires a non-refundable fee in Indian Rupees (₹). Tickets are issued instantly and are unique to each participant.</p>
            </section>

            <section className="bg-[#1A1F2B] p-8 rounded-[2rem] border border-white/5">
              <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">2. Winning</h2>
              <p>Winners are selected via a cryptographically secure random number generator. All decisions are final and binding.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
