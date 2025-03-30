"use client";

import { avatarPlaceholderUrl, navItems } from "@/constants";
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
              <li className={cn(
                "flex text-[#333F4E] gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center text-[16px] leading-[24px] font-semibold lg:px-[30px] h-[52px] w-[52px] lg:rounded-full", 
                pathname === url && "bg-[#FA7275] text-white drop-shadow-lg")}>
                <Image 
                  src={icon} 
                  alt={name} 
                  width={24} 
                  height={24}
                  className={cn(
                    "w-6 filter invert opacity-25",
                    pathname === url && "invert-0 opacity-100"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image 
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image 
          src={avatarPlaceholderUrl}
          alt="Avatar"
          width={44}
          height={44}
          className="aspect-square w-10 rounded-full object-cover"
        />
      </div>
    </aside>
  )
}

export default Sidebar;
