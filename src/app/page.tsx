import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full px-[2rem] bg-white">
    <Navbar/>
    <Hero/>
    </main>
  );
}
