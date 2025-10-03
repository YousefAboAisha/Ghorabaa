import Image from "next/image";

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
} & React.ComponentPropsWithoutRef<"img">;

const Logo = ({
  className = "",
  width = 45,
  height = 45,
  ...rest
}: LogoProps) => {
  return (
    <Image
      {...rest}
      className={`${className} h-full`}
      src={"/logos/logo.svg"}
      alt="Ghorabaa's Logo"
      width={width}
      height={height}
    />
  );
};

export default Logo;
