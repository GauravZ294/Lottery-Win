'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Users, Timer, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Countdown } from './countdown';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { translations } from '@/lib/translations';
import confetti from 'canvas-confetti';

import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface FlashSaleCardProps {
  id: number;
  title: string;
  price: number;
  winners: number;
  totalUsers: number;
  targetDate: Date;
  image: string;
}

export function FlashSaleCard({ id, title, price, winners, totalUsers, targetDate, image }: FlashSaleCardProps) {
  const { user, addTicket, language, isInitialized } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const t = translations[language] || translations.en;

  const handleAction = async () => {
    if (!isInitialized) return;
    if (!user) {
      router.push(`/register?label=${id}&price=${price}`);
      return;
    }

    setIsProcessing(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const number = addTicket(id, price);
      setTicketNumber(number);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFFFFF', '#E63946']
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-[#1A1F2B] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col h-full group relative"
    >
      {/* Jackpot Badge */}
      <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
        Jackpot Pool
      </div>

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A1F2B] to-transparent" />
      </div>

      <div className="p-6 pt-0 flex flex-col flex-grow">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-yellow-500/80 text-[10px] font-bold uppercase tracking-widest">
              <Users size={12} />
              <span>{winners} {t.winners} / {totalUsers.toLocaleString()} {t.users}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.entry}</div>
            <div className="text-3xl font-black text-yellow-500 italic">{formatCurrency(price)}</div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Timer size={14} className="text-yellow-500" />
            <span>{t.drawStarts}</span>
          </div>
          <Countdown targetDate={targetDate} />
        </div>

        <div className="mt-auto">
          {error && (
            <p className="text-red-500 text-[10px] font-bold uppercase mb-2 text-center">{error}</p>
          )}
          {ticketNumber ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center animate-in fade-in zoom-in duration-500">
              <div className="flex items-center justify-center gap-2 text-yellow-500 font-black mb-1 uppercase text-xs">
                <CheckCircle2 size={16} />
                <span>Ticket Secured!</span>
              </div>
              <div className="text-3xl font-mono font-black tracking-[0.2em] text-white">
                {ticketNumber}
              </div>
            </div>
          ) : (
            <button
              onClick={handleAction}
              disabled={isProcessing}
              className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group uppercase italic tracking-widest text-sm shadow-[0_0_30px_rgba(234,179,8,0.2)]"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  {isInitialized && user ? t.buyTicket : t.registerToPlay}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
