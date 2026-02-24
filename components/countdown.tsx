'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-center">
      <div className="bg-white/10 border border-white/10 text-white px-3 py-2 rounded-xl min-w-[60px] backdrop-blur-sm">
        <div className="text-2xl font-black font-mono text-yellow-500">{timeLeft.days}</div>
        <div className="text-[10px] uppercase font-bold opacity-50">Days</div>
      </div>
      <div className="bg-white/10 border border-white/10 text-white px-3 py-2 rounded-xl min-w-[60px] backdrop-blur-sm">
        <div className="text-2xl font-black font-mono text-yellow-500">{timeLeft.hours}</div>
        <div className="text-[10px] uppercase font-bold opacity-50">Hrs</div>
      </div>
      <div className="bg-white/10 border border-white/10 text-white px-3 py-2 rounded-xl min-w-[60px] backdrop-blur-sm">
        <div className="text-2xl font-black font-mono text-yellow-500">{timeLeft.minutes}</div>
        <div className="text-[10px] uppercase font-bold opacity-50">Min</div>
      </div>
      <div className="bg-white/10 border border-white/10 text-white px-3 py-2 rounded-xl min-w-[60px] backdrop-blur-sm">
        <div className="text-2xl font-black font-mono text-yellow-500">{timeLeft.seconds}</div>
        <div className="text-[10px] uppercase font-bold opacity-50">Sec</div>
      </div>
    </div>
  );
}
