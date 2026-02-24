'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/hooks/use-auth';
import { translations } from '@/lib/translations';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { language } = useAuth();
  const t = translations[language] || translations.en;

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
              {t.contact}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg font-bold uppercase tracking-widest max-w-2xl mx-auto"
            >
              {t.contactDesc}
            </motion.p>
          </div>
        </section>

        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1A1F2B] rounded-[3rem] p-12 border border-white/5 shadow-2xl"
            >
              <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-8">
                {t.sendMessage}
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">{t.fullName}</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic focus:border-yellow-500 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">{t.emailAddress}</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic focus:border-yellow-500 outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">{t.subject}</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic focus:border-yellow-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">{t.message}</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic focus:border-yellow-500 outline-none transition-colors resize-none" />
                </div>
                <button className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase italic tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                  <Send size={18} />
                  {t.sendMessage}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-8">
                  {t.contactInfo}
                </h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="bg-white/5 p-5 rounded-3xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                      <p className="text-xl font-black text-white italic tracking-tight">support@lotto247.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="bg-white/5 p-5 rounded-3xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                      <p className="text-xl font-black text-white italic tracking-tight">+91 1800 247 000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="bg-white/5 p-5 rounded-3xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Office</p>
                      <p className="text-xl font-black text-white italic tracking-tight">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-[3rem] p-10">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare className="text-yellow-500" size={32} />
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Live Chat</h3>
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6 leading-relaxed">
                  Need immediate help? Our support agents are online and ready to assist you.
                </p>
                <button className="text-yellow-500 font-black uppercase italic text-xs tracking-widest hover:underline">
                  Start Chat Now →
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
