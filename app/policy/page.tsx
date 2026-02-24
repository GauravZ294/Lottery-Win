'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PolicyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      <section className="py-20 bg-[#0B0E14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-display font-black text-white mb-10 uppercase italic tracking-tighter">Privacy Policy</h1>
          
          <div className="space-y-10 text-slate-400 font-medium">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500">Last Updated: February 23, 2026</p>
            
            <section className="bg-[#1A1F2B] p-8 rounded-[2rem] border border-white/5">
              <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">1. Data Collection</h2>
              <p>We collect essential data required to manage your entries and ensure secure payouts. This includes identity verification and payment routing information.</p>
            </section>

            <section className="bg-[#1A1F2B] p-8 rounded-[2rem] border border-white/5">
              <h2 className="text-xl font-black text-white mb-4 uppercase italic tracking-widest">2. Usage</h2>
              <p>Your data is used exclusively for pool management and winner notification. We never sell your data to third-party advertisers.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
