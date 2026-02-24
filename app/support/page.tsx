'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';
import { translations } from '@/lib/translations';
import { motion } from 'motion/react';
import { HelpCircle, Book, Shield, Zap, ChevronRight, Search, Wallet, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  const { language } = useAuth();
  const t = translations[language] || translations.en;

  const categories = [
    { icon: Book, title: "Getting Started", desc: "Learn the basics of playing Lotto247" },
    { icon: Wallet, title: "Payments & Wallet", desc: "How to add funds and withdraw winnings" },
    { icon: Shield, title: "Security & Privacy", desc: "Your data and funds are safe with us" },
    { icon: Zap, title: "Draws & Winners", desc: "How draws work and how winners are picked" },
  ];

  const faqs = [
    { q: "How do I buy a ticket?", a: "Simply register, add funds to your wallet, and click 'Buy Ticket' on any active pool." },
    { q: "Is it legal in India?", a: "Yes, Lotto247 operates legally in all Indian states except Gujarat." },
    { q: "How are winners selected?", a: "Winners are selected using a transparent, provably fair random number generator." },
    { q: "When can I withdraw my winnings?", a: "You can withdraw your winnings instantly to your primary bank account once the draw is complete." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-6"
            >
              {t.support}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg font-bold uppercase tracking-widest max-w-2xl mx-auto mb-12"
            >
              {t.supportDesc}
            </motion.p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search for help..." 
                className="w-full bg-[#1A1F2B] border border-white/10 rounded-full px-16 py-6 text-white font-bold italic focus:border-yellow-500 outline-none transition-all shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-12 text-center">
            {t.supportCategories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1F2B] rounded-[2.5rem] p-10 border border-white/5 hover:border-yellow-500/30 transition-all group cursor-pointer"
              >
                <div className="bg-white/5 p-5 rounded-3xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500 mb-6 inline-block">
                  <cat.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">{cat.title}</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-12 text-center">
              {t.faq}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1A1F2B] rounded-3xl p-8 border border-white/5 hover:bg-[#232936] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">{faq.q}</h3>
                    <ChevronRight className="text-slate-500 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed hidden group-hover:block">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-500 rounded-[4rem] p-16 text-black relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <HelpCircle size={200} />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-6">
                  Still Need Help?
                </h2>
                <p className="text-black/60 text-lg font-bold uppercase tracking-widest mb-10 max-w-xl mx-auto">
                  Our support team is available 24/7 to answer your questions.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-3 bg-black text-white px-12 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-slate-900 transition-all shadow-2xl"
                >
                  <MessageSquare size={20} />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
