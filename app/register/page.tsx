'use client';

import React, { useState, Suspense } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const labelId = searchParams.get('label');
  const price = searchParams.get('price');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, formData.name);
    
    if (labelId && price) {
      router.push(`/?label=${labelId}&price=${price}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-md w-full bg-[#1A1F2B] rounded-[2.5rem] p-10 shadow-2xl border border-white/5 relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-black text-white mb-3 uppercase italic tracking-tighter">Join the Club</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Start your winning journey today.</p>
      </div>

      {price && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 mb-10 flex items-center justify-between">
          <span className="text-yellow-500 font-black uppercase italic text-xs">Selected Entry:</span>
          <span className="text-3xl font-display font-black text-white italic">₹{price}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
            <input
              type="text"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-white transition-all font-bold"
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-white transition-all font-bold"
              placeholder="EMAIL@EXAMPLE.COM"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.2em]">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
            <input
              type="password"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-white transition-all font-bold"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(234,179,8,0.2)] uppercase italic tracking-widest"
        >
          Create Account
          <ArrowRight size={20} />
        </button>
      </form>

      <p className="text-center mt-10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        Already a member?{' '}
        <button onClick={() => router.push('/login')} className="text-yellow-500 hover:underline">
          Login Now
        </button>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-yellow-500/5 rounded-full blur-[150px]" />
        </div>
        <Suspense fallback={<div className="text-yellow-500 font-black italic animate-pulse">LOADING...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
