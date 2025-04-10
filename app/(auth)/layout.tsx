import React from "react"
import Image from "next/image";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen">
    <section className="bg-[#FA7275] p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
      <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
        <Image src="/assets/icons/logo-full.svg" 
          alt="logo" 
          width={224} 
          height={82} 
          className="h-auto" 
        />
        <div className="space-y-5 text-white">
          <h1 className="font-semibold">stache - a place for all of your file needs</h1>
          <h1 className="font-semibold">Manage your files</h1>
          <p className="text-[16px] leading-[24px] font-semibold">
            This is a place where you can store all of your documents
          </p>
        </div>
        <Image 
          src="/assets/images/files.png"
          alt="Files"
          width={342}
          height={342}
        />
      </div>
    </section>

    <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
      <div className="mb-16 lg:hidden">
        <Image 
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={224}
          height={82}
          className="h-auto w-[200px] lg:2-[250px]"
        />
      </div>    
      { children }
    </section>

  </div>
};

export default Layout;
