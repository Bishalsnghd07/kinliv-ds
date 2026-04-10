"use client";

import { useEffect, useState } from "react";

// Mapping of Indian states to languages
const stateLanguageMap: Record<string, { lang: string, label: string }> = {
  "West Bengal": { lang: "bn", label: "Bengali" },
  "Odisha": { lang: "or", label: "Odiya" },
  "Maharashtra": { lang: "mr", label: "Marathi" },
  "Tamil Nadu": { lang: "ta", label: "Tamil" },
  "Karnataka": { lang: "kn", label: "Kannada" },
  "Punjab": { lang: "pa", label: "Punjabi" },
  "Gujarat": { lang: "gu", label: "Gujarati" },
};

export default function LanguageGrowl() {
  const [suggestion, setSuggestion] = useState<{state: string, lang: string, label: string} | null>(null);

  useEffect(() => {
    const hasChosen = localStorage.getItem("user-language-pref");
    if (hasChosen) return;

    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const state = data.region; 
        const mapping = stateLanguageMap[state];

        if (mapping) {
          setSuggestion({ state, lang: mapping.lang, label: mapping.label });
        }
      } catch (err) {
        console.error("Location detection failed", err);
      }
    };

    detectLocation();
  }, []);

  const handleAccept = (lang: string) => {
    localStorage.setItem("user-language-pref", lang);
    // Logic to trigger your translation would go here
    setSuggestion(null);
  };

  if (!suggestion) return null;

  return (
    <div className="fixed bottom-10 left-6 z-[200] bg-white border border-gray-100 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-sm animate-in fade-in slide-in-from-bottom-5">
      <div className="flex flex-col gap-4">
        <p className="text-[#1A1A1A] font-bold text-lg leading-tight">
          It looks like you're in {suggestion.state}. <br/>
          <span className="text-gray-500 text-sm font-medium">Would you like to read this in {suggestion.label}?</span>
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAccept(suggestion.lang)}
            className="bg-[#B91C1C] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-red-700 transition-colors"
          >
            Yes, Translate to {suggestion.label}
          </button>
          <button 
            onClick={() => {
              localStorage.setItem("user-language-pref", "en");
              setSuggestion(null);
            }}
            className="text-gray-400 font-bold text-sm hover:text-gray-600 px-2"
          >
            Stay in English
          </button>
        </div>
      </div>
    </div>
  );
}