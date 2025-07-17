import { useEffect, useState } from "react";
import Input from "../inputs/input";
import { MassacreInterface } from "@/app/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import Image from "next/image";
import Link from "next/link";
import { HighlightedText } from "../typography/highlightText";
import { GrLocation } from "react-icons/gr";

const MassacreSearch = () => {
  const [massacres, setMassacres] = useState<MassacreInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 1) {
        const fetchMassacresByQuery = async () => {
          setLoading(true);
          setError(null);

          try {
            const res = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_BASE_URL
              }/admin/massacres/search?query=${encodeURIComponent(
                searchQuery
              )}`,
              {
                credentials: "include",
              }
            );

            if (!res.ok) {
              let errorMsg = "حدث خطأ أثناء جلب البيانات";
              try {
                const errorResponse = await res.json();
                errorMsg = errorResponse?.error || errorMsg;
              } catch {
                errorMsg = res.statusText || errorMsg;
              }

              throw new Error(errorMsg);
            }

            const { data } = await res.json();
            setMassacres(data);
            console.log("massacres Search data", data);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            console.error("This is error: ", message);
            setError(message);
          } finally {
            setLoading(false);
          }
        };

        fetchMassacresByQuery();
      } else {
        setMassacres([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderContent = () => {
    if (loading)
      return (
        <p className="abs-center text-sm font-normal">
          جارٍ البحث عن المجزرة...
        </p>
      );

    if (error)
      return <ErrorMessage error={error as string} className="border-none" />;

    if (massacres?.length <= 0) {
      return (
        <NoDataMessage message="لا توجد نتائج للبحث" className="border-none" />
      );
    }

    if (massacres?.length > 0) {
      return (
        <div className="cards-grid-2 p-4">
          {massacres.map((massacre: MassacreInterface, index) => (
            <Link
              href={`/massacres/${massacre._id}`}
              key={index}
              className="p-4 flex items-center gap-3 bg-background_light border rounded-md hover:shadow-sm duration-150"
              target="_blank"
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden">
                <Image
                  src={massacre.cover_image || "/notFound.png"}
                  alt={massacre.title}
                  fill
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[13px] font-normal">
                  <HighlightedText
                    highlights={massacre?.highlight}
                    field="title"
                    fallback={massacre?.title ?? ""}
                  />
                </h2>

                <div className="flex items-center gap-2 text-primary font-semibold text-[10px]">
                  <GrLocation size={13} className="" />
                  <div className="flex items-center gap-1 ">
                    <p>{massacre.location.city}</p>
                    {" - "}
                    <p>{massacre.location.neighborhood}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <h2 className="text-center text-xl font-semibold">البحث عن مجزرة</h2>

      <div className="mt-8">
        <div className="flex flex-col justify-between w-full">
          <Input
            autoFocus
            placeholder="قم بكتابة عنوان المجزرة..."
            className="w-full border focus:border-secondary"
            type="text"
            icon={
              loading ? (
                <AiOutlineLoading3Quarters size={17} className="animate-spin" />
              ) : (
                <BiSearch size={20} />
              )
            }
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          {massacres?.length > 0 && (
            <div className="text-[11px] font-light mt-2">
              تم العثور على{" "}
              <p className="font-bold inline">{massacres.length}</p> من نتائج
              البحث
            </div>
          )}
        </div>

        <div className="relative mt-6 min-h-[50vh] border rounded-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MassacreSearch;
