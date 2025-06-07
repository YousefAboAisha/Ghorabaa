import React from "react";

type StatisticCardProps = {
  label: string;
  color: string;
  data?: {
    today?: number;
    week?: number;
    month?: number;
    total?: number;
  };
};

const StatisticCard = ({ label, color, data }: StatisticCardProps) => {
  console.log("StatisticCard Data: ", data);

  return (
    <div className="relative bg-white rounded-xl flex flex-col items-center justify-center border overflow-hidden">
      <div className="relative flex flex-col justify-center items-center gap-3 p-8">
        <h4 className="text-md font-light">{label}</h4>
        <div
          style={{
            color: color,
          }}
          className="font-extrabold text-4xl"
        >
          <p> {data?.total || 0} </p>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full border-t">
        <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-4 border-l">
          <h2 className="font-light text-[12px] text-center">اليوم</h2>
          <div className="text-xl font-extrabold">
            <p> {data?.today || 0} </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-4 border-l">
          <h2 className="font-light text-[12px] text-center">الأسبوع الأخير</h2>
          <div className="text-xl font-extrabold">
            <p> {data?.week || 0} </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-[13px] h-full w-full p-3">
          <h2 className="font-light text-[12px] text-center">الشهر الأخير</h2>
          <div className="text-xl font-extrabold">
            <p> {data?.month || 0} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
