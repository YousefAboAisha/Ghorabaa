type HeadingProps = {
  title: string;
  additionalStyles?: string;
  highLightText?: string;
  details?: string;
  detailsStyles?: string;
  highlightColor?:
    | "before:bg-primary"
    | "before:bg-blueColor"
    | "before:bg-secondary";
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({
  title,
  additionalStyles = "",
  highLightText,
  highlightColor = "before:bg-primary",
  details,
  detailsStyles = "",
  className = "",
  ...rest
}: HeadingProps) => {
  return (
    <h4
      className={`group relative text-2xl md:text-xl lg:text-2xl font-semibold duration-500 uppercase w-fit ${className}`}
      {...rest}
    >
      {title}
      <div
        className={`relative w-fit before:absolute before:right-0 before:h-2/5 before:backdrop:blur-md before:bottom-1 before:rounded-sm before:w-4/12 group-hover:before:w-8/12 duration-500 before:duration-500 before:-z-10 ${highlightColor} ${additionalStyles}`}
      >
        {highLightText}
      </div>
      {details ? (
        <p
          className={`text-sm font-normal my-3 w-full ${detailsStyles}`}
        >
          &quot; {details} &quot;
        </p>
      ) : null}
    </h4>
  );
};

export default Heading;
