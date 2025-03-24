import React from "react"
import Image from "next/image";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen">
    <section className="bg-[#EA6365] p-10">
      <div>
        <Image src="/favicon.ico" alt="logo" width={16} height={16} className="h-auto" />
        <div className="space-y-5 text-white">
          <h1 className="text-blue-500 font-semibold">Manage your files</h1>
          <p className="text-[16px] leading-[24px] font-normal">
            This is a place where you can store all of your documents
          </p>
        </div>
      </div>
    </section>
    { children }
  </div>
};

export default Layout;