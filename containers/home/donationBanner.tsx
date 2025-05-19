import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import { BiDonateHeart } from "react-icons/bi";

const AddStoryBanner = () => {
  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-10 bg-secondary text-white rounded-xl overflow-hidden p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 mt-4">
          <Heading
            title="اترك سهماً نافعاً"
            details="الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
            className="!w-fit"
            highlightColor="before:bg-primary"
          />

          <p className="text-sm font-light mt-2">
            في غزة، لا تزال الأرواح تنبض رغم الألم، ولا تزال العزائم صامدة رغم
            الدمار. هناك، تحت الركام، يعيش الأمل ويتمسك الناس بالحياة كما يتمسك
            الغريق بطوق النجاة. هناك أم تبكي بحرقة فقدان، وطفل يبحث عن أمان،
            وعائلة تنتظر لقمة تسد الجوع أو دواء يخفف الألم. أهل غزة لا يبحثون عن
            رفاهية، بل عن كرامة العيش، عن سقف يأويهم، عن ماء نقي، عن دواء، عن
            لحظة سلام، وعن فرصة للنجاة من وجع بات يوميًا. إنهم بحاجة إلينا،
            بحاجة إلى وقفة صادقة تترجم الشعور إلى فعل، والرحمة إلى دعم حقيقي.
            تبرعك اليوم ليس مجرد مبلغ يُرسل، بل هو حياة تُمنح، وكرامة تُسترد،
            وأمل يُبنى من جديد. حين تمتد يدك بالعطاء، فأنت تشارك في صناعة
            الفارق، في ترميم جرح، في دعم صمود شعب لا يزال يقف رغم كل ما واجهه من
            نكبات. لا تنتظر حتى تهدأ العاصفة، فهم يعيشون داخلها يوميًا. كن أنت
            اليد التي ترفع، والقلب الذي يشعر، والضمير الذي لا يسكت. غزة تناديك،
            وفلسطين تستحق. تبرعك اليوم يمكن أن يكون بداية لحياة جديدة، وأنت قادر
            على أن تكون النور وسط كل هذا الظلام.
          </p>
        </div>

        <Link
          href={`/donationCampaigns`}
          className="mt-6 lg:w-4/12 md:6/12 w-5/12"
        >
          <Button
            title="حملات التبرع"
            className="w-full bg-primary text-white text-sm"
            icon={
              <BiDonateHeart
                style={{
                  transform: "scale(-1,1)",
                }}
                size={18}
                className="scale-[-1,1]"
              />
            }
            hasShiningBar={false}
          />
        </Link>
      </div>

      <Image
        src={"/donation.png"}
        width={500}
        height={500}
        alt="صورة شهيد اليوم"
        className="shadow-xl rounded-xl self-center"
      />
    </div>
  );
};

export default AddStoryBanner;
