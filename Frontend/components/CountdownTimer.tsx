"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    let targetTime = localStorage.getItem("sale_target");
    
    if (!targetTime) {
      // Set for 2 hours + 45 mins from first visit
      const newTarget = new Date().getTime() + (2 * 60 * 60 * 1000 + 45 * 60 * 1000); 
      localStorage.setItem("sale_target", newTarget.toString());
      targetTime = newTarget.toString();
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = parseInt(targetTime!) - now;

      if (difference <= 0) {
        const resetTarget = new Date().getTime() + (2 * 60 * 60 * 1000);
        localStorage.setItem("sale_target", resetTarget.toString());
      } else {
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / (1000 * 60)) % 60);
        const s = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          h: h.toString().padStart(2, "0"),
          m: m.toString().padStart(2, "0"),
          s: s.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimerBox = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#B91C1C] text-white w-20 h-20 md:w-32 md:h-32 rounded-[30px] md:rounded-[40px] flex items-center justify-center text-4xl md:text-7xl font-black shadow-2xl">
        {value}
      </div>
      <span className="text-[#B91C1C] font-bold uppercase tracking-widest text-[10px] md:text-xs mt-4">
        {label}
      </span>
    </div>
  );

  if (!timeLeft) return <div className="h-[300px]" />; 

  return (
    <section className="w-full bg-[#FFF5F5] py-20 px-6 font-sans border-y border-red-100">
      <div className="max-w-[800px] mx-auto text-center">
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] mb-6 leading-8">
            Hurry! Kal Tak Price Badh Sakti Hai
          </h2>
          {/* <p className="text-[#B91C1C] font-bold text-lg md:text-2xl mb-12">
            Stock limited. Once gone, price returns to ₹2,999.
          </p> */}
        </motion.div>

        <div className="flex justify-center items-center gap-4 md:gap-8">
          <TimerBox value={timeLeft.h} label="HOURS" />
          <span className="text-4xl md:text-7xl font-black text-[#B91C1C] -mt-8">:</span>
          <TimerBox value={timeLeft.m} label="MINUTES" />
          <span className="text-4xl md:text-7xl font-black text-[#B91C1C] -mt-8">:</span>
          <TimerBox value={timeLeft.s} label="SECONDS" />
        </div>

        <div className="mt-16 max-w-xl mx-auto px-2">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-700 mb-3">
            <span>🔥 Sirf 47 Units Baaki Hain!</span>
            <span className="text-red-600">92% SOLD (HIGH DEMAND)</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "92%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-red-600 rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;