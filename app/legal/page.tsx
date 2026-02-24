'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';
import { translations } from '@/lib/translations';
import { motion } from 'motion/react';
import { Shield, Scale, Gavel, Landmark, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function LegalPolicyPage() {
  const { language } = useAuth();
  const t = translations[language] || translations.en;

  const sections = [
    {
      icon: Scale,
      title: "Public Gambling Act, 1867",
      content: "Lotto247 operates in compliance with the Public Gambling Act of 1867. As per Indian law, games of skill are distinguished from games of pure chance. Our platform utilizes transparent draw mechanisms that align with modern digital entertainment regulations."
    },
    {
      icon: Landmark,
      title: "State Specific Regulations",
      content: "We strictly adhere to state-specific laws. Currently, our services are NOT available in the state of Gujarat, as per local regulations. Users from all other Indian states can legally participate in our lottery pools."
    },
    {
      icon: Gavel,
      title: "Information Technology Act, 2000",
      content: "All digital transactions, user data, and lottery draws are protected and governed by the IT Act, 2000. We implement end-to-end encryption and secure server protocols to ensure the integrity of every entry."
    },
    {
      icon: Shield,
      title: "KYC & AML Compliance",
      content: "To prevent fraud and money laundering, we follow strict Know Your Customer (KYC) guidelines. All winners must provide valid Indian government-issued ID (Aadhaar, PAN, or Passport) before claiming high-value prizes like iPhones."
    }
  ];

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
              <Shield size={16} />
              {t.compliance}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase italic tracking-tighter mb-6">
              {t.legalPolicy}
            </h1>
            <p className="text-slate-400 text-lg font-bold uppercase tracking-widest max-w-2xl mx-auto">
              {t.indianRegulations} & Compliance Framework
            </p>
          </div>
        </section>

        {/* Legal Content */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {sections.map((section, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1A1F2B] rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <section.icon size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="bg-yellow-500/10 p-5 rounded-3xl text-yellow-500">
                      <section.icon size={32} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-widest leading-loose">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Responsible Gaming Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 bg-yellow-500 rounded-[4rem] p-12 md:p-20 text-black relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <AlertTriangle size={200} />
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-8">
                {t.responsibleGaming}
              </h2>
              <p className="text-black/70 text-lg font-bold uppercase tracking-widest mb-12 max-w-2xl mx-auto leading-relaxed">
                Lottery participation should be fun and within your means. We encourage all users to play responsibly. If you feel you are spending too much time or money, please use our self-exclusion tools.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span className="font-black uppercase italic tracking-widest text-sm">18+ Only</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span className="font-black uppercase italic tracking-widest text-sm">Secure Play</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <span className="font-black uppercase italic tracking-widest text-sm">Fair Draws</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
