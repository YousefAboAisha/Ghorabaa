import { ActiveUserInterface } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";

const ActiveUserCard = ({
  user_id,
  name,
  email,
  image,
  stories,
  comments,
  total,
}: ActiveUserInterface) => {
  return (
    <div
      key={user_id}
      className="relative bg-white md:bg-background_light border rounded-md hover:shadow-sm duration-150"
      style={{
        direction: "rtl", // Ensure the card content is displayed in RTL
      }}
    >
      <div className="absolute top-3 right-3 bg-white shadow-md border flex items-center justify-center rounded-md p-1.5 text-[13px] font-semibold ">
        #{total}
      </div>

      <div className="flex flex-col w-fit items-center gap-2 p-8 mx-auto">
        <Image
          alt="صورة المستخدم"
          src={image || "/notFound.png"}
          width={90}
          height={90}
          className="rounded-full object-cover border shadow-md"
        />

        <div className="flex flex-col flex-wrap gap-1 items-center justify-center text-center">
          <Link
            href={`/profile/${user_id}`}
            target="_blank"
            className="text-sm font-semibold hover:underline"
          >
            {name || "مستخدم غير معروف"}
          </Link>
          <p className="font-light text-sm break-words">{email}</p>
        </div>
      </div>

      <div className="flex items-center border-t">
        <div className="flex flex-col justify-center items-center gap-1 w-full h-full p-8 border-l">
          <h4 className="text-md font-light">القصص</h4>
          <p className="text-lg font-bold">{stories}</p>
        </div>

        <div className="flex flex-col justify-center items-center gap-1 w-full h-full p-8">
          <h4 className="text-md font-light">التعليقات</h4>
          <p className="text-lg font-bold">{comments}</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveUserCard;
