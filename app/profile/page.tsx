'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { 
  User, 
  Wallet, 
  CreditCard, 
  Settings, 
  Ticket, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  Smartphone,
  Calendar,
  ChevronRight,
  Banknote
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/lib/translations';

export default function ProfilePage() {
  const { 
    user, 
    tickets, 
    walletBalance, 
    bankAccounts, 
    transactions,
    language, 
    updateWallet, 
    addBankAccount, 
    removeBankAccount,
    setPrimaryBank,
    updateProfile 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'tickets' | 'wallet' | 'bank' | 'settings'>('tickets');
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isAddingFunds, setIsAddingFunds] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [expandedPoolId, setExpandedPoolId] = useState<number | null>(null);
  const [transactionLimit, setTransactionLimit] = useState<number | 'all'>(10);
  
  const t = translations[language] || translations.en;

  const pools = [
    { id: 1, price: 200, title: "iPhone 16 Pro Max" },
    { id: 2, price: 500, title: "iPhone 16 Pro Max" },
    { id: 3, price: 1000, title: "iPhone 16 Pro Max" },
  ];

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col bg-[#0B0E14]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-black text-white uppercase italic mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">Please login to view your profile.</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    const primaryBank = bankAccounts.find(b => b.isPrimary);

    if (!primaryBank) {
      setWithdrawError(t.selectPrimaryBank);
      return;
    }

    if (amount > walletBalance) {
      setWithdrawError(t.insufficientBalance);
      return;
    }

    if (amount <= 0) {
      setWithdrawError("Please enter a valid amount");
      return;
    }

    updateWallet(-amount, 'withdrawal', `Withdrawal to ${primaryBank.bankName}`);
    setWithdrawSuccess(true);
    setWithdrawError('');
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(false);
      setWithdrawAmount('');
    }, 2000);
  };

  const tabs = [
    { id: 'tickets', label: t.myTickets, icon: Ticket },
    { id: 'wallet', label: t.wallet, icon: Wallet },
    { id: 'bank', label: t.bankDetails, icon: CreditCard },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="bg-[#1A1F2B] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl sticky top-32">
                <div className="text-center mb-10">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                    <User size={48} />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{user.name}</h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest transition-all ${
                        activeTab === tab.id 
                          ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                {activeTab === 'tickets' && (
                  <motion.div
                    key="tickets"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{t.myTickets}</h2>
                      <div className="bg-white/5 px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Total: {tickets.length}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {pools.map((pool) => {
                        const poolTickets = tickets.filter(tk => tk.labelId === pool.id);
                        const isExpanded = expandedPoolId === pool.id;
                        
                        return (
                          <div key={pool.id} className="space-y-4">
                            <button 
                              onClick={() => setExpandedPoolId(isExpanded ? null : pool.id)}
                              className="w-full bg-[#1A1F2B] rounded-[2rem] p-6 border border-white/5 flex items-center justify-between hover:bg-[#232936] transition-all group"
                            >
                              <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl transition-all duration-500 ${poolTickets.length > 0 ? 'bg-yellow-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                                  <Ticket size={24} />
                                </div>
                                <div className="text-left">
                                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">{pool.title}</h3>
                                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">₹{pool.price} Pool</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tickets Bought</div>
                                  <div className="text-2xl font-black text-white italic">{poolTickets.length}</div>
                                </div>
                                <ChevronRight className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                              </div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden space-y-3 pl-8"
                                >
                                  {poolTickets.length > 0 ? (
                                    poolTickets.map((ticket) => (
                                      <div key={ticket.id} className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {format(ticket.timestamp, 'MMM dd, HH:mm')}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID:</div>
                                          <div className="text-xl font-mono font-black text-yellow-500 tracking-widest">
                                            {ticket.number}
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="bg-white/5 rounded-2xl p-8 text-center border border-dashed border-white/10">
                                      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">No tickets bought for this pool yet.</p>
                                      <Link href="/" className="text-yellow-500 text-[10px] font-black uppercase tracking-widest hover:underline mt-2 inline-block">
                                        Buy Now
                                      </Link>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'wallet' && (
                  <motion.div
                    key="wallet"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{t.wallet}</h2>
                    
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-[3rem] p-12 text-black shadow-[0_0_50px_rgba(234,179,8,0.2)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Wallet size={160} />
                      </div>
                      <div className="relative z-10">
                        <p className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60 italic">Available Balance</p>
                        <h3 className="text-6xl font-display font-black italic tracking-tighter">₹{walletBalance.toLocaleString()}</h3>
                        
                        <div className="flex gap-4 mt-12">
                          <button 
                            onClick={() => setIsAddingFunds(true)}
                            className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all"
                          >
                            <ArrowDownLeft size={18} />
                            {t.addFunds}
                          </button>
                          <button 
                            onClick={() => setIsWithdrawing(true)}
                            className="bg-white/20 backdrop-blur-md text-black px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest flex items-center gap-2 hover:bg-white/30 transition-all border border-black/10"
                          >
                            <ArrowUpRight size={18} />
                            {t.withdraw}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1A1F2B] rounded-[2.5rem] p-8 border border-white/5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h4 className="text-white font-black uppercase italic text-sm tracking-widest">{t.transactions}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.show}:</span>
                          {[10, 20, 'all'].map(limit => (
                            <button
                              key={limit}
                              onClick={() => setTransactionLimit(limit as any)}
                              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                                transactionLimit === limit 
                                  ? 'bg-yellow-500 text-black' 
                                  : 'bg-white/5 text-slate-400 hover:text-white'
                              }`}
                            >
                              {limit === 'all' ? t.all : limit}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {transactions.length > 0 ? (
                          (transactionLimit === 'all' ? transactions : transactions.slice(0, transactionLimit)).map((tx) => (
                            <div key={tx.id} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-colors">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${
                                  tx.amount > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {tx.amount > 0 ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                </div>
                                <div>
                                  <p className="text-xs font-black text-white uppercase italic">{tx.description}</p>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase">{format(tx.timestamp, 'MMM dd, yyyy HH:mm')}</p>
                                </div>
                              </div>
                              <span className={`text-sm font-black ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{t.noTransactions}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#1A1F2B] rounded-[2.5rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center">
                      <Banknote className="text-yellow-500 mb-4" size={48} />
                      <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-2">Winning History</h4>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">You haven&apos;t won any jackpots yet. Keep playing!</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'bank' && (
                  <motion.div
                    key="bank"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{t.bankDetails}</h2>
                      <button 
                        onClick={() => setIsAddingBank(true)}
                        className="bg-yellow-500 text-black px-6 py-3 rounded-2xl font-black uppercase italic text-xs tracking-widest flex items-center gap-2 hover:bg-yellow-400 transition-all"
                      >
                        <Plus size={18} />
                        {t.addAccount}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {bankAccounts.length > 0 ? (
                        [...bankAccounts].sort((a, b) => (a.isPrimary === b.isPrimary ? 0 : a.isPrimary ? -1 : 1)).map((account) => (
                          <div key={account.id} className="bg-[#1A1F2B] rounded-[2.5rem] p-8 border border-white/5 relative group overflow-hidden">
                            {account.isPrimary && (
                              <div className="absolute top-0 right-0 bg-yellow-500 text-black px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase italic tracking-widest shadow-lg">
                                {t.primaryAccount}
                              </div>
                            )}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                              <div className="flex items-center gap-6">
                                <div className="bg-white/5 p-5 rounded-3xl text-yellow-500">
                                  <CreditCard size={32} />
                                </div>
                                <div>
                                  <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{account.bankName}</h4>
                                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Acc: ****{account.accountNumber.slice(-4)}</p>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                {!account.isPrimary && (
                                  <button 
                                    onClick={() => setPrimaryBank(account.id)}
                                    className="text-[10px] font-black text-yellow-500 uppercase tracking-widest hover:underline"
                                  >
                                    {t.makePrimary}
                                  </button>
                                )}
                                <button 
                                  onClick={() => removeBankAccount(account.id)}
                                  className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                                >
                                  {t.remove}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="bg-[#1A1F2B] rounded-[3rem] p-20 text-center border border-dashed border-white/10">
                          <CreditCard className="text-slate-700 mx-auto mb-6" size={64} />
                          <h3 className="text-xl font-black text-white uppercase italic mb-2">No Bank Accounts</h3>
                          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-8">Add a bank account to withdraw your winnings.</p>
                          <button 
                            onClick={() => setIsAddingBank(true)}
                            className="inline-flex items-center gap-2 bg-white/5 text-white px-10 py-4 rounded-full font-black uppercase italic tracking-widest hover:bg-white/10 transition-all border border-white/10"
                          >
                            <Plus size={18} />
                            Add First Account
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-3xl font-display font-black text-white uppercase italic tracking-tighter">{t.settings}</h2>
                    
                    <div className="bg-[#1A1F2B] rounded-[2.5rem] p-10 border border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.fullName}</label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic">
                              {user.name}
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.emailAddress}</label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.phoneNumber}</label>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold italic">
                              {user.phone || 'NOT ADDED'}
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.accountStatus}</label>
                            <div className="flex items-center gap-2 text-green-500 font-black uppercase italic text-xs">
                              <CheckCircle2 size={16} />
                              {t.verifiedMember}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-12 pt-12 border-t border-white/5">
                        <button 
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-yellow-500 text-black px-10 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-yellow-400 transition-all"
                        >
                          {t.editProfile}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddingBank && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingBank(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2B] w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-black text-white uppercase italic mb-8">{t.addAccount}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addBankAccount({
                  bankName: formData.get('bankName') as string,
                  accountNumber: formData.get('accountNumber') as string,
                  ifsc: formData.get('ifsc') as string,
                });
                setIsAddingBank(false);
              }} className="space-y-6">
                <input name="bankName" required placeholder={t.bankName} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold uppercase italic text-sm focus:border-yellow-500 outline-none" />
                <input name="accountNumber" required placeholder={t.accountNumber} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold uppercase italic text-sm focus:border-yellow-500 outline-none" />
                <input name="ifsc" required placeholder={t.ifscCode} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold uppercase italic text-sm focus:border-yellow-500 outline-none" />
                <button type="submit" className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase italic tracking-widest text-sm">{t.saveAccount}</button>
              </form>
            </motion.div>
          </div>
        )}

        {isAddingFunds && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingFunds(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2B] w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-black text-white uppercase italic mb-8">{t.addFunds}</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[500, 1000, 5000, 10000].map(amt => (
                  <button 
                    key={amt}
                    onClick={() => {
                      updateWallet(amt, 'deposit', 'Funds added to wallet');
                      setIsAddingFunds(false);
                    }}
                    className="bg-white/5 border border-white/10 rounded-2xl py-4 text-white font-black italic hover:bg-yellow-500 hover:text-black transition-all"
                  >
                    +₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <button onClick={() => setIsAddingFunds(false)} className="w-full text-slate-500 font-black uppercase italic text-xs tracking-widest">{t.cancel}</button>
            </motion.div>
          </div>
        )}

        {isWithdrawing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWithdrawing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2B] w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-black text-white uppercase italic mb-8">{t.withdraw}</h3>
              
              {withdrawSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <p className="text-white font-black uppercase italic tracking-widest text-sm">{t.withdrawSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.enterAmount}</label>
                    <input 
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required 
                      placeholder="0.00" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black italic text-2xl focus:border-yellow-500 outline-none" 
                    />
                  </div>
                  
                  {withdrawError && (
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{withdrawError}</p>
                  )}

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Withdraw to:</p>
                    {bankAccounts.find(b => b.isPrimary) ? (
                      <div className="flex items-center gap-3">
                        <CreditCard size={16} className="text-yellow-500" />
                        <span className="text-xs font-bold text-white uppercase italic">
                          {bankAccounts.find(b => b.isPrimary)?.bankName} (****{bankAccounts.find(b => b.isPrimary)?.accountNumber.slice(-4)})
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-red-500 uppercase italic">{t.selectPrimaryBank}</p>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase italic tracking-widest text-sm">{t.withdraw}</button>
                  <button type="button" onClick={() => setIsWithdrawing(false)} className="w-full text-slate-500 font-black uppercase italic text-xs tracking-widest">{t.cancel}</button>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {isEditingProfile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingProfile(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2B] w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 relative z-10"
            >
              <h3 className="text-2xl font-black text-white uppercase italic mb-8">{t.editProfile}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateProfile({
                  name: formData.get('name') as string,
                  phone: formData.get('phone') as string,
                });
                setIsEditingProfile(false);
              }} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.fullName}</label>
                  <input name="name" defaultValue={user.name} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold uppercase italic text-sm focus:border-yellow-500 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-[0.2em]">{t.phoneNumber}</label>
                  <input name="phone" defaultValue={user.phone} placeholder="ENTER PHONE NUMBER" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold uppercase italic text-sm focus:border-yellow-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase italic tracking-widest text-sm">{t.saveProfile}</button>
                <button type="button" onClick={() => setIsEditingProfile(false)} className="w-full text-slate-500 font-black uppercase italic text-xs tracking-widest">{t.cancel}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
