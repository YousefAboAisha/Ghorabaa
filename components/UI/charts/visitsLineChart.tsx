"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  date: string;
  visits: number;
}

interface Props {
  data: DataPoint[];
}

export default function VisitsLineChart({ data }: Props) {
  return (
    <div className="relative flex items-center justify-center h-[350px] bg-white p-4 border rounded-md">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5B913B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#5B913B" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" tick={{ fontSize: 10 }} tickMargin={15} />

          <YAxis tick={{ fontSize: 10 }} tickMargin={12} />

          <Tooltip
            labelFormatter={(value) => `الشهر: ${value}`}
            formatter={(value) => [`${value}`, "الزيارات"]}
            labelStyle={{
              fontSize: "11px",
            }}
            itemStyle={{
              fontSize: "12px",
            }}
          />

          <Legend verticalAlign="top" iconType="circle" />

          <Area
            type="monotone"
            dataKey="visits"
            stroke="#5B913B"
            fill="url(#colorVisits)"
            strokeWidth={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
