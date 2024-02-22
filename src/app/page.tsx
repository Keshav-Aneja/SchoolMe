"use client"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full px-[2rem] gap-[1rem] bg-white">
    <Navbar/>
    <Hero/>
    <AboutUs/>
    <Services/>
    <Footer/>
    </main>
  );
}
