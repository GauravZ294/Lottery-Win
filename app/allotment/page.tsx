'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, Users, Zap, Bell, PhoneCall, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function AllotmentPage() {
  const { language } = useAuth();
  const t = translations[language] || translations.en;

  const [drawDate] = useState(new Date('2026-02-25'));
  const [isDrawDay, setIsDrawDay] = useState(false);

  const pools = React.useMemo(() => [
    { id: 1, price: 200, users: 100000, winners: 10, chance: t.lowChance, color: 'text-blue-400' },
    { id: 2, price: 500, users: 50000, winners: 10, chance: t.mediumChance, color: 'text-yellow-500' },
    { id: 3, price: 1000, users: 10000, winners: 10, chance: t.highChance, color: 'text-green-500' },
  ], [t]);

  const [winningNumbers, setWinningNumbers] = useState<Record<number, string[]>>({});

  useEffect(() => {
    const numbers: Record<number, string[]> = {};
    pools.forEach(pool => {
      numbers[pool.id] = Array.from({ length: pool.winners }, () => 
        Math.floor(1000000 + Math.random() * 9000000).toString()
      );
    });
    
    setTimeout(() => {
      setWinningNumbers(numbers);
    }, 0);
    
    // Simulate draw day toggle for demo purposes
    const timer = setTimeout(() => {
      // In a real app, this would check the current date against the draw date
    }, 1000);

    return () => clearTimeout(timer);
  }, [pools]);

  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-2 rounded-full text-xs font-black mb-8 uppercase italic tracking-widest shadow-lg"
            >
              <Calendar size={16} />
              {t.allotmentSoon}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-6">
              {t.allotment} <span className="text-yellow-500">Center</span>
            </h1>
            <p className="text-slate-400 text-lg font-bold uppercase tracking-widest max-w-2xl mx-auto">
              {t.allotmentSoon} - {format(drawDate, 'MMMM dd, yyyy')}
            </p>
          </div>
        </section>

        {/* Timeline & Info */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1A1F2B] rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center text-center">
              <div className="bg-yellow-500/10 p-5 rounded-3xl text-yellow-500 mb-6">
                <Bell size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">SMS Notifications</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                {t.notificationNote}
              </p>
            </div>
            <div className="bg-[#1A1F2B] rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center text-center">
              <div className="bg-yellow-500/10 p-5 rounded-3xl text-yellow-500 mb-6">
                <PhoneCall size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">Direct Support</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                {t.supportCallNote}
              </p>
            </div>
            <div className="bg-[#1A1F2B] rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center text-center">
              <div className="bg-yellow-500/10 p-5 rounded-3xl text-yellow-500 mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">Live Updates</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                Winning numbers are displayed here immediately after the draw.
              </p>
            </div>
          </div>

          {/* Allotment Labels */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-4">
                {t.allotmentTimeline}
              </h2>
              <div className="h-1 w-24 bg-yellow-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 gap-8">
              {pools.map((pool) => (
                <div key={pool.id} className="bg-[#1A1F2B] rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Trophy size={160} />
                  </div>
                  
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
                    <div className="flex items-center gap-8">
                      <div className="bg-white/5 p-6 rounded-[2rem] text-yellow-500">
                        <Zap size={48} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">₹{pool.price} Pool</h3>
                        <div className="flex flex-wrap gap-4 mt-4">
                          <span className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/10 flex items-center gap-2">
                            <Users size={14} /> {pool.users.toLocaleString()} {t.users}
                          </span>
                          <span className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/10 flex items-center gap-2">
                            <Trophy size={14} /> {pool.winners} {t.winnersCount}
                          </span>
                          <span className={`bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2 ${pool.color}`}>
                            {t.winChance}: {pool.chance}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-auto">
                      <div className="bg-black/40 rounded-3xl p-8 border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.drawStatus}</span>
                          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest animate-pulse">{t.upcoming}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-white uppercase italic tracking-widest mb-4">{t.winningNumbers}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {winningNumbers[pool.id]?.map((num, i) => (
                              <div key={i} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-center">
                                <span className="text-xs font-mono font-black text-yellow-500 tracking-widest">
                                  {isDrawDay ? num : '*******'}
                                </span>
                              </div>
                            ))}
                          </div>
                          {!isDrawDay && (
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4 text-center italic">
                              {t.allotmentSoon}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing CTA */}
        <section className="py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-[4rem] p-16 text-black relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Zap size={200} />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter mb-6">
                  Higher Entry, <span className="text-white">Higher Chance</span>
                </h2>
                <p className="text-black/70 text-lg font-bold uppercase tracking-widest mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join the ₹1000 pool for the best winning odds. Only 10,000 users compete for 10 iPhones!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link 
                    href="/#pools" 
                    className="bg-black text-white px-12 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-slate-900 transition-all shadow-2xl"
                  >
                    Buy ₹1000 Ticket
                  </Link>
                  <Link 
                    href="/#pools" 
                    className="bg-white/20 text-black px-12 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-white/30 transition-all border border-black/10"
                  >
                    View All Pools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
