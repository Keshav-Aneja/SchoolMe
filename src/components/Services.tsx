import Image from "next/image";
export default function Services() {
  return (
    <section className="w-full flex bg-[#e0e0e0] p-2 px-4 rounded-[0.5rem]">
      <div className="flex flex-col gap-[1rem] items-start justify-center">
        <h1 className="text-5xl font-bold">Our Services</h1>
        <p className="text-lg w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          maxime odio sunt Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Impedit maxime odio sunt, expedita quo earum quasi nihil autem
          at perspiciatis nam porro aspernatur molestiae fugiat ut nulla
          officiis, aut quis.
        </p>
      </div>
      <Image
        src={"/Cover-login.png"}
        width={400}
        height={400}
        alt="Logo"
        className="w-[30%] h-[30%] rounded-[0.5rem]"
      />
    </section>
  );
}
