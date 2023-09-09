"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Login({ link, codeVerifier }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code") && !searchParams.get("codeVerifier")) {
      const params = new URLSearchParams(searchParams);
      params.set("codeVerifier", sessionStorage.getItem("codeVerifier"));
      router.push(process.env.NEXT_PUBLIC_BASE_URL + "?" + params);
    } else {
      sessionStorage.setItem("codeVerifier", codeVerifier);
    }
  }, []);

  return <Link href={link}>login</Link>;
}

export default Login;
