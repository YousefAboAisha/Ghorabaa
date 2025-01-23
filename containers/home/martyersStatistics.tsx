import MartyersStatisticCard from "@/components/UI/cards/martyersStatisticCard";
import Heading from "@/components/UI/typography/heading";
import { MartyersStatisticsData } from "@/data/martyersStatisticsData";

const MartyersStatistics = () => {
  return (
    <div className="mt-24 ">
      <div className="container mt-24 mb-24 py-10">
        <Heading
          title=""
          highLightText="شهداؤنا ليسوا أرقاماً"
          className="w-fit mx-auto text-center"
          additionalStyles="mx-auto"
          details="وَلاَ تَحْسَبَنَّ الَّذِينَ قُتِلُواْ فِي سَبِيلِ اللّهِ أَمْوَاتًا بَلْ أَحْيَاء عِندَ رَبِّهِمْ يُرْزَقُون"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {MartyersStatisticsData.map(({ label, number, color }, index) => {
            return (
              <MartyersStatisticCard
                key={index}
                label={label}
                number={number}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MartyersStatistics;
