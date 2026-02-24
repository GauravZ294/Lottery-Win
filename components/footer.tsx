import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B0E14] text-slate-500 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-display font-black tracking-tighter text-white uppercase italic">
                Lotto<span className="text-yellow-500">247</span>
              </span>
            </div>
            <p className="text-sm font-bold uppercase tracking-widest leading-relaxed mb-8 text-slate-400">
              The premier destination for high-stakes iPhone lottery pools. 
              Transparent, secure, and provably fair.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all cursor-pointer group">
                <span className="font-black italic text-xs group-hover:scale-110 transition-transform">X</span>
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all cursor-pointer group">
                <span className="font-black italic text-xs group-hover:scale-110 transition-transform">IG</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li><Link href="/" className="hover:text-yellow-500 transition-colors">Lotto Pools</Link></li>
              <li><Link href="/allotment" className="hover:text-yellow-500 transition-colors">Allotment Center</Link></li>
              <li><Link href="/about" className="hover:text-yellow-500 transition-colors">Our Story</Link></li>
              <li><Link href="/register" className="hover:text-yellow-500 transition-colors">Join Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-8">Support</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li><Link href="/support" prefetch={true} className="hover:text-yellow-500 transition-colors">Help & Support</Link></li>
              <li><Link href="/contact" prefetch={true} className="hover:text-yellow-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/profile" prefetch={true} className="hover:text-yellow-500 transition-colors">My Account</Link></li>
              <li><Link href="/profile?tab=wallet" prefetch={true} className="hover:text-yellow-500 transition-colors">My Wallet</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-8">Legal Center</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li><Link href="/legal" prefetch={true} className="hover:text-yellow-500 transition-colors text-yellow-500">Legal Policy (India)</Link></li>
              <li><Link href="/terms" prefetch={true} className="hover:text-yellow-500 transition-colors">Terms of Play</Link></li>
              <li><Link href="/policy" prefetch={true} className="hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Play Responsibly • 18+ Only</p>
              <div className="w-px h-4 bg-white/10 hidden md:block" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Secure Payments</p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              &copy; {new Date().getFullYear()} Lotto247. All rights reserved. Registered in Curacao & Compliant with Indian Regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
