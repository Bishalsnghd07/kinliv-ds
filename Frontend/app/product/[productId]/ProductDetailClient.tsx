"use client";

import { useEffect, useState } from "react";
import { use } from "react"
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Leaf, Zap, ShieldCheck, Award, ChevronDown, User, Play } from "lucide-react";

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
  id: string;
  title: string;
  perTablet: number;
  tablets: number;
  price: number;
  mrp: number;
  save: number;
  recommended?: boolean;
}

export default function ProductDetailClient(
  { product }: { product: Product }) {
//    const { productId } = use(params);        // ← unwrap
//   const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
const [isAutoPlaying, setIsAutoPlaying] = useState(true);
const allTestimonials = [
     {
      image: "/images/testimonial-user.jpeg",
      rating: 5,
      quote: '"पहले सिर्फ 1-2 मिनट में सब खत्म हो जाता था। अब मैं 15-20 मिनट आराम से टिक पाता हूं। आत्मविश्वास वापस आ गया है!"',
      name: 'राजेश कुमार',
      meta: '32 वर्ष • दिल्ली'
    },
    {
      image: "/images/testimonial-user-2.jpeg", // ✅ Match the .jpg extension
      rating: 4,
      quote: '"मैंने बहुत सारे expensive products try किए लेकिन फायदा नहीं हुआ। अब performance में कोई problem नहीं है। शानदार!"',
      name: 'अमित शर्मा',
      meta: '38 वर्ष • मुंबई'
    },
    {
      image: "/images/testimonial-user-3.webp", // ✅ Match the .jpg extension
      rating: 4,
      quote: '"शादी के बाद पहली रात का डर था लेकिन अब confidence बढ़ गया। 100% recommend करूंगा! लाइफ बदल गई।"',
      name: 'विक्रम सिंह',
      meta: '39 वर्ष • जयपुर'
    },
    { image: "/images/testimonial-user-4.webp", rating: 5, quote: '"मैंने बहुत सारे expensive products try किए लेकिन फायदा नहीं हुआ। अब performance में कोई problem नहीं है। शानदार!"', name: 'निधि शर्मा', meta: '38 वर्ष • मुंबई' },
    { image: "/images/testimonial-user-5.webp", rating: 4, quote: '"शादी के बाद पहली रात का डर था लेकिन अब confidence बढ़ गया। 100% recommend करूंगा! लाइफ बदल गई।"', name: 'संजय सिंह', meta: '39 वर्ष • जयपुर' },
    // New Content Integrated with Sequential Images (6-128) and Random Ratings (3-5)
    {
      image: "/images/testimonial-user-7.webp",
      rating: 4,
      quote: '"काम के stress के बीच ये supplement काफी मददगार रहा। अब energy और performance दोनों improve हुए हैं।"',
      name: 'अमित वर्मा',
      meta: '28 वर्ष • इंदौर'
    },
    {
      image: "/images/testimonial-user-6.webp",
      rating: 5,
      quote: '"ये कोई instant result नहीं देता लेकिन 1 महीना में control में साफ फर्क दिखा।"',
      name: 'स्नेहा कपूर',
      meta: '29 वर्ष • पुणे'
    },
    {
      image: "/images/testimonial-user-8.webp",
      rating: 5,
      quote: '"शुरू में doubt था लेकिन Ashwagandha की वजह से try किया। अब performance बेहतर है और overall relaxed बढ़ा है।"',
      name: 'विक्रम मेहता',
      meta: '42 वर्ष • मुंबई'
    },
    {
      image: "/images/testimonial-user-9.webp",
      rating: 4,
      quote: '"ये कोई instant result नहीं देता लेकिन कुछ हफ्ते में stamina में साफ फर्क दिखा।"',
      name: 'स्वाति शर्मा',
      meta: '31 वर्ष • दिल्ली'
    },
    {
      image: "/images/testimonial-user-10.webp",
      rating: 5,
      quote: '"Ayurvedic होने की वजह से लिया और अब timing और stamina दोनों अच्छे हैं।"',
      name: 'प्रिया सिंह',
      meta: '35 वर्ष • लखनऊ'
    },
    {
      image: "/images/testimonial-user-15.webp",
      rating: 4,
      quote: '"ये कोई instant result नहीं देता लेकिन 1 महीना में timing में साफ फर्क दिखा।"',
      name: 'सुनील यादव',
      meta: '29 वर्ष • पटना'
    },
    {
      image: "/images/testimonial-user-12.webp",
      rating: 4,
      quote: '"शुरू में doubt था लेकिन Safed Musli की वजह से try किया। अब energy बेहतर है और overall confident बढ़ा है।"',
      name: 'मनीष खन्ना',
      meta: '45 वर्ष • चंडीगढ़'
    },
    {
      image: "/images/testimonial-user-13.webp",
      rating: 5,
      quote: '"मैंने Kin Ultra Power कुछ हफ्ते तक लिया और अब stamina और performance में अच्छा सुधार दिखा है। पहले से ज्यादा confident महसूस करता हूँ।"',
      name: 'अंजली देशपांडे',
      meta: '33 वर्ष • नागपुर'
    },
    {
      image: "/images/testimonial-user-14.webp",
      rating: 4,
      quote: '"Ayurvedic होने की वजह से लिया और अब control और stamina दोनों अच्छे हैं।"',
      name: 'रोहन जोशी',
      meta: '41 वर्ष • अहमदाबाद'
    },
    {
      image: "/images/testimonial-user.jpeg",
      rating: 5,
      quote: '"शुरू में doubt था लेकिन Safed Musli की वजह से try किया। अब control बेहतर है और overall positive बढ़ा है।"',
      name: 'मनीष गुप्ता',
      meta: '29 वर्ष • दिल्ली'
    },
    { image: "/images/testimonial-user-3.webp", quote: '"Ayurvedic होने की वजह से लिया और अब performance और stamina दोनों अच्छे हैं।"', name: 'दीपक रावत', meta: '40 वर्ष • भोपाल' },
    { image: "/images/testimonial-user-3.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन 2 हफ्ते में timing में साफ फर्क दिखा।"', name: 'आरती शर्मा', meta: '29 वर्ष • दिल्ली' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"मैंने Kin Ultra Power 3 हफ्ते तक लिया और अब stamina और control में अच्छा सुधार दिखा है।"', name: 'सौरभ मिश्रा', meta: '35 वर्ष • वाराणसी' },
    { image: "/images/testimonial-user-3.webp", quote: '"Ayurvedic होने की वजह से लिया और अब stamina काफी बढ़ गया है।"', name: 'सुमित नेगी', meta: '31 वर्ष • देहरादून' },
    { image: "/images/testimonial-user-3.jpeg", quote: '"काम के stress के बीच ये supplement काफी मददगार रहा। अब control और energy दोनों improve हुए हैं।"', name: 'नितिन कुमार', meta: '38 वर्ष • दिल्ली' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"शुरू में doubt था लेकिन Ashwagandha की वजह से try किया। अब timing बेहतर है।"', name: 'पूजा गर्ग', meta: '32 वर्ष • लुधियाना' },
    { image: "/images/testimonial-user-3.webp", quote: '"मैंने Kin Ultra Power 2 हफ्ते तक लिया और अब timing और stamina में अच्छा सुधार दिखा है।"', name: 'हर्ष सिंह', meta: '26 वर्ष • आगरा' },
    { image: "/images/testimonial-user.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन 2 हफ्ते में stamina में साफ फर्क दिखा।"', name: 'विजया लक्ष्मी', meta: '34 वर्ष • चेन्नई' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"मैंने Kin Ultra Power 1 महीना तक लिया और अब timing और stamina में अच्छा सुधार दिखा है।"', name: 'पीयूष जैन', meta: '44 वर्ष • इंदौर' },
    { image: "/images/testimonial-user-3.webp", quote: '"ये कोई instant result नहीं देता लेकिन 3 हफ्ते में stamina में सुधार दिखा।"', name: 'मनोज शेट्टी', meta: '39 वर्ष • मंगलुरु' },
    { image: "/images/testimonial-user-16.webp", quote: '"शुरू में doubt था लेकिन Kaunch Beej की वजह से try किया। अब control काफी बेहतर है।"', name: 'श्वेता तिवारी', meta: '31 वर्ष • पटना' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन 3 हफ्ते में energy में सुधार दिखा।"', name: 'अनमोल अरोड़ा', meta: '28 वर्ष • नोएडा' },
    { image: "/images/testimonial-user-3.webp", quote: '"शुरू में doubt था लेकिन Shilajit की वजह से try किया। अब active महसूस करता हूँ।"', name: 'राहुल देशमुख', meta: '37 वर्ष • मुंबई' },
    { image: "/images/testimonial-user-3.jpeg", quote: '"काम के stress के बीच ये काफी मददगार रहा। अब timing और performance बेहतर है।"', name: 'प्रवीण कुमार', meta: '42 वर्ष • बेंगलुरु' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"Ayurvedic होने की वजह से लिया और अब stamina और stamina दोनों अच्छे हैं।"', name: 'निधि रावत', meta: '30 वर्ष • रायपुर' },
    { image: "/images/testimonial-user-3.webp", quote: '"काम के stress के बीच ये मददगार रहा। अब performance और energy बढ़ी है।"', name: 'संजय रेड्डी', meta: '45 वर्ष • हैदराबाद' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"शुरू में doubt था लेकिन Kaunch Beej की वजह से try किया। अब overall positive लगा।"', name: 'रिया गुप्ता', meta: '27 वर्ष • दिल्ली' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"Ayurvedic होने की वजह से लिया और अब energy और stamina काफी बेहतर है।"', name: 'अजीत सिंह', meta: '34 वर्ष • रांची' },
    { image: "/images/testimonial-user-3.webp", quote: '"ये कोई instant result नहीं देता लेकिन 2 हफ्ते में performance में फर्क दिखा।"', name: 'गरिमा गोयल', meta: '31 वर्ष • फरीदाबाद' },
    { image: "/images/testimonial-user.jpeg", quote: '"शुरू में doubt था लेकिन Ashwagandha की वजह से try किया। अब control काफी बढ़ गया है।"', name: 'यशपाल सिंह', meta: '43 वर्ष • अमृतसर' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"मैंने Kin Ultra Power 3 हफ्ते तक लिया और अब stamina काफी बढ़ा हुआ महसूस होता है।"', name: 'कुणाल कपूर', meta: '36 वर्ष • ठाणे' },
    { image: "/images/testimonial-user-3.webp", quote: '"शुरू में doubt था लेकिन Ashwagandha की वजह से try किया। अब relaxed महसूस करता हूँ।"', name: 'मोनिका आहूजा', meta: '33 वर्ष • नोएडा' },
    { image: "/images/testimonial-user.jpeg", quote: '"शुरू में doubt था लेकिन Safed Musli की वजह से try किया। अब timing बेहतर है और active हूँ।"', name: 'धीरज यादव', meta: '38 वर्ष • कोटा' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"शुरू में doubt था लेकिन Shilajit की वजह से try किया। अब control काफी बेहतर है।"', name: 'सीमा रानी', meta: '35 वर्ष • हिसार' },
    { image: "/images/testimonial-user-3.webp", quote: '"Ayurvedic होने की वजह से लिया और अब performance और stamina काफी बढ़िया है।"', name: 'विजय सिंह', meta: '41 वर्ष • मेरठ' },
    { image: "/images/testimonial-user.jpeg", quote: '"मैंने Kin Ultra Power 1 महीना तक लिया और अब performance और stamina में काफी सुधार दिखा।"', name: 'कार्तिक नायर', meta: '32 वर्ष • कोच्चि' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"काम के stress के बीच ये supplement काफी मददगार रहा। अब stamina और timing बेहतर है।"', name: 'स्वाति सिंह', meta: '29 वर्ष • कोलकाता' },
    { image: "/images/testimonial-user-3.webp", quote: '"शुरू में doubt था लेकिन Shilajit की वजह से try किया। अब overall positive महसूस होता है।"', name: 'अनिल कुमार', meta: '46 वर्ष • दिल्ली' },
    { image: "/images/testimonial-user.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन कुछ हफ्ते में energy में साफ फर्क दिखा।"', name: 'भावना शर्मा', meta: '31 वर्ष • झाँसी' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"काम के stress के बीच ये काफी मददगार रहा। अब stamina और control काफी सुधरा है।"', name: 'रोहित जोशी', meta: '37 वर्ष • अजमेर' },
    { image: "/images/testimonial-user-3.webp", quote: '"शुरू में doubt था लेकिन Ashwagandha की वजह से try किया। अब performance और confidence बेहतर है।"', name: 'अंकित भाटिया', meta: '30 वर्ष • गाजियाबाद' },
    { image: "/images/testimonial-user.jpeg", quote: '"काम के stress के बीच ये मददगार रहा। अब energy और performance काफी improve हुए हैं।"', name: 'पारुल जैन', meta: '34 वर्ष • जबलपुर' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"मैंने Kin Ultra Power 2 हफ्ते तक लिया और अब control और stamina में अच्छा सुधार दिखा।"', name: 'सुमित चोपड़ा', meta: '33 वर्ष • जालंधर' },
    { image: "/images/testimonial-user-3.webp", quote: '"शुरू में doubt था लेकिन Kaunch Beej की वजह से try किया। अब timing काफी बेहतर है।"', name: 'प्रीति वर्मा', meta: '28 वर्ष • मेरठ' },
    { image: "/images/testimonial-user.jpeg", quote: '"Ayurvedic है, इसलिए performance और stamina में बिना side effect के सुधार आया।"', name: 'राजीव ओझा', meta: '45 वर्ष • प्रयागराज' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"शुरू में doubt था लेकिन Safed Musli की वजह से try किया। अब काफी active महसूस करता हूँ।"', name: 'अमनदीप सिंह', meta: '31 वर्ष • पटियाला' },
    { image: "/images/testimonial-user-3.webp", quote: '"ये कोई instant result नहीं देता लेकिन 1 महीना में performance में सुधार आया है।"', name: 'दिनेश कुमार', meta: '39 वर्ष • जोधपुर' },
    { image: "/images/testimonial-user.jpeg", quote: '"काम के stress के बीच ये energy और stamina दोनों improve करने में सफल रहा।"', name: 'अर्चना राय', meta: '36 वर्ष • सूरत' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"मैंने Kin Ultra Power 3 हफ्ते तक लिया और अब energy और stamina में सुधार है।"', name: 'वरुण खन्ना', meta: '42 वर्ष • मुंबई' },
    { image: "/images/testimonial-user-3.webp", quote: '"Ayurvedic होने की वजह से लिया और अब timing और stamina दोनों काफी अच्छे हैं।"', name: 'ज्योति सिंह', meta: '30 वर्ष • उदयपुर' },
    { image: "/images/testimonial-user.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन 2 हफ्ते में control में साफ सुधार दिखा।"', name: 'प्रदीप यादव', meta: '34 वर्ष • अलीगढ़' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"ये कोई instant result नहीं देता लेकिन 2 हफ्ते में performance में सुधार दिखा।"', name: 'विकास कुमार', meta: '37 वर्ष • बरेली' },
    { image: "/images/testimonial-user-3.webp", quote: '"मैंने Kin Ultra Power 1 महीना तक लिया और अब control और energy दोनों सुधर गए हैं।"', name: 'मोहित जैन', meta: '31 वर्ष • पुणे' },
    { image: "/images/testimonial-user.jpeg", quote: '"शुरू में doubt था लेकिन Shilajit की वजह से try किया। अब काफी confident महसूस होता है।"', name: 'नितिन शर्मा', meta: '38 वर्ष • शिमला' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"After using Kin Ultra Power for a month, I feel more energetic and confident. My stamina has improved."', name: 'Deepak Rao', meta: '35 Years • Bangalore' },
    { image: "/images/testimonial-user-3.webp", quote: '"Natural ingredients like Ashwagandha helped me improve my energy levels significantly."', name: 'Kavita Iyer', meta: '32 Years • Chennai' },
    { image: "/images/testimonial-user.jpeg", quote: '"Consistency gave me good results. Worth trying for natural improvement without side effects."', name: 'Riya Saxena', meta: '31 Years • Bhopal' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"Helped me regain confidence. Good for long-term use and overall vitality."', name: 'Maninder Singh', meta: '44 Years • Jalandhar' },
    { image: "/images/testimonial-user-3.webp", quote: '"Nice product with gradual results. Feeling much more active throughout the day."', name: 'Rahul Krishnan', meta: '29 Years • Kochi' },
    { image: "/images/testimonial-user.jpeg", quote: '"Good herbal supplement for stamina and vitality. Feeling stronger now."', name: 'Sameer Gill', meta: '27 Years • Amritsar' },
    { image: "/images/testimonial-user-2.jpeg", quote: '"Highly recommended for those looking for an Ayurvedic solution to performance issues."', name: 'Aditya Hegde', meta: '40 Years • Mysuru' },
    { image: "/images/testimonial-user-3.webp", quote: '"Best decision I made for my wellness. Gradual but very stable results."', name: 'Pankaj Deshmukh', meta: '36 Years • Nagpur' },
    // ... (Add all your 10, 15, or 20+ testimonial objects here)
  ];

  const UserPlaceholder = () => (
  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/10 text-gray-400 group-hover:text-amber-500 transition-colors">
    <svg 
      viewBox="0 0 448 512" 
      className="w-6 h-6 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
    </svg>
  </div>
);

  // 2. State to track how many cards to show
  const [visibleCount, setVisibleCount] = useState(5);

  // 3. Logic to show 5 more
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  
  const allImages = [
  ...(product?.images || []), 
  "/images/static-5.png",
 {
      type: "video",
      src: "/videos/testimonial_01.webm",
      // poster: "/images/video-thumb-1.png",
    },
    {
      type: "video",
      src: "/videos/testimonial_02.webm",
      // poster: "/images/video-thumb-2.png",
    },
    "/images/static-3.png",
    // '/images/static-4.png',
  '/images/static-2.png'
];

// const isThumbVideo = typeof img === "object" && img?.type === "video";
// Option 2: The TypeScript "in" operator (Cleaner)
// const isThumbVideo = typeof img === "object" && img !== null && "type" in img && img.type === "video";

const currentMedia = allImages[activeIndex];
  // const isVideo = typeof currentMedia === "object" && currentMedia?.type === "video";
  // const currentMedia = allImages[activeIndex];
// We use (currentMedia as any) to bypass the 'never' error when the array only has strings
const isVideo = typeof currentMedia === "object" && currentMedia !== null && "type" in currentMedia && (currentMedia as any).type === "video";


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

  // ✅ Banner Carousel
  // const banners = [
  //   "/banners/LandingPageBanner.png",
  //   "/banners/LandingPageBanner1.png",
  //   "/banners/LandingPageBanner2.png",
  // ];

  // 1. Updated data structure with your Canva text
  const banners = [
    {
      src: "/banners/LandingPageBanner.webp",
      heading: "2 मिनट में बह जाता हैं? बीवी को खुश नहीं कर पा रहे? अपनी शादीशुदा ज़िंदगी बचाइए — अब 20 मिनट तक बिना रुके सेक्स करें ",
      highlight: "अब कंट्रोल वापस पाएं।",
      subtext: "आज नहीं संभले… तो कल रिश्ता संभालना मुश्किल हो जाएगा।"
    },
    {
      src: "/banners/LandingPageBanner1.png",
      heading: `बीवी कुछ कहती नहीं है? लेकिन उसकी खामोशी सब बता देती है।
कमजोरी छोड़ो - शादी से पहले वाली पावर अब नेचुरल तरीके से वापस लाओ।`,
      highlight: "अभी शुरू करें",
      subtext: "अब और खामोशी नहीं| बेड पर फिर से जोश दिखाओ।"
    },
    {
      src: "/banners/LandingPageBanner2.png",
      heading: "क्या आपको डर है? कि आपकी कमजोरी किसी और को मौका दे सकती है?",
      highlight: "अब देर मत करो",
      subtext: "अब अपने रिश्ते को टूटने मत दो… अभी बचाओ — प्राकृतिक तरीके से।"
    }
  ];

  const [showStickyBar, setShowStickyBar] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    // Shows the bar after scrolling down 700px
    if (window.scrollY > 2650) {
      setShowStickyBar(true);
    } else {
      setShowStickyBar(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const [currentSlide, setCurrentSlide] = useState(0);
const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 10;
  // const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  // const nextPage = () => {
  //   setCurrentPage((prev) => (prev + 1) % totalPages);
  // };

  // const prevPage = () => {
  //   setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const plans: ProductPlan[] = [
    {
      id: "30days",
      title: "30 Days",
      perTablet: 25,
      tablets: 30,
      price: 749,
      mrp: 795,
      save: 6,
    },
    {
      id: "60days",
      title: "60 Days",
      perTablet: 23.5,
      tablets: 60,
      price: 1399,
      mrp: 1590,
      save: 12,
      recommended: true,
    },
    {
      id: "90days",
      title: "90 Days",
      perTablet: 19,
      tablets: 90,
      price: 1799,
      mrp: 2385,
      save: 25,
    },
  ];

  // Default it to the first plan (60 days)
const [selectedPlan, setSelectedPlan] = useState(plans[1]);
const [selectedMrp, setSelectedMrp] = useState(plans[1]);


  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-emerald-500" />,
      title: "100% प्राकृतिक",
      description: "शुद्ध आयुर्वेदिक जड़ी-बूटियां",
      borderColor: "border-emerald-500/20",
      bgColor: "bg-emerald-500/5"
    },
    {
      icon: <Zap className="w-10 h-10 text-amber-500" />,
      title: "तेज़ असर",
      description: "15-20 दिन में रिजल्ट",
      borderColor: "border-amber-500/20",
      bgColor: "bg-amber-500/5"
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
      title: "पूरी तरह सुरक्षित",
      description: "कोई side effect नहीं",
      borderColor: "border-blue-500/20",
      bgColor: "bg-blue-500/5"
    },
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "भरोसेमंद",
      description: "10,000+ खुश ग्राहक",
      borderColor: "border-yellow-500/20",
      bgColor: "bg-yellow-500/5"
    }
  ];

const ingredients = [
  { name: "अश्वगंधा", effect: "तनाव कम करता है और नियंत्रण बढ़ाता है", description: "मानसिक stress को दूर करके performance anxiety को कम करता है।" },
  { name: "कौंच बीज", effect: "इच्छा और उत्तेजना को बढ़ाता है", description: "Natural testosterone booster है जो desire को बढ़ाता है।" },
  { name: "शिलाजीत", effect: "ऊर्जा और स्टैमिना में वृद्धि", description: "शरीर में शक्ति और लंबे समय तक एक्टिव रखता है।" },
  { name: "सफेद मुसली", effect: "शक्ति और सहनशक्ति बढ़ाता है", description: "physical strength और endurance को बेहतर बनाता है।" },
  { name: "शतावरी", effect: "लंबे समय तक performance", description: "Body endurance बढ़ाता है और premature issues में मदद करता है।" },
  { name: "विदारीकंद", effect: "यौन शक्ति में वृद्धि", description: "Male reproductive support और overall performance improve करता है।" },
  { name: "पिप्पली", effect: "तेज असर के लिए absorption", description: "बाकी ingredients को जल्दी absorb होने में मदद करता है।" },
];


  //   const loadProduct = async () => {
  //     try {
  //       const data = await fetchProductById(params.productId);
  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Failed to load product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadProduct();
  // }, [params.productId]);

//    useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const data = await fetchProductById(productId); // ← use productId
//         setProduct(data);
//       } catch (error) {
//         console.error("Failed to load product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProduct();
//   }, [productId]); // ← use productId as dependency

  // const handleAddToCart = () => {
  //   if (!product) return;
  //   addToCart({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     quantity: quantity,
  //     image: product.images[0],
  //   });
  //   // ✅ REDIRECT: This takes the user to the payment/checkout page
  // router.push("/checkout");
  // };

  // This now ONLY selects the plan, it does NOT redirect
const handlePlanSelect = (plan: ProductPlan) => {
  setSelectedPlan(plan);
};

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
  });

  // ✅ Only redirect here!
  router.push("/checkout");
};

  // const handlePlanSelect = (plan: ProductPlan) => {
  //   if (!product) return;

  //   addToCart({
  //     id: `${product.id}-${plan.id}`,
  //     name: `${product.name} - ${plan.title}`,
  //     price: plan.price,
  //     quantity: 1,
  //     image: product.images[0],
  //   });

  //   router.push("/checkout");
  // };

//   if (loading)
//     return 
//     <div className="text-center py-20">Loading product...</div>;
//   if (!product) return <div>Product not found</div>;

// useEffect(() => {
//   const video = document.querySelector('video');
//   if (video && isVideo) {
//     video.play().catch(e => console.log('Play failed:', e));
//   }
// }, [isVideo, currentMedia]);

const [userClickedVideo, setUserClickedVideo] = useState(false);

 return (
  <div className="w-full bg-[#121721]">
    {/* ✅ Carousel */}
  <div className="relative w-full overflow-hidden bg-black">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]">
            {/* Optimized Background Image */}
            <Image
              src={banner.src}
              alt={`Slide ${index}`}
              fill
              className="object-cover" // Darken image slightly to make text pop
              priority={index === 0}
            />

            {/* Text Overlay - Matching your Canva Design */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="max-w-5xl space-y-4 md:space-y-10 md:pt-24">
                <h2 style={{ lineHeight: '1.35' }} className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-loose tracking-wide drop-shadow-2xl">
                  {banner.heading}
                </h2>
                <div className="inline-block py-2 px-4 bg-amber-400 text-black font-black text-2xl sm:text-4xl md:text-4xl rounded-lg shadow-xl">
                  {banner.highlight}
                </div>
                <p className="text-gray-200 text-sm sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                  {banner.subtext}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all z-20"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all z-20"
      >
        ❯
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? "w-8 h-3 bg-amber-400" : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>

<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-8 py-16 md:px-16 bg-[#121721] border-t border-white/5">
  <div className="text-center max-w-6xl mx-auto relative">
    {/* Subtle Background Glow for Intensity */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full"></div>

    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
      Confidence Boost & Natural Wellness
    </span>

    <h2 style={{ lineHeight: '1.35' }} className="text-4xl md:text-6xl font-black leading-relaxed tracking-wide text-white mb-6">
      सही आयुर्वेदिक सपोर्ट के साथ अपनी <span className="text-amber-500">ताकत बढ़ाएं</span>…
अपनी <span className="text-amber-500">परफॉर्मेंस</span>, <span className="text-amber-500">कॉन्फिडेंस</span> और <span className="text-amber-500">रिलेशनशिप</span> को अगले लेवल पर ले जाएं 
    </h2>

    <p className="text-gray-400 mt-5 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
      सही सपोर्ट और सही रूटीन के साथ आप अपनी 
      <span className="text-amber-500 font-semibold">{" "} Performance</span>, 
      <span className="text-amber-500 font-semibold">{" "} Confidence </span> 
      और <span className="text-amber-500 font-semibold"> Relationship Quality</span> 
      को बेहतर बना सकते हैं।
    </p>
  </div>
</section>
   <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto">
    <div className="text-center">
      <h2 style={{ lineHeight: '1.35' }} className="text-5xl md:text-7xl font-black text-white leading-relaxed">
        मार्केट में सबसे बड़ी 
<span className="text-amber-500"> गलती</span> जो लोग कर रहे हैं
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
      {/* Danger Card */}
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 px-8 py-10 backdrop-blur-md transition-all hover:border-red-500/40 group">
        <h3 className="text-2xl font-bold text-red-500 mb-5 flex items-center gap-3">
          <span className="group-hover:animate-pulse">😨</span> गलत चीज़ों का सेवन
        </h3>
        <p className="text-gray-300 text-lg leading-8">
          जल्दी असर पाने के चक्कर में लोग ऐसे <span className="text-white font-semibold">Products</span> और इस्तेमाल कर रहे हैं जो न<span className="text-white font-semibold"> Standard
</span> हैं, न भरोसेमंद।
        </p>
        <p className="text-red-400 font-bold text-xl mt-8 flex items-start gap-2">
          <span>⚠️</span> 
          <span> नतीजा?  केमिकल्स, साइड इफेक्ट्स — और सेहत के साथ सीधा जोखिम!</span>
        </p>
      </div>

      {/* Expense Card */}
      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 px-8 py-10 backdrop-blur-md transition-all hover:border-amber-500/40 group">
        <h3 className="text-2xl font-bold text-amber-500 mb-5 flex items-center gap-3">
          <span className="group-hover:animate-pulse">🌿</span> अब सही रास्ता चुनें
        </h3>
        <p className="text-gray-300 text-lg leading-8">
          लोग या तो सस्ती गलत चीज़ों में फंस रहे हैं… या महंगे <span className="text-white font-semibold">Brands</span> में पैसे खर्च कर रहे हैं।
 अब एक ऐसा आयुर्वेदिक विकल्प चुनें जो दोनों से बेहतर हो।
        </p>
        <p className="text-amber-400 font-bold text-xl mt-8">
          ✅ रिजल्ट?  बेहतर परफॉर्मेंस, ज्यादा कॉन्फिडेंस — बिना टेंशन के।
        </p>
      </div>
    </div>

    {/* Bottom Question Box */}
    <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center backdrop-blur-lg shadow-2xl">
      <p className="text-3xl font-bold text-white">तो क्या करें? 🤔</p>
      <p className="text-2xl font-semibold text-red-500 mt-4 italic">
        असुरक्षित Products, या महंगे brands?
      </p>
      <div className="mt-8 h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
    </div>
  </div>
</section>
      {/* Mission Separate Section - Grey Theme */}
     <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-0 md:px-16 overflow-hidden">
  {/* Background Decorative Element */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full -mr-48 -mt-48"></div>
  
  {/* Product Section */}
    <div id="product" className="grid grid-cols-1 md:grid-cols-2 gap-16 my-2 md:my-0 md:mx-4 bg-[#121721] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
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
  {isVideo ? (
    <video
      key={(currentMedia as any).src}
      src={(currentMedia as any).src}
      controls
      autoPlay={userClickedVideo} // 👈 STEP 3: Video only autoplays if this is true
      muted
      loop
      playsInline
      className="w-full h-full object-contain bg-black"
    />
  ) : (
    <Image
      src={currentMedia as string}
      alt="Product View"
      fill
      className="object-contain p-4 drop-shadow-[0_10px_30px_rgba(251,191,36,0.15)]"
      priority
    />
  )}
</div>

      {/* --- Bottom Thumbnail Row --- */}
<div className="flex gap-3 overflow-x-auto w-full max-w-[500px] py-3 snap-x custom-scrollbar px-2">
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
        className={`relative w-[4.41rem] h-[4.41rem] flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center flex items-center justify-center ${
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
    <h1 className="text-3xl font-bold mb-4 text-white">
      {product.name}
    </h1>
    
    {/* Description - Lightened */}
    <p className="text-gray-300 mb-6 leading-relaxed">
      {product.description}
    </p>

    <div className="flex items-center gap-2 mb-6">
  {/* The Star Rating */}
  <div className="text-amber-400 text-2xl tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
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
    className="text-gray-200 hover:text-amber-400 transition-colors text-sm font-bold mt-1"
  >
    (10000+) Customer Reviews
  </button>
</div>

    {product.materials && (
      <div className="mb-6">
        <h3 className="text-xs tracking-widest font-bold text-amber-400 uppercase">
          Key Benefits
        </h3>
        <p className="text-gray-400">
          {/* Reminder: Update your product object to remove the jewelry materials! */}
          {product.materials.join(", ")}
        </p>
      </div>
    )}

    {/* <p className="text-3xl font-bold mb-8 text-amber-500">
      ₹ {product.price.toFixed(2)}
    </p> */}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => handlePlanSelect(plan)}
          className={`cursor-pointer border rounded-2xl p-4 transition-all relative backdrop-blur-sm group ${
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

          <h3 className="text-xl font-bold text-white">{plan.title}</h3>
          <p className="text-gray-400 text-sm font-semibold">{plan.tablets} Tablets</p>
          {/* <p className="text-gray-400 text-sm font-semibold">₹{plan.perTablet} Per Tablet</p> */}
          

          <p className="text-2xl font-bold mt-4 text-white">
            ₹ {plan.price}
          </p>

          <p className="text-red-400/80 line-through text-sm">
            ₹ {plan.mrp}
          </p>

          <div className="mt-3 mb-1">
            <span className="bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
               Free Shipping
            </span>
          </div>

          <p className="text-[10px] text-gray-500 uppercase mt-1">
            Inclusive of all taxes
          </p>
        </div>
      ))}
    </div>

   {/* 2. Update the Price Display JSX */}
<div className="mb-6">
 <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
<p className="text-4xl font-bold text-amber-500">
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

  <div className="max-w-6xl mx-auto text-center relative py-8 md:py-12">
    {/* The Heart Icon - Swapped for a glowing effect */}
    <div className="flex justify-center mb-8">
      <div className="text-5xl text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
        ♥
      </div>
    </div>

    <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
      हमारी सोच <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">अलग है</span>
    </h2>

    <p className="mt-10 text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
      <span className="text-amber-500 font-extrabold uppercase tracking-tight">Kin Ultra Power</span> सिर्फ एक Product नहीं है।
    </p>

    <div className="space-y-6 mt-10">
      <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
        यह उन लाखों पुरुषों के लिए है जो <span className="text-red-500 font-bold border-b-2 border-red-500/30 pb-1">चुपचाप</span> अपनी समस्या से जूझ रहे हैं।
      </p>

      <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
        जिन्हें एक <span className="text-white font-bold">सुरक्षित, असरदार, और Affordable</span> solution चाहिए।
      </p>
    </div>

    <div className="mt-16 p-8 md:p-12 rounded-[40px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
      <p className="text-3xl md:text-5xl font-black text-white leading-tight">
        हमारा मिशन है — हर पुरुष को उसका <span className="text-amber-500">भरोसा</span> और <span className="text-amber-500 leading-relaxed">Confidence</span> वापस दिलाना।
      </p>
      <p className="text-2xl md:text-4xl font-bold text-gray-300 mt-6 italic">
        बिना जेब खाली किए।
      </p>
      
      {/* Decorative Line */}
      <div className="mt-10 h-1.5 w-32 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
    </div>
    
  </div>
</section>
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5 overflow-hidden">
  {/* Subtle background glow to pull everything together */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

  <div className="max-w-6xl mx-auto text-center relative z-10">
    <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase shadow-sm">
      ✨ समाधान आ गया है
    </span>

    <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
      मिलिए <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Kin Ultra Power</span> से
    </h2>

    <p className="mt-6 text-xl md:text-2xl text-gray-400 font-medium">
      100% आयुर्वेदिक <span className="text-amber-500/50 mx-2">•</span> 
      सुरक्षित <span className="text-amber-500/50 mx-2">•</span> 
      तेज असर <span className="text-amber-500/50 mx-2">•</span> 
      किफायती कीमत
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {/* 100% Natural Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🌿</div>
        <h3 className="text-2xl font-bold text-white mb-2">100% प्राकृतिक</h3>
        <p className="text-gray-400 group-hover:text-gray-300">शुद्ध आयुर्वेदिक जड़ी-बूटियां</p>
      </div>

      {/* Fast Results Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-amber-500/40 hover:bg-amber-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">⚡</div>
        <h3 className="text-2xl font-bold text-white mb-2">तेज़ असर</h3>
        <p className="text-gray-400 group-hover:text-gray-300">15-20 दिन में रिजल्ट</p>
      </div>

      {/* Safe Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-blue-500/40 hover:bg-blue-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🛡️</div>
        <h3 className="text-2xl font-bold text-white mb-2">पूरी तरह सुरक्षित</h3>
        <p className="text-gray-400 group-hover:text-gray-300">कोई side effect नहीं</p>
      </div>

      {/* Trusted Card */}
      <div className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-md transition-all hover:border-yellow-500/40 hover:bg-yellow-500/5 shadow-2xl">
        <div className="text-5xl mb-6 transition-transform group-hover:scale-110">🏅</div>
        <h3 className="text-2xl font-bold text-white mb-2">भरोसेमंद</h3>
        <p className="text-gray-400 group-hover:text-gray-300">10,000+ खुश ग्राहक</p>
      </div>
    </div>
  </div>
</section>

      {/* 7 Powerful Ingredients Section */}
    <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5 overflow-hidden">
      {/* Subtle background glow for 'science'/'ancient' vibe */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-sm font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm">
            🌿 प्राचीन आयुर्वेद का विज्ञान
          </span>
          <h2 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-white">
            7 शक्तिशाली जड़ी-बूटियां
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed tracking-wide">
            हर ingredient को खास तौर पर चुना गया है आपकी <span className="text-white font-semibold">परफॉर्मेंस</span> बढ़ाने के लिए
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300 relative hover:border-amber-500/30 hover:bg-white/10"
            >
              {/* Number Badge with intense glow */}
              <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-2xl shadow-[0_0_15px_rgba(220,38,38,0.4)] group-hover:scale-110 transition-transform">
                {index + 1}
              </div>

              <h3 className="text-4xl font-extrabold text-amber-500 mb-5 tracking-tight">{item.name}</h3>
              <p className="text-2xl font-semibold text-white mb-5 leading-tight">{item.effect}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      {/* Result Highlight Separate Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-20 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto rounded-[40px] border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent px-8 py-12 text-center backdrop-blur-xl shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden">
    {/* Animated Glow behind the text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full animate-pulse"></div>
    
    <div className="relative z-10">
      <div className="text-6xl mb-6 drop-shadow-lg">✨</div>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
        परिणाम?
      </h2>
      <p className="py-3 text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 italic">
        शरीर पूरी तरह चार्ज हो जाता है 💪
      </p>
      <p className="pt-2 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        <span className="text-white font-semibold">Timing, Stamina, Control</span> — सब कुछ naturally बढ़ता है।
      </p>
    </div>
  </div>
</section>
     {/* Mental & Relationship Confidence Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-24 md:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    {/* Image Container with Glow */}
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <Image
        src="/assets/BedTime.webp"
        alt="Confidence and relationship improvement"
        width={600}
        height={600}
        quality={75}
        className="relative rounded-[40px] border border-white/10 shadow-2xl object-cover w-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
      />
    </div>

    <div>
      <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
        सिर्फ शारीरिक नहीं,
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 leading-relaxed">मानसिक बदलाव भी</span>
      </h2>

      <p className="mt-8 text-2xl text-gray-400 leading-relaxed">
        जब आपकी <span className="text-white font-bold">timing</span> और <span className="text-white font-bold">performance</span> improve होती है, तो सबसे बड़ा फायदा यह होता है:
      </p>

      <div className="mt-12 space-y-6">
        {[
          ["डर खत्म", "अब बिस्तर पर जाने से पहले घबराहट नहीं होगी"],
          ["Confidence बढ़ेगा", "खुद पर पूरा भरोसा, कोई शर्म नहीं"],
          ["पार्टनर की खुशी", "आपकी performance से वो पूरी तरह संतुष्ट"],
          ["रिश्ते मजबूत", "intimacy की वजह से bond और प्यार बढ़ेगा"],
          ["असली मर्द का एहसास", "अपनी मर्दानगी पर गर्व महसूस करोगे"],
        ].map((item, index) => (
          <div key={index} className="flex gap-6 items-start p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              ✓
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{item[0]}</h3>
              <p className="text-gray-500 text-lg mt-1">{item[1]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Box */}
      <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-10 py-12 backdrop-blur-md shadow-2xl relative">
        <div className="absolute -top-10 -left-4 text-6xl text-amber-500/50 font-serif">“</div>
        <p className="text-3xl font-bold text-amber-500 leading-snug italic relative z-10">
          जब performance सही हो, तो confidence automatically आ जाता है।
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Honest FAQ Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold uppercase tracking-widest shadow-sm">
        ♡ सचाई जानें
      </span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-normal">
        क्या Kin Ultra Power से <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 leading-relaxed">साइज़ बढ़ता है?</span>
      </h2>
    </div>

    <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
      <h3 className="text-4xl md:text-5xl font-black text-red-500 text-center uppercase">
        ईमानदारी से कहें तो - नहीं।
      </h3>
      <p className="mt-8 text-xl md:text-2xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
        Kin Ultra Power <span className="text-white font-bold">permanently</span> साइज़ नहीं बढ़ाता। और कोई भी product permanently नहीं बढ़ा सकता।
      </p>

      <div className="mt-12 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 md:p-10">
        <h4 className="text-3xl font-black text-amber-500 text-center mb-10">
          लेकिन यह ज़रूर करता है:
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["⚡ Erection Quality", "Harder, fuller, और longer lasting erection"],
            ["📈 Blood Flow", "जिससे erect होने पर maximum size achieve होता है"],
            ["❤️ Firmness", "कमजोर erection की problem solve होती है"]
          ].map((item, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-2xl font-bold text-white mb-3">{item[0]}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{item[1]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-2xl text-gray-300 font-medium">यानी असली बात यह है कि —</p>
        <p className="text-3xl md:text-5xl font-black text-amber-500 mt-4 leading-tight">
          साइज़ से ज़्यादा Important है <span className="text-white decoration-amber-500 underline-offset-8">Quality और Timing.</span>
        </p>
      </div>
    </div>
  </div>
</section>
      {/* Comparison Pricing Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-10 md:px-16">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest">
        🏷️ सबसे बड़ा फायदा
      </span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
        70% सस्ता, <span className="text-amber-500">Quality</span> में कोई कमी नहीं!
      </h2>
    </div>

    <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-xl font-bold text-gray-400">Feature</th>
              <th className="px-8 py-6 text-xl font-bold text-red-500">अन्य Brands</th>
              <th className="px-8 py-6 text-xl font-black text-amber-500 bg-amber-500/10">Kin Ultra Power</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["कीमत प्रति महीना", "₹3,500 - ₹5,000", "₹999 (70% OFF)"],
              ["Ingredients", "Chemical-based", "100% Ayurvedic"],
              ["असर का समय", "2-3 महीने", "15-20 दिन में"],
              ["Side Effects", "हो सकते हैं", "शून्य (None)"],
              ["Availability", "Limited stores", "पूरे भारत में"]
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 text-lg text-gray-300 font-medium">{row[0]}</td>
                <td className="px-8 py-6 text-lg text-red-400/80 font-semibold italic">{row[1]}</td>
                <td className="px-8 py-6 bg-amber-500/5">
                   <span className="text-lg font-black text-white">{row[2]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
     {/* Emotional Benefits Cards Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      ["रिश्ता मजबूत", "Physical intimacy improve होने से emotional bond भी बढ़ेगा", "❤️", "text-red-500"],
      ["Confidence Boost", "अपनी मर्दानगी पर गर्व महसूस करोगे, सीना चौड़ा होगा", "✨", "text-amber-500"],
      ["कोई शर्मिंदगी नहीं", "जल्दी निकल जाने का guilt और embarrassment हमेशा के लिए खत्म", "🏅", "text-amber-500"],
    ].map((card, index) => (
      <div 
        key={index} 
        className="group rounded-[32px] border border-white/10 bg-white/5 px-8 py-12 backdrop-blur-xl shadow-2xl transition-all hover:border-amber-500/30 hover:bg-white/10 flex flex-col justify-between min-h-[320px]"
      >
        <div>
          <h3 className="text-3xl font-black text-amber-500 mb-6 tracking-tight group-hover:text-white transition-colors">
            {card[0]}
          </h3>
          <p className="text-gray-400 text-xl leading-relaxed">
            {card[1]}
          </p>
        </div>
        <div className={`text-7xl mt-8 ${card[3]} filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-110`}>
          {card[2]}
        </div>
      </div>
    ))}
  </div>
</section>
     {/* Future Lifestyle Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">ज़रा सोचिए...</h2>
      <p className="mt-6 text-2xl text-gray-400">Kin Ultra Power लेने के बाद आपकी ज़िंदगी कैसी होगी?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Visual Cards */}
      <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 transition-all hover:scale-105">
        <div className="h-72 bg-[url('/images/BedTimeImage.jpg')] bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-500 uppercase">रात का इंतज़ार होगा</h3>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">अब आप excited होंगे बिस्तर पर जाने के लिए, डर नहीं लगेगा</p>
        </div>
      </div>

      <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 transition-all hover:scale-105">
        <div className="h-72 bg-[url('/images/partner-happy.jpg')] bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-500 uppercase">पार्टनर की आँखों में चमक</h3>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">जब आप 20+ मिनट रुकोगे, तो देखिए उनकी खुशी</p>
        </div>
      </div>

      {/* Control Card */}
      <div className="group rounded-[40px] overflow-hidden border border-white/10 bg-white/5 transition-all hover:scale-105">
      <div className="h-72 rounded-t-xl bg-[url('/images/NightExcitementImage.jpeg')] bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-500 uppercase">हर पल पूरा कंट्रोल </h3>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">अब आप decide करेंगे कब रुकना है,
जल्दी खत्म होने की चिंता नहीं होगी</p>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* Reality CTA Highlight Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-20 md:px-16">
  <div className="max-w-6xl mx-auto rounded-[40px] border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent px-8 py-20 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden">
    
    {/* Decorative Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div className="relative z-10">
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
        यह सिर्फ कल्पना नहीं है <span className="inline-block animate-bounce">🎯</span>
      </h2>
      
      {/* <p className="mt-8 text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
        यह आपकी नई reality बन सकती है!
      </p> */}

      <p className="mt-8 py-2 text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
  यह आपकी नई reality बन सकती है!
</p>
      
      <div className="mt-8 space-y-4">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          हज़ारों पुरुष पहले ही इस बदलाव को जी रहे हैं। 
          <span className="text-white font-bold block mt-2 text-3xl uppercase tracking-wider">अब आपकी बारी है।</span>
        </p>
      </div>

      {/* Adding an extra button here to drive the CTA home */}
      <div className="mt-12">
        <button onClick={(e) => {
  e.preventDefault();
  document.getElementById('product')?.scrollIntoView({ 
    behavior: "smooth" 
  });
}}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black px-12 py-5 rounded-2xl text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
          GET STARTED NOW
        </button>
      </div>
    </div>
  </div>
</section>

{/* Safety Assurance Section */}
<section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest">🛡️ सुरक्षा की गारंटी</span>
      <h2 className="mt-8 text-5xl md:text-7xl font-black text-white">100% सुरक्षित और प्राकृतिक</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        ["🌿", "पूरी तरह आयुर्वेदिक", "कोई chemical नहीं, सिर्फ प्राकृतिक जड़ी-बूटियां"],
        ["🛡️", "Side Effect मुक्त", "हजारों users - एक भी complaint नहीं"],
        ["✅", "डेली यूज़ के लिए Safe", "रोज ले सकते हैं, कोई खतरा नहीं"],
        ["🏅", "Quality Certified", "Lab tested और approved ingredients"]
      ].map((item, idx) => (
        <div key={idx} className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
          <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item[0]}</div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item[1]}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item[2]}</p>
        </div>
      ))}
    </div>

    {/* Note Box */}
    <div className="mt-20 max-w-4xl mx-auto rounded-[40px] border border-amber-500/20 bg-gradient-to-b from-white/5 to-transparent p-12 shadow-2xl backdrop-blur-md">
      <h3 className="text-3xl font-black text-center text-white mb-10">📌 महत्वपूर्ण नोट</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">18+</span> किसी भी उम्र के लिए</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">No Habit</span> जब चाहें बंद करें</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">Sugar/BP</span> Patients के लिए Safe</p>
        <p className="flex items-center gap-3">✅ <span className="font-bold text-white">Co-Meds</span> दूसरी दवाओं के साथ safe</p>
      </div>
    </div>
  </div>
</section>
    
     {/* Testimonials Section */}
<section id="testimonials" className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#121721] px-8 py-16 md:px-16 border-t border-white/5">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest shadow-sm">
        ☆ असली ग्राहकों की राय
      </span>
      <h2 style={{ lineHeight: '1.39' }} className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
        10,000+ खुश ग्राहक <br/><span className="text-amber-500">क्या कहते हैं?</span>
      </h2>
      <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        यह stories हैं उन लोगों की जिन्होंने <span className="text-white font-bold">Kin Ultra Power</span> से अपनी ज़िंदगी बदली
      </p>
    </div>
 {/* The Grid - Showing only the sliced amount */}
        {/* --- DYNAMIC STAR RENDERING IN JSX --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-0">
          {allTestimonials.slice(0, visibleCount).map((t, index) => (
            <div 
              key={index} 
              className="group flex flex-col justify-between rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-amber-500/40 hover:bg-white/10 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <div>
                {/* Dynamically Render Stars based on Rating Data */}
                <div className="text-amber-400 text-2xl mb-6 tracking-widest drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                  {Array(t.rating).fill(null).map((_, i) => (
                      <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-200 text-base leading-relaxed mb-4 italic">
                  {t.quote}
                </p>
              </div>

          <div className="border-t border-white/10 pt-4 flex items-center gap-4">
  {/* Profile Image / Icon Container */}
 <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 bg-white/5 flex items-center justify-center">
  {t.image ? (
    <img 
      src={t.image} 
      alt={t.name} 
      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" 
      onError={(e) => {
        // 1. Hide the broken image
        e.currentTarget.style.display = 'none';
        // 2. Direct DOM replacement: This adds the icon HTML inside the parent div
        e.currentTarget.parentElement!.innerHTML = `
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 group-hover:text-amber-500 transition-colors">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        `;
      }}
    />
  ) : (
    <User className="w-6 h-6 text-gray-500 group-hover:text-amber-500 transition-colors" />
  )}
</div>
  
  <div className="flex flex-col">
    <p className="text-base font-black text-white uppercase tracking-tight">{t.name}</p>
    <p className="text-amber-500/80 text-xs mt-1 font-bold">{t.meta}</p>
  </div>
</div>
            </div>
          ))}
        </div>

        {/* Load More Controls */}
        {allTestimonials.length > 10 && (
          <div className="mt-0 flex flex-col items-center gap-6">
            {/* <div className="flex flex-wrap justify-center gap-4">
            
            </div> */}
            
            {/* <p className="text-gray-600 text-xs uppercase tracking-widest font-medium">
              Showing {visibleCount} of {allTestimonials.length} Reviews
            </p> */}
          </div>
        )}

        {/* 4. The "Load More" Button Section */}
        {visibleCount < allTestimonials.length && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl transition-all hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-xl"
            >
              <span>LOAD MORE REVIEWS</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              
              {/* Subtle amber glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
            
            {/* <p className="mt-4 text-gray-500 text-xs uppercase tracking-widest">
              Showing {visibleCount} of {allTestimonials.length} Happy Customers
            </p> */}
          </div>
        )}
  </div>
</section>
     {/* Premium Footer Section */}
<footer className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#0B0E14] border-t border-white/5 px-8 py-20 md:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
    {/* Brand Info */}
    <div>
      <h3 className="text-4xl font-black text-white tracking-tighter">
        KIN ULTRA<span className="text-amber-500">POWER</span>
      </h3>
      <p className="mt-6 text-xl text-gray-400 font-medium leading-relaxed">
        आपकी मर्दानगी का <span className="text-white">असली साथी</span>। सुरक्षित, प्राकृतिक और असरदार।
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest">Legal & Links</h4>
      <ul className="space-y-4 text-lg text-gray-400">
        <li><a href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Privacy Policy</a></li>
        <li><a href="/terms" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Terms & Conditions</a></li>
        <li><a href="/return-policy" className="hover:text-white transition-colors flex items-center gap-2"><span>→</span> Refund & Shipping Policy</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h4 className="text-xs font-bold text-amber-500 mb-8 uppercase tracking-widest">संपर्क करें</h4>
      <div className="space-y-6">
        {/* Commented for now, may be needed in future if we want to add phone support back */}
        {/* <div className="flex items-center gap-4 text-white text-xl font-bold">
          <span className="p-3 rounded-xl bg-white/5 border border-white/10 text-amber-500">📞</span>
          +91-XXXXX-XXXXX
        </div> */}
<a 
  href="https://wa.me/919217900585" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center gap-4 text-white text-xl font-bold cursor-pointer hover:text-green-400 transition-colors"
>
  <span className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-500">
    💬
  </span>
  WhatsApp Support
</a>
      </div>
    </div>
  </div>

  {/* Copyright Line */}
  <div className="max-w-7xl mx-auto mt-12 pt-4 pb-16 border-t text-gray-400 border-white/5 text-center text-sm tracking-widest uppercase">
  <p>Disclaimer :- “यह एक आयुर्वेदिक/हर्बल सपोर्ट उत्पाद है। यह किसी भी प्रकार की बीमारी के निदान, उपचार या रोकथाम का दावा नहीं करता। परिणाम व्यक्ति की शारीरिक स्थिति पर निर्भर करते हैं और अलग-अलग हो सकते हैं। किसी भी स्वास्थ्य संबंधी समस्या के लिए अपने डॉक्टर या विशेषज्ञ से परामर्श अवश्य लें।”</p>
    <br/>© 2026 This website is powered by Shree MBM Pharmaceuticals. All Rights Reserved.
  </div>
</footer>
{/* Sticky Bottom Bar */}
{/* Improved "Intense Theme" Sticky Bar */}
<div className={`fixed bottom-0 left-0 w-full bg-[#121721]/90 backdrop-blur-xl border-t border-white/10 z-50 transition-all duration-500 transform ${
  showStickyBar ? "translate-y-0" : "translate-y-full"
} shadow-[0_-10px_40px_rgba(0,0,0,0.5)]`}>
  <div className="max-w-7xl mx-auto px-4 py-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Plan Selection - Dark Mode Version */}
      <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlanSelect(plan)}
            className={`flex-1 md:min-w-[120px] cursor-pointer p-3 rounded-xl border-2 transition-all text-center relative overflow-hidden ${
              selectedPlan.id === plan.id
                ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                : "border-white/5 bg-white/5 hover:border-white/20"
            }`}
          >
            <p className={`text-xs md:text-[10px] font-black uppercase ${
              selectedPlan.id === plan.id ? "text-amber-400" : "text-gray-500"
            }`}>
              {plan.title}
            </p>
            <p className="text-xs md:text-base font-bold text-white">₹{plan.price}</p>
            {selectedPlan.id === plan.id && (
               <div className="absolute top-0 right-0 bg-amber-500 text-black text-[8px] px-1 font-bold rounded-bl-lg">
                 ✓
               </div>
            )}
             <p className="text-xs md:text-base font-bold text-red-400/80 line-through">₹{plan.mrp}</p>
            {/* {selectedMrp.id === mrp.id && (
               <div className="absolute top-0 right-0 bg-amber-500 text-black text-[8px] px-1 font-bold rounded-bl-lg">
                 ✓
               </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Pricing & CTA */}
      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
        <div className="text-left">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Selected Total</p>
          <p className="text-sm md:text-2xl font-black text-amber-500">
            ₹{(selectedPlan.price * quantity).toLocaleString('en-IN')}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black px-2 md:px-12 py-4 rounded-xl text-sm md:text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
        >
          BUY NOW
        </button>
      </div>
    </div>
  </div>
</div>
  </div>
);
}