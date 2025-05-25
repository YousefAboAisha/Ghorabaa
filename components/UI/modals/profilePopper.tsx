"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { CiCirclePlus, CiLogout, CiUser } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { Session } from "next-auth";

type ProfilePopperProps = {
  session: Session | null;
};

function ProfilePopper({ session }: ProfilePopperProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const profileImage = session?.user?.image || "/notFound.png"; // Fallback image

  const handleGoogleSignout = async () => {
    setLoading(true);

    try {
      await signOut();
      setLoading(false); // fallback if signIn fails
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoading(false);
    }
  };

  return (
    <>
  

      <Menu as={"div"}>
        <MenuButton
          as={"button"}
          className="group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80 ml-1"
          disabled={loading}
        >
          {() => (
            <div className="flex items-center gap-1">
              <p className="flex items-center justify-center w-11 h-11 text-secondary border rounded-full">
                {loading ? (
                  <AiOutlineLoading3Quarters
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Image
                    src={profileImage}
                    width={100}
                    height={100}
                    alt="صورة الملف الشخصي"
                    className="rounded-full"
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
          className="flex flex-col gap-2 w-48 bg-white z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
        >
          <MenuItem disabled as={"div"} className="overflow-hidden">
            <p className="flex items-center gap-2 p-4 bg-gray_light text-[13px] truncate whitespace-nowrap overflow-hidden text-ellipsis w-full">
              {session?.user?.name}
            </p>
          </MenuItem>

          <div className="p-1 flex flex-col gap-2">
            <MenuItem>
              <Link
                href={"/addStory"}
                className="flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 text-[13px] rounded-lg"
                prefetch
              >
                <CiCirclePlus size={20} />
                <span>قصة جديدة</span>
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href={`/profile`}
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
                className="flex items-center gap-2 p-3 cursor-pointer text-[13px] rounded-lg bg-[red] text-white"
              >
                <CiLogout size={20} />
                <p>تسجيل الخروج</p>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default ProfilePopper;
