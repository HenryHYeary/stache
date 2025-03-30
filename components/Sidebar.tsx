"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] items-center">
      <Link href="/">
        <Image 
          src="/assets/icons/logo-full-brand.svg"
          alt="logo" 
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <Image 
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          height={52}
          width={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="text-[16px] leading-[24px] font-semibold mt-9 flex-1 gap-1 text-[#FA7275]">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li className={cn("flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full", pathname === url && "bg-[#FA7275] text-white shadow-drop-2")}>
                <Image src={icon} alt={name} width={24} height={24} />
                <p>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
