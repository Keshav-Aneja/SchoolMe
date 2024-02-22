"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { checkExpiry } from "@/helpers/jwtExpiryChecker";
import { useEffect, useState } from "react";
export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (checkExpiry()) {
      setLoggedIn(false);
      return;
    } else {
      setLoggedIn(true);
    }
  }, []);
  return (
    <nav className="flex w-full py-[1rem] justify-between">
      <Image src={"/demoLogo.png"} width={145} height={145} alt="Logo" />
      <div className="w-[40%] flex flex-row justify-between items-center font-bold">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">About Us</div>
        <div className="cursor-pointer">Features</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}
        >
          {!loggedIn ? "Login" : "Logged In"}
        </div>
        <div
          className="bg-[#3538CD] text-white px-[1rem] py-[0.5rem] rounded-[0.5rem] cursor-pointer"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Register
        </div>
      </div>
    </nav>
  );
}
