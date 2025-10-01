import Image from "next/image";

type LogoProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"img">;

const Logo = ({ className = "", ...rest }: LogoProps) => {
  return (
    <Image
      {...rest}
      className={`${className} h-full`}
      src={"/logos/logo.svg"}
      alt="Ghorabaa's Logo"
      width={45}
      height={45}
    />
  );
};

export default Logo;
