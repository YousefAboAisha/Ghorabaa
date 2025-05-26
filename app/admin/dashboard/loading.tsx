import Image from "next/image";
import logo from "@/public/zad-logo.svg";

type SpinnerProps = {
  additionalStyles?: string;
};

const Spinner = ({ additionalStyles }: SpinnerProps) => {
  return (
    <div role="status" className={`abs-center fixed z-50 ${additionalStyles}`}>
      <Image
        src={logo}
        width={25}
        height={25}
        alt="Zad logo"
        className="animate-pulse"
      />
    </div>
  );
};

export default Spinner;
