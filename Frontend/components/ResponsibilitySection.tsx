// "use client";

// import { motion } from "framer-motion";
// import { ShieldCheck, Lock, Truck } from "lucide-react";

// const ResponsibilitySection = () => {
//   return (
//     <section className="w-full bg-[#000000] py-24 px-6 lg:px-12 font-sans overflow-hidden">
//       <div className="max-w-[1200px] mx-auto text-center">
        
//         {/* Main Heading */}
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-[40px] md:text-[68px] font-black text-[#F97316] leading-tight tracking-tighter mb-16"
//         >
//           Aapka Health Aapki <br className="hidden md:block" /> Responsibility Hai
//         </motion.h2>

//         {/* Pricing Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="max-w-[700px] mx-auto bg-[#1A1A1A] border border-white/5 rounded-[48px] p-10 md:p-16 shadow-2xl relative"
//         >
//           {/* Struck-through Original Price */}
//           <p className="text-gray-500 text-lg md:text-2xl font-bold line-through mb-2 opacity-60">
//             Original Price: ₹2,999
//           </p>

//           {/* Current Price */}
//           <div className="flex items-baseline justify-center gap-2 mb-8">
//             <span className="text-white text-6xl md:text-8xl font-black tracking-tighter">
//               ₹1,499
//             </span>
//             <span className="text-gray-500 text-xl md:text-2xl font-bold">/ month</span>
//           </div>

//           {/* Money Back Guarantee Badge */}
//           <div className="inline-flex items-center gap-2 bg-[#064E3B] border border-[#059669] px-6 py-3 rounded-full mb-12 shadow-lg">
//             <ShieldCheck className="w-5 h-5 text-[#34D399]" />
//             <span className="text-[#34D399] font-black text-sm md:text-base uppercase tracking-tight">
//               30-Day Money Back Guarantee
//             </span>
//           </div>

//           {/* The Big Orange CTA Button */}
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-full bg-gradient-to-r from-[#B45309] to-[#F97316] text-white font-black py-6 rounded-[24px] text-2xl md:text-3xl shadow-[0_20px_40px_rgba(249,115,22,0.2)] tracking-tight transition-all"
//           >
//             Abhi Order Karo — Limited Stock
//           </motion.button>

//           {/* Trust Indicators below button */}
//           <div className="mt-10 flex justify-center gap-8 text-gray-500 font-bold text-sm md:text-base uppercase tracking-widest">
//             <div className="flex items-center gap-2">
//               <Lock className="w-4 h-4" />
//               <span>SSL Secure</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Truck className="w-4 h-4" />
//               <span>Fast Delivery</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Subtle Background Glow */}
//         <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full bg-[#F97316]/5 blur-[150px] -z-10 pointer-events-none"></div>

//       </div>
//     </section>
//   );
// };

// export default ResponsibilitySection;

"use client";

import React from "react"; // Added standard import
import { ShieldCheck, Lock, Truck } from "lucide-react";
import { motion } from "framer-motion";

const ResponsibilitySection = () => {
  return (
    <section className="w-full bg-[#000000] py-12 px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* Main Heading - Standard H2 (Removed entry animation) */}
        <motion.h2 className="text-[40px] md:text-[68px] font-black text-[#F97316] leading-tight tracking-tighter mb-16">
         आपका <span className="text-[#F97316]">Health</span> आपकी <br className="hidden md:block" /> <span className="text-[#F97316]">Responsibility</span> है
        </motion.h2>

        {/* Pricing Card - Standard DIV (Removed initial opacity 0) */}
        <motion.div className="max-w-[700px] mx-auto bg-[#1A1A1A] border border-white/10 rounded-[48px] p-10 md:p-16 shadow-2xl relative">
          
          {/* Struck-through Original Price */}
          <p className="text-gray-500 text-lg md:text-2xl font-bold line-through mb-2 opacity-60">
            Original Price: ₹420
          </p>

          {/* Current Price */}
          <div className="flex items-baseline justify-center gap-2 mb-8">
            <span className="text-white text-6xl md:text-8xl font-black tracking-tighter">
              ₹390
            </span>
            <span className="text-gray-500 text-xl md:text-2xl font-bold">/ month</span>
          </div>

          {/* Money Back Guarantee Badge */}
          <div className="inline-flex items-center gap-2 bg-[#064E3B] border border-[#059669] px-6 py-3 rounded-full mb-12 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-[#34D399]" />
            <span className="text-[#34D399] font-black text-sm md:text-base uppercase tracking-tight">
              30-Day Money Back Guarantee
            </span>
          </div>

          {/* The Big Orange CTA Button - Standard HTML (Added hover transition classes) */}
          <button onClick={(e) => {
  e.preventDefault();
  document.getElementById('product')?.scrollIntoView({ 
    behavior: "smooth" 
  });
}} className="w-full bg-gradient-to-r from-[#B45309] to-[#F97316] text-white font-black py-6 rounded-[24px] text-2xl md:text-3xl shadow-[0_20px_40px_rgba(249,115,22,0.2)] tracking-tight hover:scale-105 active:scale-95 transition-all duration-300">
            अभी ऑर्डर करो — Limited Stock
          </button>

          {/* Trust Indicators below button */}
          <div className="mt-10 flex justify-center gap-8 text-gray-500 font-bold text-sm md:text-base uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>SSL Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </motion.div>

        {/* Subtle Background Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full bg-[#F97316]/5 blur-[150px] -z-10 pointer-events-none"></div>

      </div>
    </section>
  );
};

export default ResponsibilitySection;