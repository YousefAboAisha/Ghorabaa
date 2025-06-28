import { useEffect, useState } from "react";
import Input from "../inputs/input";
import { UserInterface } from "@/app/interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import ErrorMessage from "@/components/responseMessages/errorMessage";
import NoDataMessage from "@/components/responseMessages/noDataMessage";
import Image from "next/image";
import Link from "next/link";
import { HighlightedText } from "../typography/highlightText";

const UserSearch = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 1) {
        const fetchUsersByQuery = async () => {
          setLoading(true);
          setError(null);

          try {
            const res = await fetch(
              `${
                process.env.NEXT_PUBLIC_API_BASE_URL
              }/admin/users/search?query=${encodeURIComponent(searchQuery)}`,
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
            setUsers(data);
            console.log("Users Search data", data);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "حدث خطأ غير متوقع";
            console.error("This is error: ", message);
            setError(message);
          } finally {
            setLoading(false);
          }
        };

        fetchUsersByQuery();
      } else {
        setUsers([]);
      }
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderContent = () => {
    if (loading)
      return (
        <p className="abs-center text-sm font-normal">
          جارٍ البحث عن المستخدم...
        </p>
      );

    if (error)
      return <ErrorMessage error={error as string} className="border-none" />;

    if (users?.length <= 0) {
      return (
        <NoDataMessage message="لا توجد نتائج للبحث" className="border-none" />
      );
    }

    if (users?.length > 0) {
      return (
        <div className="cards-grid-2 p-4">
          {users.map((user: UserInterface, index) => (
            <Link
              href={`/profile/${user._id}`}
              key={index}
              className="p-4 flex items-center gap-3 bg-background_light border rounded-md hover:shadow-sm duration-150"
              target="_blank"
            >
              <Image
                src={user.image || "/notFound.png"}
                alt={user.name}
                width={40}
                height={40}
                className="rounded"
              />

              <div className="flex flex-col gap-2">
                <h2 className="text-[13px] font-normal">
                  <HighlightedText
                    highlights={user?.highlight}
                    field="name"
                    fallback={user?.name ?? ""}
                  />
                </h2>

                <p className="text-[12px] text-gray_dark">
                  <HighlightedText
                    highlights={user?.highlight}
                    field="email"
                    fallback={user?.email ?? ""}
                  />
                </p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col bg-white p-8">
      <h2 className="text-center text-xl font-semibold">البحث عن مستخدم</h2>

      <div className="mt-8">
        <div className="flex flex-col justify-between w-full">
          <Input
            autoFocus
            placeholder="قم بكتابة اسم المستخدم..."
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

          {users?.length > 0 && (
            <div className="text-[11px] font-light mt-2">
              تم العثور على <p className="font-bold inline">{users.length}</p>{" "}
              من نتائج البحث
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

export default UserSearch;
