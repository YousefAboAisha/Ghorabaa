import Logo from "@/components/UI/logo";

type SpinnerProps = {
  additionalStyles?: string;
};

const Spinner = ({ additionalStyles }: SpinnerProps) => {
  return (
    <div
      role="status"
      className={`abs-center fixed w-screen h-screen  z-[100000] bg-[white] ${additionalStyles}`}
    >
      <Logo className="animate-pulse text-lg abs-center" />
    </div>
  );
};

export default Spinner;
