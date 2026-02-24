'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FlashSaleCard } from '@/components/flash-sale-card';
import { Smartphone, ShieldCheck, Trophy, Zap, CheckCircle2, Star, Users, ArrowRight, Play, Wallet, Ticket, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '@/hooks/use-auth';
import { translations } from '@/lib/translations';

export default function Home() {
  const { language } = useAuth();
  const t = translations[language] || translations.en;
  
  const [winners, setWinners] = React.useState<number[]>([]);
  
  React.useEffect(() => {
    setWinners([1, 2, 3, 4, 5].map(() => Math.floor(Math.random() * 9999)));
  }, []);

  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const flashSales = [
    {
      id: 1,
      title: "iPhone 16 Pro Max",
      price: 200,
      winners: 10,
      totalUsers: 100000,
      targetDate: thirtyDaysFromNow,
      image: "https://picsum.photos/id/160/800/800"
    },
    {
      id: 2,
      title: "iPhone 16 Pro Max",
      price: 500,
      winners: 10,
      totalUsers: 50000,
      targetDate: thirtyDaysFromNow,
      image: "https://picsum.photos/id/1/800/800"
    },
    {
      id: 3,
      title: "iPhone 16 Pro Max",
      price: 1000,
      winners: 10,
      totalUsers: 10000,
      targetDate: thirtyDaysFromNow,
      image: "https://picsum.photos/id/0/800/800"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-[#0B0E14]" />
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-yellow-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-2 rounded-full text-xs font-black mb-8 uppercase italic tracking-widest shadow-[0_0_30px_rgba(234,179,8,0.5)]">
              <Zap size={16} fill="currentColor" />
              {t.liveJackpots}
            </div>
            <h1 className="text-7xl md:text-9xl font-display font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.85]">
              {t.heroTitle.split('.')[0]}. <br />
              <span className="text-yellow-500">{t.heroTitle.split('.')[1]}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-6 font-bold uppercase tracking-tight">
              {t.heroSub}
            </p>
            <p className="text-sm text-red-500 font-black uppercase tracking-widest mb-12 animate-pulse">
              {t.guarantee}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => document.getElementById('pools')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 text-black px-12 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 text-lg"
              >
                {t.buyTicket}
              </button>
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-white/20 transition-all border border-white/10 text-lg"
              >
                {t.howItWorks}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Winner Ticker */}
      <div className="bg-yellow-500 py-4 overflow-hidden relative z-20">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...winners, ...winners].map((id, i) => (
            <div key={i} className="flex items-center gap-4 text-sm font-black text-black uppercase italic">
              <Trophy size={18} />
              <span>User_{id} WON iPhone 16 Pro Max</span>
              <div className="w-2 h-2 bg-black rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Pools Section */}
      <section id="pools" className="py-32 bg-[#0B0E14] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-6">
              Active <span className="text-yellow-500">Pools</span>
            </h2>
            <p className="text-slate-500 text-lg font-bold uppercase tracking-widest">Choose your entry and start winning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {flashSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FlashSaleCard {...sale} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-6">
              {t.howItWorks}
            </h2>
            <p className="text-slate-500 text-lg font-bold uppercase tracking-widest">Simple steps to your dream phone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: t.step1, desc: t.step1Desc, icon: Users },
              { step: "02", title: t.step2, desc: t.step2Desc, icon: Wallet },
              { step: "03", title: t.step3, desc: t.step3Desc, icon: Ticket },
              { step: "04", title: t.step4, desc: t.step4Desc, icon: Trophy },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1F2B] rounded-[3rem] p-10 border border-white/5 relative group"
              >
                <div className="text-6xl font-display font-black text-white/5 absolute top-8 right-8 group-hover:text-yellow-500/10 transition-colors">
                  {item.step}
                </div>
                <div className="bg-white/5 p-6 rounded-3xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500 mb-8 inline-block">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">{item.title}</h3>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Flow Info */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[3rem] p-12">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-4">
                <Zap className="text-yellow-500" />
                Win Chance Logic
              </h3>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed mb-6">
                Your winning probability depends on the pool you choose. Higher entry amounts mean smaller user pools and significantly higher chances of winning.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-white font-black italic">₹1000 Pool</span>
                  <span className="text-green-500 font-black uppercase text-[10px] tracking-widest">1 in 1,000 Chance</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-white font-black italic">₹500 Pool</span>
                  <span className="text-yellow-500 font-black uppercase text-[10px] tracking-widest">1 in 5,000 Chance</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-white font-black italic">₹200 Pool</span>
                  <span className="text-blue-400 font-black uppercase text-[10px] tracking-widest">1 in 10,000 Chance</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[3rem] p-12">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6 flex items-center gap-4">
                <Bell className="text-yellow-500" />
                Winner Notification
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-yellow-500/20 p-2 rounded-lg h-fit text-yellow-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                    Winning numbers are displayed live on our <span className="text-white italic">Allotment Page</span>.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-yellow-500/20 p-2 rounded-lg h-fit text-yellow-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                    Winners receive an instant SMS notification on their registered mobile number.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-yellow-500/20 p-2 rounded-lg h-fit text-yellow-500">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                    Our support team will call you personally to confirm shipping details for your new iPhone.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Stats Section */}
      <section className="py-32 bg-[#0B0E14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Total Winners", value: "12,450+" },
              { label: "Active Users", value: "850K+" },
              { label: "iPhones Delivered", value: "5,200+" },
              { label: "Trust Score", value: "4.9/5" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-display font-black text-yellow-500 italic tracking-tighter mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-8 leading-[0.9]">
                Why <span className="text-yellow-500">Lotto247</span> is the best choice
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Provably Fair", desc: "Every draw is verifiable on the blockchain for 100% transparency." },
                  { title: "Instant Payouts", desc: "Winnings are credited to your wallet immediately after the draw." },
                  { title: "24/7 Support", desc: "Our dedicated team is always here to help you with any queries." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="bg-yellow-500/10 p-3 rounded-xl text-yellow-500 h-fit">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-bold uppercase text-xs tracking-widest leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-yellow-500 rounded-[4rem] p-12 relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Star size={200} fill="currentColor" />
                </div>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="black" />)}
                  </div>
                  <p className="text-2xl font-black text-black uppercase italic tracking-tighter mb-8 leading-tight">
                    &quot;I never thought I&apos;d win, but Lotto247 changed my life! Got my iPhone 16 Pro Max delivered in just 3 days.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full" />
                    <div>
                      <p className="font-black uppercase italic text-sm">Rahul Sharma</p>
                      <p className="text-black/60 text-[10px] font-black uppercase tracking-widest">Verified Winner</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
