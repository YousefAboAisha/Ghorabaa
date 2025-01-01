import Image from "next/image";
import scrollDown from "@/public/scrollDown.gif";
import Heading from "@/components/UI/typography/heading";

const Landing = () => {
  return (
    <div className="relative flex flex-col justify-center items-start rounded-bl-[200px] w-full min-h-[90vh] mt-[70px] bg-home-landing bg-cover before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#0000009a] before:rounded-bl-[200px] bg-fixed">
      <div className="container flex flex-col gap-4 absolute right-0 h-full w-full backdrop-blur-none md:w-[50%] md:backdrop-blur-sm lg:w-[50%] lg:backdrop-blur-sm  items-center justify-center">
        <div className="w-10/12 md:w-10/12 lg:w-7/12">
          <Heading
            title=""
            highLightText="زاد | مساحة عمل"
            highlightColor="before:bg-primary"
            details="زاد هي مبادرة تهدف إلى تمكين الأفراد والمجتمعات من خلال توفير فرص مبتكرة للتعلم، الإبداع، والتطوير."
            className="text-white mb-4"
            additionalStyles="before:w-6/12"
            detailsStyles="mt-6"
          />
        </div>
      </div>

      <Image
        src={scrollDown}
        className="w-12 h-12 absolute text-white left-[50%] translate-x-[-50%] bottom-0 "
        alt="title"
        unoptimized
        // Cuz it's an animated image
      />
    </div>
  );
};

export default Landing;
