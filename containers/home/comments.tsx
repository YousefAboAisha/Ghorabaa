import CommentCard from "@/components/UI/cards/commentCard";
import Heading from "@/components/UI/typography/heading";
import { CommentsData } from "@/data/commentsData";

const Comments = () => {
  return (
    <div className="mt-24 mb-32">
      <Heading
        title=""
        highLightText="في ذكرى الشهداء"
        highlightColor="before:bg-primary"
        details="وَالَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ فَلَن يُضِلَّ أَعْمَالَهُمْ* سَيَهْدِيهِمْ وَيُصْلِحُ بَالَهُمْ* وَيُدْخِلُهُمُ الْجَنَّةَ عَرَّفَهَا لَهُمْ"
        className="w-fit"
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-8">
        {CommentsData.map(
          ({ profileImage, reviewText, reviewerName, profession }, index) => {
            return (
              <CommentCard
                key={index}
                profileImage={profileImage}
                reviewText={reviewText}
                reviewerName={reviewerName}
                profession={profession}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Comments;
