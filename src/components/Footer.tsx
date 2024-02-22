import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex justify-between items-center flex-col w-full  gap-[1.5rem] text-gray-300 bg-[#000000] px-[1rem] py-[2rem] rounded-[0.5rem]" 
    >
      {/* add  logo here */}
      <div className="flex justify-center items-center w-[12%] gap-[1.4rem]">
        <Image width={60} height={60} src="/demoLogo.png" alt="Logo" />
        <h1 className="font-gilroyBlack text-4xl text-center">SchoolMe</h1>
      </div>

      <div className="flex w-full md:w-[30%] text-xl justify-around md:justify-center items-center font-gilroyRegular md:gap-[1.4rem]">
        <Link
          href="https://twitter.com/csivitu"
          className="hover:text-[#8A61FF] hover:underline transition-colors duration-500"
        >
          Twitter
        </Link>
        <Link
          href="https://www.instagram.com/csivitu/"
          className="hover:text-[#8A61FF] hover:underline transition-colors duration-500"
        >
          Instagram
        </Link>
        <Link
          href="https://www.linkedin.com/company/csivitu"
          className="hover:text-[#8A61FF] hover:underline transition-colors duration-500"
        >
          Linkedin
        </Link>
      
      </div>
      <div className="flex  w-[30%] text-xl justify-between items-center font-gilroyRegular"></div>

      <p>Made with ❤️ by TeamName</p>
    </footer>
  );
}