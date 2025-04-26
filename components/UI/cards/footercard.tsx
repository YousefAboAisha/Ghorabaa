type FooterCardProps = {
  label: string;
  value: string;
  href?: string;
};

const FooterCard = ({ label, value }: FooterCardProps) => {
  return (
    <div className="relative p-2 bg-transparent">
      <div className="flex flex-row gap-6 items-center">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold font-secondary">{label}</h4>
          <span className="font-normal font-secondary">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default FooterCard;
