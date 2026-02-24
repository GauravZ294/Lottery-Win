'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Ticket, LogOut, User, Menu, X, Globe, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/lib/translations';

export function Navbar() {
  const { user, logout, language, setLanguage, walletBalance } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  
  const t = translations[language] || translations.en;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'gu', name: 'ગુજરાતી' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-yellow-500 p-2 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                <Ticket className="text-black w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-white uppercase italic">
                Lotto<span className="text-yellow-500">247</span>
              </span>
            </Link>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                <Globe size={14} className="text-yellow-500" />
                {languages.find(l => l.code === language)?.name}
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-32 bg-[#1A1F2B] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 transition-colors ${language === lang.code ? 'text-yellow-500' : 'text-slate-400'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.lotto}</Link>
            <Link href="/allotment" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.allotment}</Link>
            <Link href="/about" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.about}</Link>
            <Link href="/support" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.support}</Link>
            <Link href="/contact" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.contact}</Link>
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Wallet size={16} className="text-yellow-500" />
                  <span className="text-sm font-black text-white italic">₹{walletBalance.toLocaleString()}</span>
                </div>
                <Link href="/profile" className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                  <User size={16} className="text-yellow-500" />
                  {user.name}
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.login}</Link>
                <Link href="/register" className="text-sm font-black text-black bg-yellow-500 px-8 py-3 rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 uppercase italic">
                  {t.joinNow}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A1F2B] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.lotto}</Link>
              <Link href="/allotment" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.allotment}</Link>
              <Link href="/about" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.about}</Link>
              <Link href="/support" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.support}</Link>
              <Link href="/contact" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.contact}</Link>
              {user ? (
                <>
                  <Link href="/profile" className="block px-3 py-4 rounded-md text-sm font-black text-yellow-500 uppercase italic tracking-widest hover:bg-white/5">{t.profile}</Link>
                  <div className="px-3 py-4 flex items-center gap-2 text-white font-black italic">
                    <Wallet size={16} className="text-yellow-500" />
                    ₹{walletBalance.toLocaleString()}
                  </div>
                  <button onClick={logout} className="w-full text-left block px-3 py-4 rounded-md text-sm font-black text-red-500 uppercase italic tracking-widest hover:bg-white/5">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.login}</Link>
                  <Link href="/register" className="block px-3 py-4 rounded-md text-sm font-black text-yellow-500 uppercase italic tracking-widest hover:bg-white/5">{t.joinNow}</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
