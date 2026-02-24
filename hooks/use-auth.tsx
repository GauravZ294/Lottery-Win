'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  isPrimary: boolean;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase' | 'win';
  amount: number;
  timestamp: number;
  description: string;
}

interface Ticket {
  id: string;
  labelId: number;
  number: string;
  price: number;
  timestamp: number;
}

interface AuthContextType {
  user: User | null;
  tickets: Ticket[];
  walletBalance: number;
  bankAccounts: BankAccount[];
  transactions: Transaction[];
  language: string;
  login: (email: string, name: string) => void;
  logout: () => void;
  addTicket: (labelId: number, price: number) => string;
  removeBankAccount: (id: string) => void;
  updateWallet: (amount: number, type: Transaction['type'], description: string) => void;
  addBankAccount: (bank: Omit<BankAccount, 'id' | 'isPrimary'>) => void;
  setPrimaryBank: (id: string) => void;
  setLanguage: (lang: string) => void;
  updateProfile: (details: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(5000); // Default starting balance
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('lotto_user');
      const savedTickets = localStorage.getItem('lotto_tickets');
      const savedWallet = localStorage.getItem('lotto_wallet');
      const savedBanks = localStorage.getItem('lotto_banks');
      const savedTransactions = localStorage.getItem('lotto_transactions');
      const savedLang = localStorage.getItem('lotto_lang');

      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedTickets) setTickets(JSON.parse(savedTickets));
        if (savedWallet) setWalletBalance(Number(savedWallet));
        if (savedBanks) setBankAccounts(JSON.parse(savedBanks));
        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        if (savedLang) setLanguageState(savedLang);
      }, 0);
    }
  }, []);

  const login = (email: string, name: string) => {
    const newUser = { id: Math.random().toString(36).substr(2, 9), email, name };
    setUser(newUser);
    localStorage.setItem('lotto_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lotto_user');
  };

  const addTicket = (labelId: number, price: number) => {
    if (walletBalance < price) {
      throw new Error('Insufficient wallet balance');
    }
    const newNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      labelId,
      number: newNumber,
      price,
      timestamp: Date.now(),
    };
    const updatedTickets = [...tickets, newTicket];
    const newBalance = walletBalance - price;
    
    setTickets(updatedTickets);
    setWalletBalance(newBalance);
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'purchase',
      amount: -price,
      timestamp: Date.now(),
      description: `Bought ticket for Pool ${labelId}`,
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    
    localStorage.setItem('lotto_tickets', JSON.stringify(updatedTickets));
    localStorage.setItem('lotto_wallet', newBalance.toString());
    localStorage.setItem('lotto_transactions', JSON.stringify(updatedTransactions));
    return newNumber;
  };

  const updateWallet = (amount: number, type: Transaction['type'], description: string) => {
    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      amount,
      timestamp: Date.now(),
      description,
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    
    localStorage.setItem('lotto_wallet', newBalance.toString());
    localStorage.setItem('lotto_transactions', JSON.stringify(updatedTransactions));
  };

  const addBankAccount = (bank: Omit<BankAccount, 'id' | 'isPrimary'>) => {
    const newBank: BankAccount = {
      ...bank,
      id: Math.random().toString(36).substr(2, 9),
      isPrimary: bankAccounts.length === 0,
    };
    const updatedBanks = [...bankAccounts, newBank];
    setBankAccounts(updatedBanks);
    localStorage.setItem('lotto_banks', JSON.stringify(updatedBanks));
  };

  const removeBankAccount = (id: string) => {
    const updatedBanks = bankAccounts.filter(b => b.id !== id);
    // If we removed the primary bank, set another one as primary if available
    if (bankAccounts.find(b => b.id === id)?.isPrimary && updatedBanks.length > 0) {
      updatedBanks[0].isPrimary = true;
    }
    setBankAccounts(updatedBanks);
    localStorage.setItem('lotto_banks', JSON.stringify(updatedBanks));
  };

  const setPrimaryBank = (id: string) => {
    const updatedBanks = bankAccounts.map(b => ({
      ...b,
      isPrimary: b.id === id,
    }));
    setBankAccounts(updatedBanks);
    localStorage.setItem('lotto_banks', JSON.stringify(updatedBanks));
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('lotto_lang', lang);
  };

  const updateProfile = (details: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...details };
    setUser(updatedUser);
    localStorage.setItem('lotto_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, tickets, walletBalance, bankAccounts, transactions, language,
      login, logout, addTicket, updateWallet, addBankAccount, 
      removeBankAccount, setPrimaryBank, setLanguage, updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
