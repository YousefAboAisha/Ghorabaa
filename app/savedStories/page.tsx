import FavoriteCard from "@/components/UI/cards/favoriteCard";
import Heading from "@/components/UI/typography/heading";
import PageTitles from "@/components/UI/typography/pageTitles";

const Page = () => {
  return (
    <div className="container mt-24">
      <div className="w-full md:container">
        <PageTitles />

        <div className="relative w-full mt-12">
          <div className="flex items-center justify-between">
            <Heading title="" highLightText="القصص المحفوظة" className="" />

            <div className="flex items-center gap-2 min-w-fit bg-white p-2 border rounded-xl text-sm h-[52px] px-4">
              <h2>عدد القصص: </h2>
              <h2>{13}</h2>
            </div>
          </div>

          <div className="cards-grid-3 ap-2 pb-4 mt-6">
            <FavoriteCard />
            <FavoriteCard />
            <FavoriteCard />
            <FavoriteCard />
            <FavoriteCard />
            <FavoriteCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
