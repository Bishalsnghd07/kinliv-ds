"use client";

import { useEffect, useRef, useState } from "react";
import { use } from "react"
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Leaf, Zap, ShieldCheck, Award, ChevronDown, User, Play, AlertTriangle, ShieldAlert, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";
import CountdownTimer from "@/components/CountdownTimer";
import ResponsibilitySection from "@/components/ResponsibilitySection";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 
        id?: string; 
      };
    }
  }
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  materials: string[];
  images: string[];
}

interface ProductPlan {
   codShipping: any;
  id: string;
  title: string;
  price: number;
  mrp: number;
  save: number;
  bottles: number;
  recommended?: boolean;
}


export default function ProductDetailClient( { product }: { product: Product }) {
   const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [userClickedVideo, setUserClickedVideo] = useState(false);
//   const handlePlanSelect = (plan: ProductPlan) => {
//   setSelectedPlan(plan);
// };
   const allImages = [
  ...(product?.images || []), 
  "/images/static-7.png",
  "/images/static-5.jpeg",
];

// 3. Autoplay Effect
useEffect(() => {
  let interval: string | number | NodeJS.Timeout | undefined;
  if (isAutoPlaying && allImages.length > 1) {
    interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % allImages.length);
    }, 5500); // Changes image every 5.5 seconds
  }
  return () => clearInterval(interval);
}, [isAutoPlaying, allImages.length]);

// Define the plans array at the top of your component
 const plans: ProductPlan[] = [
    {
      id: "30days",
      title: "30 Days",
      // perDay: 13,
      bottles: 2,
      // tablets: 30,
      price: 390,
      mrp: 420,
      save: 7,
      codShipping: 100,
    },
    {
      id: "45days",
      title: "45 Days",
      // perDay: 12,
      bottles: 3,
      // tablets: 60,
      price: 540,
      mrp: 630,
      save: 14,
      recommended: true,
      codShipping: 150,
    },
    {
      id: "60days",
      title: "60 Days",
      bottles: 4,
      // perDay: 19,
      // tablets: 90,
      price: 680,
      mrp: 840,
      save: 19,
      codShipping: 200,
    },
  ];

// NOW your state will work without the error
const [selectedPlan, setSelectedPlan] = useState(plans[1]);

const steps = [
    {
      number: "1",
      title: "Take Daily",
      text: "Roz subah sirf 2 capsules paani ke saath lein.",
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
    },
    {
      number: "2",
      title: "Body Absorbs Nutrients",
      text: "Aapka body natural ingredients ko absorb karna shuru karta hai.",
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    },
    {
      number: "3",
      title: "Feel The Difference",
      text: "Kuch hi dino mein energy aur strength wapas aati hai.",
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
    },
  ];

  const testimonials = [
    {
      name: "Priya S.",
      location: "Mumbai",
      initial: "P",
      text: "Main 3 saal se thaka hua feel kar rahi thi. 2 hafte mein difference aaya! Ab main active rehti hu.",
      color: "bg-red-50"
    },
    {
      name: "Rajesh K.",
      location: "Delhi",
      initial: "R",
      text: "Doctor bhi hairan the. Natural solution ne kaam kiya jab medicines fail ho gayi. Life changing!",
      color: "bg-orange-50"
    },
    {
      name: "Anita M.",
      location: "Pune",
      initial: "A",
      text: "Meri energy wapas aayi, neend acha aane laga. Highly recommend! Sabhi ko try karna chahiye.",
      color: "bg-red-50"
    }
  ];

  const benefits = [
    "More Energy",
    "Better Sleep",
    "Stronger Immunity",
    "Less Pain",
    "Better Mood",
    "Glowing Skin",
  ];

// const [selectedPlan, setSelectedPlan] = useState(plans[1]);
// const [selectedMrp, setSelectedMrp] = useState(plans[1]);
const currentMedia = allImages[activeIndex];
  // const isVideo = typeof currentMedia === "object" && currentMedia?.type === "video";
  // const currentMedia = allImages[activeIndex];
