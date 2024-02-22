import Image from "next/image"
export default function Hero(){
return (
    <main className="w-full flex h-[90vh] relative flex-col">
        <section className="flex flex-col gap-[1.5rem] absolute top-[50%] translate-y-[-50%]">
        <h1 className="font-bold text-6xl w-[35%]">Best Learning Education Platform in the world</h1>
        <p className="w-[40%] text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium eum odio vero molestiae quo? Vitae tenetur explicabo facilis quasi. Eveniet omnis non exercitationem! Quos itaque error quas repellendus. Reprehenderit, sint.</p>
        <div className="bg-[#3538CD] text-white px-[1rem] py-[0.5rem] rounded-[0.5rem] w-fit">Get Started</div>
        </section>
        <section className="flex flex-col absolute right-0 top-[50%] translate-y-[-50%] gap-[1rem]">
        <Image src={'/heroOne.avif'} width={400} height={400} alt="Logo" className="w-[90%] h-[90%]"/>
        <Image src={'/heroTwo.avif'} width={400} height={400} alt="Logo" className="w-[90%] h-[90%]"/>
        </section>
    </main>
)
}