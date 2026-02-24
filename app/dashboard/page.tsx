'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Ticket, Calendar, Smartphone, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user, tickets } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col bg-[#0B0E14]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-black text-white uppercase italic mb-4">Access Denied</h1>
            <Link href="/login" className="text-yellow-500 font-black uppercase italic hover:underline">Go to Login</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">My Tickets</h1>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Welcome back, {user.name}. Good luck!</p>
            </div>
            <div className="bg-[#1A1F2B] px-8 py-4 rounded-[2rem] border border-white/5 flex items-center gap-6 shadow-xl">
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Entries</div>
                <div className="text-3xl font-display font-black text-yellow-500 italic">{tickets.length}</div>
              </div>
              <div className="bg-yellow-500 p-3 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                <Ticket className="text-black" size={28} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div key={ticket.id} className="bg-[#1A1F2B] rounded-[2.5rem] p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-[#232936] transition-all group">
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="bg-white/5 p-5 rounded-3xl shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                      <Smartphone size={40} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">iPhone 16 Pro Max</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 uppercase tracking-widest">
                          <Calendar size={14} className="text-yellow-500" />
                          {format(ticket.timestamp, 'MMM dd, yyyy')}
                        </span>
                        <span className="text-[10px] font-black text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-yellow-500/20">
                          Pool {ticket.labelId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-1 w-full md:w-auto">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Ticket ID</div>
                    <div className="text-4xl font-mono font-black text-white tracking-[0.2em]">
                      {ticket.number}
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 text-xs font-black text-black bg-yellow-500 px-8 py-4 rounded-2xl hover:bg-yellow-400 transition-all uppercase italic tracking-widest">
                      Draw Details
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#1A1F2B] rounded-[3rem] p-20 text-center border border-dashed border-white/10">
                <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Ticket className="text-slate-700" size={48} />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-3">No Active Tickets</h3>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-10 max-w-xs mx-auto">You haven&apos;t entered any pools yet. The next draw is starting soon!</p>
                <Link href="/" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-10 py-4 rounded-full font-black hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] uppercase italic tracking-widest">
                  Play Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
