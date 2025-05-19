"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { CiCirclePlus, CiEdit, CiLogout, CiUser } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SessionProps } from "@/app/interfaces";
import Image from "next/image";

function ProfilePopper({ session }: SessionProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const profileImage = session?.image || "/notFound.png"; // Fallback image

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
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // Right-to-left for Arabic
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
          className="flex flex-col gap-2 min-w-48 bg-white z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none"
        >
          <MenuItem disabled>
            <span className="flex items-center gap-2 p-4 bg-gray_light text-[13px]">
              {session?.email}
            </span>
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
              <Link
                href={"/editProfile"}
                className="flex items-center gap-2 p-3 hover:bg-gray_light cursor-pointer duration-100 text-[13px] rounded-lg"
              >
                <CiEdit size={20} />
                <span>إعدادات الحساب</span>
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
