import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
      <Link href="/">
        <Image 
          src="/assets/icons/logo-full-brand.svg"
          alt="logo" 
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
      </Link>
    </aside>
  )
}

export default Sidebar;
