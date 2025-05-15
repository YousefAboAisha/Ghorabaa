import Heading from "@/components/UI/typography/heading";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import ImagesSwiper from "@/components/UI/imagesSwiper";

const RecentlyAddedMartyrs = async () => {
  const fetchRecentlyAddedMartyrs = async () => {
    const res = await fetch(`http://localhost:3000/api/story/recentlyAdded`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  const { data } = await fetchRecentlyAddedMartyrs();

  console.log("recentlyAdded data", data);

  return (
    <div className="mt-24">
      <Heading
        highLightText="قصص مضافة حديثاً"
        highlightColor="before:bg-primary"
        title=""
        details="فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ وَيَسْتَبْشِرُونَ بِالَّذِينَ لَمْ يَلْحَقُوا بِهِم مِّنْ خَلْفِهِمْ أَلَّا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
        className="w-fit"
      />

      <ImagesSwiper data={data} />

      <Link
        href={"/martyrs"}
        className="text-primary flex items-center gap-2 justify-center mt-6 hover:underline text-sm w-fit mx-auto"
      >
        <p>عرض المزيد</p>
        <BsArrowLeft />
      </Link>
    </div>
  );
};

export default RecentlyAddedMartyrs;
