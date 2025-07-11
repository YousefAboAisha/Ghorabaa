import Link from "next/link";
import { BsCalendar } from "react-icons/bs";
import { BiMapPin } from "react-icons/bi";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  date: string;
  location: { city: string; neighborhood?: string };
  deathToll: { total: number };
  media?: { url: string; type: "image" | "video" }[];
}

export default function MassacreCard({
  id,
  title,
  date,
  location,
  deathToll,
  media,
}: Props) {
  return (
    <Link
      href={`/massacres/${id}`}
      className="rounded-2xl shadow-md hover:shadow-lg transition bg-white overflow-hidden border border-gray-200"
    >
      <div className="h-48 w-full overflow-hidden">
        <Image
          src={media?.[0]?.url || "/notFound.png"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-red-600">{title}</h2>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <BsCalendar className="w-4 h-4" />
          {new Date(date).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <BiMapPin className="w-4 h-4" />
          {location.city}
          {location.neighborhood ? ` - ${location.neighborhood}` : ""}
        </div>
        <div className="text-sm text-gray-700">
          الشهداء:{" "}
          <span className="font-semibold text-red-700">{deathToll.total}</span>
        </div>
      </div>
    </Link>
  );
}
