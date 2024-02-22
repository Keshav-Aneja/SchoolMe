import Image from "next/image"
export default function Navbar(){
    return (
        <nav className="flex w-full py-[1rem] justify-between">
        <Image src={'/demoLogo.png'} width={145} height={145} alt="Logo"/>
            <div className="w-[40%] flex flex-row justify-between items-center font-bold">
                <div className="cursor-pointer">Home</div>
                <div className="cursor-pointer">About Us</div>
                <div className="cursor-pointer">Features</div>
                <div className="cursor-pointer">Login</div>
                <div className="bg-[#A4BCFD] text-white px-[1rem] py-[0.5rem] rounded-[0.5rem] cursor-pointer">Register</div>
            </div>
        </nav>
    )
}