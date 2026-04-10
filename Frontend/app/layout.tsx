import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
// import { CartProvider } from "@/context/CartContext";
// import { ProductProvider } from "@/context/ProductContext";
import Script from "next/dist/client/script";
import LanguageGrowl from "@/components/LanguageGrowl";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "KinLiv DS",
  description: "KinLiv DS - India's #1 Liver Support Supplement. Clinically Proven, Doctor Recommended, and Loved by Thousands. Boost Your Liver Health with KinLiv DS Today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google Tag Manager --> */}
<Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KKHSNTVF');
            `,
          }}
        />
{/* <!-- End Google Tag Manager --> */}
      </head>
      <body>
        {/* --- 1. GTM Noscript (Must be first thing in body) --- */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KKHSNTVF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />

        {/* <ProductProvider> */}
          <CartProvider>
            <header className="bg-[#B91C1C] text-white text-center py-2 px-4 text-sm md:text-base font-bold tracking-tight shadow-lg">
              {/* <Navbar /> */}
              {/* <div className="bg-[#B91C1C] text-white text-center py-2 px-4 text-sm md:text-base font-bold tracking-tight shadow-lg"> */}
        ⚠ WARNING: Limited Stock Available — Offer Ends Tonight at Midnight
      {/* </div> */}
            </header>
            {children}
          </CartProvider>
        {/* </ProductProvider> */}
        <LanguageGrowl />
      </body>
    </html>
  );
}
