import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0B0E14] text-slate-500 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-display font-black tracking-tighter text-white uppercase italic">
                Lotto<span className="text-yellow-500">247</span>
              </span>
            </div>
            <p className="max-w-xs text-sm font-medium leading-relaxed">
              Lotto247 is the premier destination for high-stakes iPhone lottery pools. 
              We combine the thrill of casino gaming with the transparency of modern blockchain technology.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link href="/" className="hover:text-yellow-500 transition-colors uppercase">Lotto Pools</Link></li>
              <li><Link href="/about" className="hover:text-yellow-500 transition-colors uppercase">Our Story</Link></li>
              <li><Link href="/support" className="hover:text-yellow-500 transition-colors uppercase">Help & Support</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-500 transition-colors uppercase">Contact Us</Link></li>
              <li><Link href="/register" className="hover:text-yellow-500 transition-colors uppercase">Join Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase italic text-sm tracking-widest mb-6">Legal Center</h4>
            <ul className="space-y-3 text-sm font-bold">
              <li><Link href="/terms" className="hover:text-yellow-500 transition-colors uppercase">Terms of Play</Link></li>
              <li><Link href="/policy" className="hover:text-yellow-500 transition-colors uppercase">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">Play Responsibly • 18+ Only</p>
          <p className="text-[10px] font-bold">&copy; {new Date().getFullYear()} Lotto247. All rights reserved. Registered in Curacao.</p>
        </div>
      </div>
    </footer>
  );
}
