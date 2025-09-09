import Image from "next/image";

type LogoProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"img">;

const Logo = ({ className = "", ...rest }: LogoProps) => {
  return (
    <Image
      {...rest}
      className={`${className} h-full`}
      src={"/logo.svg"}
      alt="Ghorabaa's Logo"
      width={35}
      height={35}
    />
  );
};

export default Logo;
