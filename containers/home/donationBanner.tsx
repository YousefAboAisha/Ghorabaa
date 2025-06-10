import Button from "@/components/UI/inputs/button";
import Heading from "@/components/UI/typography/heading";
import Image from "next/image";
import Link from "next/link";
import { BiDonateHeart } from "react-icons/bi";

const AddStoryBanner = () => {
  return (
    <div className="section grid grid-cols-1 lg:grid-cols-2 gap-10 bg-secondary text-white rounded-xl overflow-hidden p-8">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2 mt-4 ">
          <Heading
            title="اترك سهماً نافعاً لا يُنسى"
            details="الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
            className="!w-fit"
            highlightColor="before:bg-primary"
          />

          <p className="text- font-light mt-2">
            في غزة، تنبت الكرامة من تحت الركام، وتُزهِر الأرواح رغم الرماد.
            هناك، لا تزال الجراح مفتوحة، لكنّ الصبر يُكفكفها، والإيمان يُضمدها.
            أمٌّ ثكلى لا تجد إلا الدعاء سندًا، وطفل يتيم يفتّش في وجوه المارّة
            عن حنانٍ مفقود، وأسرة تتوسّد الأمل في ليلٍ بلا كهرباء ولا دواء.
            ليسوا بحاجة إلى شفقة، بل إلى كرامة تُصان، ويد تُنقذ، ورحمة تُترجم
            إلى فعل. تبرعك ليس رقماً، بل ضوء في نفق، وماء في قحط، ودواء يُرجئ
            أنينًا لا يُطاق. هو شهادة حياةٍ تُمنح في زمن تُسلب فيه الأرواح،
            وصرخة ضمير لا تخبو في عالمٍ اعتاد الصمت. يا صاحب القلب الحي، تبرعك
            ليس مجرد مبلغ يُرسل، بل هو روح تُنعش، وكرامة تُستعاد، وجسرٌ بينك
            وبين السماء. غزة لا تحتمل التأجيل… والفرج قد يبدأ منك.
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
        className="shadow-xl rounded-xl self-center w-full"
      />
    </div>
  );
};

export default AddStoryBanner;
