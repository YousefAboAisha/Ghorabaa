// import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/ghorabaa-logo.svg";

type LogoProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"a">;

const Logo = ({ className = "", ...rest }: LogoProps) => {
  return (
    <Link href={"/"} {...rest} className={`${className}`}>
      <h2 className="font-semibold">غُربَاء</h2>
    </Link>
  );
};

export default Logo;
