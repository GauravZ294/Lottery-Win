'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Smartphone, Shield, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      <section className="py-20 bg-[#0B0E14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase italic tracking-tighter">Our Story</h1>
            <p className="text-lg text-slate-400 leading-relaxed font-bold uppercase tracking-tight mb-4">
              Lotto247 was born from a vision to revolutionize the digital lottery space with high-stakes rewards and absolute transparency.
            </p>
            <div className="inline-block bg-red-500/10 border border-red-500/20 px-6 py-2 rounded-full">
              <p className="text-xs text-red-500 font-black uppercase tracking-widest">
                Service Notice: Available in all Indian states except Gujarat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="flex flex-col md:flex-row gap-8 items-center bg-[#1A1F2B] p-10 rounded-[3rem] border border-white/5">
              <div className="bg-yellow-500 p-6 rounded-3xl shrink-0 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <Shield className="text-black w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white mb-3 uppercase italic tracking-tighter">The Gold Standard</h2>
                <p className="text-slate-400 leading-relaxed font-medium">
                  We don&apos;t just run lotteries; we set the benchmark for fairness. Every draw is verifiable, and every participant has an equal shot at the jackpot.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-blue-50 p-6 rounded-3xl shrink-0">
                <Smartphone className="text-blue-600 w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Premium Only</h2>
                <p className="text-slate-600 leading-relaxed">
                  We focus exclusively on the latest iPhone models. By specializing, we can offer better logistics and faster delivery to our winners worldwide.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-emerald-50 p-6 rounded-3xl shrink-0">
                <Globe className="text-emerald-600 w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Global Reach</h2>
                <p className="text-slate-600 leading-relaxed">
                  Winners from over 50 countries have already received their devices. We handle all shipping and customs duties, so you just wait for the doorbell.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
