import Image from "next/image";
export default function AboutUs() {
  return (
    <section className="w-full flex bg-[#e0e0e0] items-center p-2 rounded-[0.5rem] ">
      <Image
        src={"/Student.webp"}
        width={500}
        height={400}
        alt="Logo"
        className="w-[50%] h-[30%] rounded-[0.5rem]"
      />
      <div className="flex flex-col gap-[1rem] ml-12">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="text-lg w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          maxime odio sunt Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Impedit maxime odio sunt, expedita quo earum quasi nihil autem
          at perspiciatis nam porro aspernatur molestiae fugiat ut nulla
          officiis, aut quis.
        </p>
      </div>
    </section>
  );
}
