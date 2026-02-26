import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Ticket } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0B0E14]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Ticket className="text-slate-700" size={48} />
          </div>
          <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter mb-4">404 - Page Not Found</h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-yellow-500 text-black px-10 py-4 rounded-full font-black hover:bg-yellow-400 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] uppercase italic tracking-widest">
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
