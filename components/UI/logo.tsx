type LogoProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"h2">;

const Logo = ({ className = "", ...rest }: LogoProps) => {
  return (
    <h2 {...rest} className={` font-semibold ${className}`}>
      غُربَاء
    </h2>
  );
};

export default Logo;
