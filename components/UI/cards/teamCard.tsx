import Image, { StaticImageData } from "next/image";

type TeamCardType = {
  name: string;
  profession: string;
  image: StaticImageData;
  color: string;
  background: string;
};

export const TeamCard = ({
  name,
  profession,
  image,
  color,
  background,
}: TeamCardType) => {
  return (
    <div
      style={{
        borderColor: color,
      }}
      className="group relative flex flex-col rounded-xl p-6 shadow-lg hover:shadow-xl duration-500 border-b-8 hover:-translate-y-2 bg-white"
    >
      <div
        className="relative h-[140px] rounded-xl overflow-hidden"
        style={{
          backgroundColor: color,
          background: `url(${background})`,
        }}
      >
        <span className="absolute w-8 h-[250%] -bottom-20 -left-[50%] bg-[#ffffff] -rotate-[45deg] group-hover:block group-hover:left-[120%] duration-[0.7s] rounded-sm opacity-15 z-10"></span>
      </div>
      <Image
        src={image}
        width={500}
        height={500}
        className="rounded-full mx-auto w-[125px] h-[125px] -translate-y-16 border-white border-8 z-10"
        alt="Profile Image"
      />

      <div className="flex flex-col gap-4 items-center justify-center -mt-14">
        <h2 className="font-bold">{name}</h2>
        <p
          className="text-sm font-bold"
          style={{
            color: color,
          }}
        >
          {profession}
        </p>
      </div>
    </div>
  );
};
