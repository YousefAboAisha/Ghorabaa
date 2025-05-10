import Logo from "@/components/UI/logo";

type SpinnerProps = {
  additionalStyles?: string;
};

const Spinner = ({ additionalStyles }: SpinnerProps) => {
  return (
    <div role="status" className={`abs-center fixed z-50 ${additionalStyles}`}>
      <Logo className="animate-pulse text-lg" />
    </div>
  );
};

export default Spinner;
