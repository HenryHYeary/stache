"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional()
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", 
      email: ""
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = 
        type === "sign-up" ? await createAccount({
          fullName: values.fullName || "",
          email: values.email
        }) : await signInUser({ email: values.email })

      setAccountId(user.accountId);

    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

    return <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <h1 className="text-[34px] leading-[42px] font-bold text-center text-light-100 md:text-left">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" &&
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 drop-shadow-lg">
                  <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 text-[14px] leading-[20px] font-normal" {...field} />
                  </FormControl>
                </div>
                
                <FormMessage className="text-[#FF7474] text-[14px] leading-[20px] font-normal ml-4" />
              </FormItem>
            )}
          />
          }
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 drop-shadow-lg">
                  <FormLabel className="text-light-100 pt-2 text-[14px] leading-[20px] font-normal w-full">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="border-none shadow-none p-0 shad-no-focus placeholder:text-light-200 text-[14px] leading-[20px] font-normal" {...field} />
                  </FormControl>
                </div>
                
                <FormMessage className="text-[#FF7474] text-[14px] leading-[20px] font-normal ml-4" />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-[#FA7275] hover:bg-[#EA6365] transition-all rounded-full w-full h-[66px] drop-shadow-md" disabled={isLoading}>
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin" />
            )}
          </Button>

          {errorMessage && (
            <p className="text-[#333F4E] text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error">*{errorMessage}</p>
          )}
          <div className="text-[14px] leading-[20px] font-normal flex justify-center">
            <p className="text-[#333F4E]">
              {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === "sign-up" ? "/sign-in" : "/sign-up"} className="ml-1 font-medium text-[#FA7275]">
                {" "}
                {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />}
    </>
};

export default AuthForm;
