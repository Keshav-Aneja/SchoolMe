import Image from "next/image"
export default function Services(){
    return (
        <section className="w-full flex bg-[#A4BCFD] py-[1rem] px-[1rem] rounded-[0.5rem]">
            <Image src={'/heroOne.avif'} width={400} height={400} alt="Logo" className="w-[30%] h-[30%] rounded-[0.5rem]"/>
            <div className="flex flex-col gap-[1rem] items-end">
                <h1 className="text-5xl font-bold">Our Services</h1>
                <p className="text-lg w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit maxime odio sunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit maxime odio sunt, expedita quo earum quasi nihil autem at perspiciatis nam porro aspernatur molestiae fugiat ut nulla officiis, aut quis.</p>
            </div>
        </section>
    )
}