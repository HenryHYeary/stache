"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import FileUploader from "./FileUploader";


interface MobileNavigationProps {
  ownerId: string,
  accountId: string,
  fullName: string,
  avatar: string,
  email: string
}


const MobileNavigation = ({ ownerId, accountId, fullName, avatar, email } :
  MobileNavigationProps
) => {
  const [open, setOpen] = useState();
  const pathname = usePathname();

  return <header className="flex h-[60px] justify-between px-5 sm:hidden">
    <Image 
      src="/assets/icons/logo-brand.svg" 
      alt="logo" 
      width={52} 
      height={52} 
      className="h-auto" 
    />

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Image 
          src="/assets/icons/menu.svg"
          alt="Search"
          width={30}
          height={30}
        />
      </SheetTrigger>
      <SheetContent className="pt-0 h-screen px-3">   
        <div className="my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
          <Image
            src={avatar}
            alt="avatar"
            width={44}
            height={44}
            className="aspect-square w-10 rounded-full object-cover"
          />
          <div className="sm:hidden lg:block">
            <p className="capitalize text-[14px] leading-[20px] font-semibold">
              {fullName}
            </p>
            <p className="text-[12px] leading-[16px] font-normal">
              {email}
            </p>
          </div>
        </div>
        <Separator className="mb-4 bg-[#A3B2C7]/20" />
        <nav className="flex-1 gap-1 text-brand text-[16px] leading-[24px] font-semibold">
          <ul className="flex flex-1 flex-col gap-4">
          {navItems.map(({ url, name, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li className={cn(
                "flex text-light-100 gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full", 
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
                <p>{name}</p>
              </li>
            </Link>
          ))}
          </ul>
        </nav>
        <Separator className="my-5 bg-[#A3B2C7]/20" />

        <div className="flex flex-col justify-between gap-5 pb-5">
          <FileUploader />
          <Button type="submit" className="flex-center h-[52px] min-w-[54px] items-center rounded-full bg-[#FA7275]/10 p-0 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20"
          onClick={() => {}}>
            <Image 
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
            />
            <p>Logout</p>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  </header>
}

export default MobileNavigation;
