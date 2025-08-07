import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

type Props = {
  publisher_name: string;
  reaction_text: string;
};

const InternationalReactionCard = ({
  publisher_name,
  reaction_text,
}: Props) => {
  return (
    <div
      style={{
        direction: "rtl",
      }}
      className="relative flex flex-col gap-2 p-8 rounded-[50px] rounded-tr-none bg-white border w-full hover:cursor-grab"
    >
      <h5 className="text-md font-bold">{publisher_name}</h5>

      <p className="font-light text-sm">{reaction_text}</p>

      {/* absolute icon */}
      <FaQuoteLeft className="absolute bottom-8 left-8 opacity-5" size={20} />
      <FaQuoteRight className="absolute top-2 right-2 opacity-5" size={20} />
    </div>
  );
};

export default InternationalReactionCard;
