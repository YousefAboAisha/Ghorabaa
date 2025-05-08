import Image from "next/image";
import Link from "next/link";
import logo from "@/public/zad-logo.svg";

type LogoProps = {
  width: number;
  height: number;
};

const Logo = ({ width, height, ...rest }: LogoProps) => {
  return (
    <Link href={"/"}>
      <Image
        {...rest}
        src={logo}
        width={width}
        height={height}
        alt="شعار الموقع"
        className="h-auto"
        priority // Optimize for above-the-fold images
      />
    </Link>
  );
};

export default Logo;
