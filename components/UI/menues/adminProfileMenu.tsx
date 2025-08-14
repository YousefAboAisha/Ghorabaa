"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { CiLogout, CiUser, CiViewTimeline } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { Session } from "next-auth";
import { toast } from "react-toastify";

type Props = {
  session: Session | null;
};

function AdminProfileMenu({ session }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const profileImage = session?.user?.image || "/notFound.png"; // Fallback image
  const user_id = session?.user.id;

  const handleGoogleSignout = async () => {
    setLoading(true);

    try {
      await signOut({
        redirect: false,
      });

      setTimeout(() => {
        toast.success("تم تسجيل الخروج بنجاح");
        window.location.href = "/";
      }, 1000);

      setLoading(false); // fallback if signIn fails
    } catch (error: unknown) {
      console.error("Google sign-in failed:", error);
      if (error && typeof error === "object" && "message" in error) {
        toast.error((error as { message: string }).message);
      } else {
        toast.error("حدث خطأ أثناء تسجيل الخروج");
      }
      setLoading(false);
    }
  };

  return (
    <Menu as={"div"}>
      <MenuButton
        as={"button"}
        className="group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
        disabled={loading}
      >
        {() => (
          <div className="flex items-center gap-1">
            <p className="relative flex items-center justify-center w-10 h-10 text-secondary border rounded-full">
              {loading ? (
                <AiOutlineLoading3Quarters size={17} className="animate-spin" />
              ) : (
                <Image
                  src={profileImage}
                  fill
                  alt="صورة الملف الشخصي"
                  className="rounded-full w-full h-full"
                  priority
                />
              )}
            </p>
          </div>
        )}
      </MenuButton>

      <MenuItems
        anchor={{ to: "bottom start", gap: "4px" }}
        transition
        className="flex flex-col w-48 bg-white z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
      >
        <div className="p-1 flex flex-col gap-2">
          <MenuItem>
            <Link
              href={`/`}
              className="flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 text-[13px] rounded-lg"
              prefetch
              target="_blank"
            >
              <CiViewTimeline size={20} />
              <span>زيارة المنصة</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href={`/profile/${user_id}`}
              className="flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 text-[13px] rounded-lg"
              prefetch
            >
              <CiUser size={20} />
              <span>الملف الشخصي</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <div
              onClick={handleGoogleSignout} // Add onClick handler for logout
              className="flex items-center gap-2 p-3 cursor-pointer text-[13px] rounded-lg bg-rejected text-white"
            >
              <CiLogout size={20} />
              <p>تسجيل الخروج</p>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

export default AdminProfileMenu;