// We use (currentMedia as any) to bypass the 'never' error when the array only has strings
const isVideo = typeof currentMedia === "object" && currentMedia !== null && "type" in currentMedia && (currentMedia as any).type === "video";

// This handles the big orange button click
const handleAddToCart = () => {
  if (!product || !selectedPlan) return;

  // Add the selected plan to the cart
  addToCart({
    id: `${product.id}-${selectedPlan.id}`,
    name: `${product.name} - ${selectedPlan.title}`,
    price: selectedPlan.price,
    quantity: quantity,
    image: product.images[0],
    planId: selectedPlan.id, // Optional: Store the plan ID for reference in checkout
    codShipping: selectedPlan.codShipping, // Optional: Store the COD shipping fee for reference in checkout
  });

  // ✅ Only redirect here!
  router.push("/checkout");
};

const wrapperRef = useRef(null);

 useEffect(() => {
    // Load the Vturb SDK script only once
    if (!document.querySelector('script[src*="smartplayer-wc/v4/sdk.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handlePlanSelect = (plan: ProductPlan) => {
  setSelectedPlan(plan);
};

  // Default it to the first plan (60 days)

  const consequences = [
    {
      title: "Chronic Disease Risk",
      text: "Chhoti samasyaein badi bimariyon mein badal jaati hain. Blood pressure, diabetes, ya heart issues shuru ho sakte hain.",
      icon: <AlertTriangle className="w-6 h-6 text-[#EF4444]" />,
    },
    {
      title: "Loss of Energy Forever",
      text: "Aap apni family aur kaam ke liye kabhi 100% present nahi reh payenge. Hamesha thaka hua mehsoos karenge.",
      icon: <Zap className="w-6 h-6 text-[#EF4444]" />,
    },
    {
      title: "Expensive Medical Bills",
      text: "Baad mein hospitals aur mahingi medicines par laakhon kharch karne padenge. Isse behtar hai aaj hi dhyan dein.",
      icon: <ShieldAlert className="w-6 h-6 text-[#EF4444]" />,
    },
  ];

  // const TimerBox = ({ value, label }: { value: number; label: string }) => (
  //   <div className="flex flex-col items-center">
  //     <div className="bg-[#B91C1C] text-white w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-[32px] flex items-center justify-center text-4xl md:text-6xl font-black shadow-xl border-b-4 border-black/20">
  //       {value.toString().padStart(2, '0')}
  //     </div>
  //     <span className="text-[#B91C1C] font-black uppercase tracking-widest text-[10px] md:text-xs mt-3">
  //       {label}
  //     </span>
  //   </div>
  // );

  return (
    <><section className="w-full bg-[#F9FAFB] pt-4 lg:pt-10 pb-12 px-6 lg:px-12 font-inter">
      <div className="lg:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: TEXT CONTENT */}
          <div className="flex flex-col">
            <span className="text-[#B91C1C] font-bold uppercase tracking-widest text-base mb-1">
              WARNING:
            </span>
            {/* रही बीमारी आपके शरीर को खत्म कर रही है… आज एक्शन लें!  */}

            <h1 style={{ lineHeight: '1.30' }} className="font-bold text-4xl lg:text-6xl text-[#1A1A1A] lg:leading-[1.05] lg:tracking-wider mb-8">
              यह अंदर पल  <br />
              रही बीमारी आपके <br />
              शरीर को <span className="relative inline-block text-[#B91C1C] underline decoration-wavy decoration-5 decoration-[#b9631c]">
  खत्म
</span>
              <br />
              कर रही है...
              <br />
              आज एक्शन लें!
              {/* The "Khatam" container with custom wavy underline */}
              {/* <span className="relative inline-block">
      
      <div
        className="absolute -bottom-2 left-0 w-full h-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10' stroke='%23C53030' stroke-width='6' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 10px',
          backgroundRepeat: 'repeat-x'
        }}
      />
    </span> Kar Raha <br /> */}
              {/* Hai... */}
            </h1>

            <p className="text-xl md:text-[28px] text-[#4A4A4A] font-medium leading-tight italic max-w-lg">
              "Agar aaj bhi aapne ignore kiya, toh kal bahut der ho sakti hai..."
            </p>
            {/* NEW BUTTON: Abhi Fix Karo */}
            <button className="w-fit bg-[#E67E22] hover:bg-[#D35400] text-white font-black my-8 py-5 px-10 rounded-full text-xl md:text-2xl shadow-[0_10px_30px_rgba(230,126,34,0.4)] transition-all transform active:scale-95 mb-10 tracking-tight">
              Abhi Fix Karo — Before It's Too Late
            </button>
            {/* TRUST BADGES ROW */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-0">
              {[
                "100% Natural",
                "Clinically Tested",
                "Fast Results",
                "Safe For Daily Use",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-0 text-[#4A4A4A] font-medium text-sm md:text-base">
                  {/* Custom SVG for a thinner, cleaner check circle matching the design */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="1.5" />
                    <path d="M8 12L11 15L16 9" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: VIDEO UI */}
       {/* RIGHT: VIDEO UI */}
   <div className="relative mt-8 lg:mt-12 w-full">
      <div className="relative aspect-[18/10] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl bg-black">
          <iframe key="vturb-iframe-constant"
    src="https://scripts.converteai.net/7bb306e1-b4d6-4ade-91fb-89f35c19604f/players/69d8bf3ef59fe98c9ed87a35/v4/embed.html"
    className="absolute inset-0 w-full h-full"
    allowFullScreen
    referrerPolicy="origin"
  />

      </div>
    </div>


        </div>
      </div>
      {/* --- SYMPTOMS SECTION --- */}
    </section>
    <section className="w-full bg-[#ffffd2] py-12 px-6 lg:px-12 font-sans">
        <div className="max-w-[1200px] mx-auto">

          {/* Heading */}
          <h2 className="text-3xl md:text-[52px] font-black text-[#1A1A1A] text-center mb-12 tracking-tight">
            क्या आपको भी ये <span className="text-[#C53030]">Symptoms</span> हैं?
          </h2>

          {/* Symptoms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { emoji: "😫", text: "Thakaan" },
              { emoji: "🦴", text: "Joint Pain" },
              { emoji: "🔋", text: "Low Energy" },
              { emoji: "😴", text: "Poor Sleep" },
              { emoji: "🤢", text: "Bloating" },
              { emoji: "😓", text: "Weakness" },
              { emoji: "🧠", text: "Brain Fogg" },
              { emoji: "😡", text: "Mood Swings" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl py-6 px-6 flex items-center gap-4 shadow-[0_2px_15px_rgba(0,0,0,0.09)] hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[#1A1A1A] font-bold text-lg tracking-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Warning Box */}
          <div className="bg-white border-l-[6px] border-[#C53030] rounded-r-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-[#C53030] text-xl font-black mb-4 tracking-tight">
              Agar haan, toh aapka body already warning de raha hai...
            </h3>
            <p className="text-[#4A4A4A] text-lg leading-relaxed font-medium">
              Millions ignore these signs thinking it's just "stress" or "getting older."
              Lekin andar hi andar damage badh raha hai. If you don't stop it now, it can lead
              to permanent issues. Aap kab tak is dard aur thakan ke saath jiyenge?
            </p>
          </div>
        </div>
      </section>
      {/* --- CONSEQUENCES (IGNORE KARNE KA ANJAAM) SECTION --- */}
<section className="w-full bg-[#000000] py-10 px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Animated Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] md:text-[64px] font-black text-[#EF4444] mb-6 tracking-tight">
            Ignore Karne Ka Anjaam...
          </h2>
          <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Ye problem khud-ba-khud theek nahi hogi. Samay ke saath ye aur khatarnak roop le sakti hai.
          </p>
        </motion.div>

        {/* Consequences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {consequences.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                borderColor: "rgba(239, 68, 68, 0.4)",
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)"
              }}
              className="bg-[#111111] border border-white/5 rounded-[40px] p-10 flex flex-col items-start cursor-default transition-colors duration-300"
            >
              {/* Icon Container with subtle pulse on hover */}
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              >
                {card.icon}
              </motion.div>

              <h3 className="text-white text-2xl font-bold mb-4 tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full bg-white py-12 px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* Simple Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[40px] font-bold text-[#1A1A1A] mb-12 tracking-tight"
        >
          Lekin Ek Raasta Hai... Aur Woh Simple Hai
        </motion.h2>

        {/* Brand Reveal with Green Glow */}
        <div className="relative inline-block mb-6">
          {/* THE GLOW: This creates that soft green light behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-emerald-500/15 blur-[100px] rounded-full -z-10"></div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="block text-emerald-600 text-3xl md:text-[56px] font-black tracking-tighter mb-2">
              Introducing
            </span>
            <h3 className="text-[52px] md:text-[88px] font-black text-[#1A1A1A] leading-none tracking-tighter">
              KinLiv DS
            </h3>
          </motion.div>
        </div>

        {/* Descriptive Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-500 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium"
        >
          100% natural ingredients, zero side effects. Thousands of users in India have 
          already transformed their health using this exact method. No chemical pills, no 
          fake promises.
        </motion.p>

      </div>
    </section>
    <section className="w-full bg-[#f4f8fc] py-12 px-6 lg:px-12 font-sans">
    <div id="product" className="grid grid-cols-1 md:grid-cols-2 gap-16 my-2 md:my-0 md:mx-4 bg-[#fefefff8] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
  {/* Left Image Gallery with Thumbnails */}
 <div className="flex flex-col">
       {/* <div 
        className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden mb-6 transition-opacity duration-300"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <Image
          src={allImages[activeIndex]}
          alt={`${product?.name} view ${activeIndex + 1}`}
          fill
          className="object-contain drop-shadow-[0_10px_30px_rgba(251,191,36,0.15)]"
          priority
        />
      </div> */}

      {/* --- Main Display Area --- */}
<div
  className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10"
  onMouseEnter={() => setIsAutoPlaying(false)}
  onMouseLeave={() => {
    setIsAutoPlaying(true);
    // Optional: If they leave the main image, reset click state so next auto-slide doesn't autoplay video
    setUserClickedVideo(false); 
  }}
>
  
    <Image
      src={currentMedia as string}
      alt="Product View"
      fill
      className="object-contain p-4 drop-shadow-[0_10px_30px_rgba(251,191,36,0.15)]"
      priority
    />
</div>

      {/* --- Bottom Thumbnail Row --- */}
<div className="flex gap-3 overflow-x-auto w-full max-w-[500px] py-3 snap-x custom-scrollbar px-2 pl-8">
  {allImages.map((img, idx) => {
    const isThumbVideo = typeof img === "object" && (img as any)?.type === "video";

    return (
      <button
        key={idx}
        onClick={() => {
          setActiveIndex(idx);
          setIsAutoPlaying(false);
          setUserClickedVideo(true); // 👈 STEP 2: Tells the state that a human clicked it
        }}
        className={`relative w-[8.41rem] h-[8.41rem] flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center flex items-center justify-center ${
          activeIndex === idx
            ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105 opacity-100"
            : "border-white/10 opacity-50 hover:opacity-100"
        }`}
      >
        {isThumbVideo ? (
          <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-1 group">
            <Play size={20} fill="currentColor" className="text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Video</span>
          </div>
        ) : (
          <Image
            src={img as string}
            alt={`Thumbnail ${idx + 1}`}
            fill
            className="object-cover bg-white/5"
          />
        )}
      </button>
    );
  })}
</div>

          {/* Thumbnails */}
          {/* <div className="flex gap-4 items-center pl-4 overflow-x-auto pb-2 w-full ">
            {allImages.map((img, idx) => {
              const isThumbVid = typeof img === "object" && (img as any).type === "video";
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeIndex === idx ? "border-amber-500 scale-105" : "border-white/10 opacity-60"
                  }`}
                >
                  {isThumbVid ? (
                    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-1">
                      <Play size={20} fill="#f59e0b" className="text-amber-500" />
                      <span className="text-[8px] font-bold text-gray-500 uppercase">Video</span>
                    </div>
                  ) : (
                    <Image src={img as string} alt="thumb" fill className="object-cover" />
                  )}
                </button>
              );
            })}
          </div> */}
        </div>

  <div className="flex flex-col justify-center p-8">
    {/* Product Name - Lightened */}
    <h1 className="text-3xl font-bold mb-4 text-amber-600">
      {product.name}
    </h1>
    
    {/* Description - Lightened */}
    <p className="text-gray-800 mb-6 leading-relaxed">
      {product.description}
    </p>

    <div className="flex items-center gap-2 mb-6">
  {/* The Star Rating */}
  <div className="text-amber-600 text-2xl tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
    ★★★★★ 4.5/5
  </div>

  {/* The Review Link */}
  <button 
  onClick={(e) => {
  e.preventDefault();
  document.getElementById('testimonials')?.scrollIntoView({ 
    behavior: "smooth" 
  });
}}
    className="text-gray-800 hover:text-amber-400 transition-colors text-sm font-bold mt-1"
  >
    (10000+) Customer Reviews
  </button>
</div>

    {product.materials && (
      <div className="mb-6">
        <h3 className="text-xs tracking-widest font-bold text-amber-600 uppercase">
          Key Benefits
        </h3>
        <p className="text-gray-800">
          {/* Reminder: Update your product object to remove the jewelry materials! */}
          {product.materials.join(", ")}
        </p>
      </div>
    )}

    {/* <p className="text-3xl font-bold mb-8 text-amber-500">
      ₹ {product.price.toFixed(2)}
    </p> */}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 w-full">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => handlePlanSelect(plan)}
          className={`cursor-pointer border rounded-2xl p-2 transition-all relative backdrop-blur-sm bg-slate-200 group ${
            selectedPlan.id === plan.id
              ? "border-amber-500 bg-amber-500/10 scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              : "border-white/10 bg-white/5 hover:border-white/30"
          }`}
        >
          <span className="absolute -top-3 left-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            Save {plan.save}%
          </span>

          {plan.recommended && (
            <span className="absolute -top-3 right-3 bg-amber-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              Recommended
            </span>
          )}

          <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
          {/* <p className="text-gray-400 text-sm font-semibold">{plan.tablets} Tablets</p> */}
          <p className="text-gray-800 text-sm font-semibold">{plan.bottles} Bottle</p>
          

          <p className="text-2xl font-bold mt-4 text-gray-800">
            ₹ {plan.price}
          </p>

          <p className="text-red-500/80 line-through text-sm font-semibold">
            ₹ {plan.mrp}
          </p>

          <div className="mt-3 mb-1">
            <span className=" text-amber-600 text-[0.6rem] leading-tight font-black px-0 py-0 rounded uppercase">
               Free Shipping for Prepaid Orders
            </span>
          </div>

          <p className="text-[10px] text-gray-800 uppercase mt-1">
            Inclusive of all taxes
          </p>
          <p className="text-[10px] font-bold text-amber-600 mt-1">
  {plan.codShipping ? `+ ₹${plan.codShipping} shipping for COD` : "Free shipping on COD"}
</p>
        </div>
      ))}
    </div>

   {/* 2. Update the Price Display JSX */}
<div className="mb-6">
 <p className="text-sm text-gray-800 uppercase tracking-widest mb-1">Total Price</p>
<p className="text-4xl font-bold text-amber-600">
  {/* Calculate based on selected plan price * quantity */}
  ₹ {(selectedPlan.price * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
</p>
</div>

{/* 3. Update the Button (Remove the scrollTo) */}
{/* <div className="flex items-center space-x-4">
  <QuantitySelector
    quantity={quantity}
    onQuantityChange={setQuantity}
  />

  <button
    onClick={handleAddToCart} // Simple and clean
    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-6 py-4 rounded-xl transition-all font-bold shadow-lg uppercase tracking-wider"
  >
    PROCEED TO CHECKOUT
  </button>
</div> */}
<div className="flex flex-col lg:flex-row lg:items-center gap-4">
  {/* 1. The Quantity Selector */}
  <QuantitySelector
    quantity={quantity}
    onQuantityChange={setQuantity}
  />

  <div className="flex flex-col lg:flex-row gap-4 w-full">
    {/* 2. ADD TO CART - Stays on page, scrolls up */}
    {/* <button
      onClick={(e) => {
        e.preventDefault();
        // Add to cart state
        addToCart({
          id: `${product.id}-${selectedPlan.id}`,
          name: `${product.name} - ${selectedPlan.title}`,
          price: selectedPlan.price,
          quantity: quantity,
          image: product.images[0],
        });
        // Scroll to top to see the cart dropdown reflect the change
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-500/10 px-4 py-4 rounded-xl transition-all font-bold uppercase tracking-wider text-sm md:text-base"
    >
      ADD TO CART
    </button> */}

    {/* 3. PROCEED TO CHECKOUT - Navigates to payment */}
    <button
      onClick={() => {
        // Add to cart state
        addToCart({
          id: `${product.id}-${selectedPlan.id}`,
          name: `${product.name} - ${selectedPlan.title}`,
          price: selectedPlan.price,
          quantity: quantity,
          image: product.images[0],
          planId: selectedPlan.id,
          codShipping: selectedPlan.codShipping,

        });
        // Direct navigation
        router.push("/checkout");
      }}
      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-4 py-4 rounded-xl transition-all font-bold shadow-lg uppercase tracking-wider text-sm md:text-base"
    >
      PROCEED TO CHECKOUT
    </button>
  </div>
</div>

  </div>
  
  </div>
  </section>
  <section className="w-full bg-gray-100 py-24 px-6 lg:px-12 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-[56px] font-black text-[#1A1A1A] text-center mb-20 tracking-tighter">
          Kaise Kaam Karta Hai?
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="relative bg-white border border-gray-50 rounded-[40px] p-12 flex flex-col items-center text-center shadow-[0_15px_50px_rgba(0,0,0,0.05)] transition-all"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#B91C1C] text-white flex items-center justify-center text-2xl font-black shadow-lg border-4 border-white">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6 mt-4">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
                {step.title}
              </h3>

              {/* Text */}
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full bg-white py-24 px-6 lg:px-12 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] text-center mb-16 tracking-tighter">
          Sirf 30 Din Mein Kya Badlega?
        </h2>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl md:rounded-3xl py-6 px-8 transition-all shadow-sm hover:shadow-md cursor-default"
            >
              {/* Green Check Icon */}
              <div className="flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-[#22C55E]" fill="#F0FDF4" />
              </div>

              {/* Benefit Text */}
              <span className="text-[#1A1A1A] text-xl md:text-2xl font-bold tracking-tight">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section className="w-full bg-slate-50 [oklch(0.985 0 0)] py-24 px-6 lg:px-12 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] text-center mb-16 tracking-tighter">
          Real People. Real Results.
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.19)] flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-6 text-orange-500 text-xl">
                  {/* Rendering 5 Star icons */}
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#1A1A1A] text-lg md:text-xl font-medium italic leading-relaxed mb-8">
                  "{t.text}"
                </p>
              </div>

              {/* User Info Footer */}
              <div className="flex items-center gap-4">
                {/* Initial Circle */}
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-[#B91C1C] font-bold text-lg`}>
                  {t.initial}
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1A1A]">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <span>{t.location}</span>
                    <span className="bg-[#E6FFFA] text-[#2D3748] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border border-[#B2F5EA]">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  <CountdownTimer />
  <ResponsibilitySection />
{/* <LanguageGrowl /> */}
      </>
    );
  };