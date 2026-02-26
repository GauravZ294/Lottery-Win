'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Ticket, LogOut, User, Menu, X, Globe, Wallet, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/lib/translations';

export function Navbar() {
  const { user, logout, language, setLanguage, walletBalance, isInitialized } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [isUserOpen, setIsUserOpen] = React.useState(false);
  
  const t = translations[language] || translations.en;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'gu', name: 'ગુજરાતી' },
  ];

  const renderUserActions = () => {
    if (!isInitialized) {
      return (
        <div className="flex items-center gap-4">
          <div className="w-20 h-8 bg-white/5 rounded-full animate-pulse" />
          <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="relative">
          <button 
            onClick={() => setIsUserOpen(!isUserOpen)}
            className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/10"
          >
            <User size={16} className="text-yellow-500" />
            <span className="max-w-[100px] truncate">{user.name}</span>
            <ChevronDown size={14} className={`transition-transform ${isUserOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isUserOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsUserOpen(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-[#1A1F2B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-20"
                >
                  <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Wallet Balance</div>
                    <div className="flex items-center gap-2 text-yellow-500 font-black italic">
                      <Wallet size={14} />
                      ₹{walletBalance.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <Link 
                      href="/profile" 
                      onClick={() => setIsUserOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <User size={16} className="text-yellow-500" />
                      {t.profile}
                    </Link>
                    
                    <button 
                      onClick={() => {
                        logout();
                        setIsUserOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-bold text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.login}</Link>
        <Link href="/register" className="text-sm font-black text-black bg-yellow-500 px-8 py-3 rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95 uppercase italic">
          {t.joinNow}
        </Link>
      </div>
    );
  };

  const renderMobileUserActions = () => {
    if (!isInitialized) return null;

    if (user) {
      return (
        <>
          <Link href="/profile" className="block px-3 py-4 rounded-md text-sm font-black text-yellow-500 uppercase italic tracking-widest hover:bg-white/5">{t.profile}</Link>
          <button onClick={logout} className="w-full text-left block px-3 py-4 rounded-md text-sm font-black text-red-500 uppercase italic tracking-widest hover:bg-white/5">Logout</button>
        </>
      );
    }

    return (
      <>
        <Link href="/login" className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.login}</Link>
        <Link href="/register" className="block px-3 py-4 rounded-md text-sm font-black text-yellow-500 uppercase italic tracking-widest hover:bg-white/5">{t.joinNow}</Link>
      </>
    );
  };

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
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <div className="hidden xl:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.lotto}</Link>
              <Link href="/about" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.about}</Link>
              <Link href="/support" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.support}</Link>
              <Link href="/contact" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.contact}</Link>
            </div>
            <Link href="/allotment" className="text-sm font-bold text-slate-300 hover:text-yellow-500 transition-colors uppercase tracking-widest">{t.allotment}</Link>
            {renderUserActions()}
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="xl:hidden flex items-center gap-4">
            {isInitialized && user && (
              <div className="md:hidden flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Wallet size={14} className="text-yellow-500" />
                <span className="text-xs font-black text-white italic">₹{walletBalance.toLocaleString()}</span>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#1A1F2B] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.lotto}</Link>
              <Link href="/allotment" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.allotment}</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.about}</Link>
              <Link href="/support" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.support}</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-4 rounded-md text-sm font-black text-white uppercase italic tracking-widest hover:bg-white/5">{t.contact}</Link>
              {renderMobileUserActions()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
