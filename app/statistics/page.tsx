import Hero from "@/components/layout/hero";
import Categories from "@/containers/statistics/categories";
import { Metadata } from "next";
import { StatisticsMetadata } from "../lib/metadata";

export const metadata: Metadata = StatisticsMetadata;

const Statistics = () => {
  return (
    <div className="container min-h-screen mt-24">
      <Hero pattern="bg-statistics-pattern" className="bg-top" />
      <Categories />
    </div>
  );
};

export default Statistics;
