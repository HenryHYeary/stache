"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({accountId, email} : { accountId: string, email: string}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="text-center text-[24px] leading-[36px] font-bold">
            Enter Your OTP
            <Image 
              src="/assets/icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-center text-light-100">
            We&apos;ve sent a code to<span className="pl-1 text-[#FA7275]">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="w-full flex gap-1 sm:gap-2 justify-between">
            <InputOTPSlot index={0} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
            <InputOTPSlot index={1} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
            <InputOTPSlot index={2} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
            <InputOTPSlot index={3} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
            <InputOTPSlot index={4} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
            <InputOTPSlot index={5} className="text-[40px] font-medium rounded-lg ring-[#FA7275] drop=shadow-md text-[#EA6365] justify-center flex border-2 border-[#F2F5F9] size-12 md:size-16 gap-5"/>
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="w-full flex-col gap-4">
            <AlertDialogAction 
              onClick={handleSubmit} 
              className="bg-[#FA7275] text-[14px] leading-[20px] font-medium hover:bg-[#EA6365] transition-all rounded-full h-12 w-full" 
              type="button"
            >
              Submit
              {isLoading && (
                <Image 
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="mt-2 text-[14px] leading-[20px] font-semibold text-[#333F4E] text-center">
              Didn&apos;t get a code?
              <Button 
                type="button" 
                variant="link" 
                className="pl-1 text-[#FA7275]" 
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
