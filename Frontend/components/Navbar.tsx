"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartDropdown } from "./CartDropdown";
import { motion } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Rings", path: "/rings" },
    { name: "Necklaces", path: "/necklaces" },
    { name: "Earrings", path: "/earrings" },
  ];

  return (
    <>
    <div className="flex justify-evenly items-center w-full">
   <Link href="/" className="text-xl md:text-3xl font-bold text-white w-full">
        <h1>
          <span className="text-[#d4af37]">Kin </span>Ultra Power
        </h1>
      </Link>
      <nav className="flex w-full justify-end gap-4">

      <CartDropdown />
      </nav>

    </div>
    </>
  );
};

export default Navbar;
