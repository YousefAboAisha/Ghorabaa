"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import NotificationCard from "../cards/notificationCard";
import Link from "next/link";
import { NotificationTypes } from "@/app/enums";

function NotificationPopper() {
  // const [loading, setLoading] = useState<boolean>(false);
  const loading = false;

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
          className="group cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
          disabled={loading}
        >
          {({ active }) => (
            <div className="flex items-center gap-1">
              <p
                className={`flex items-center justify-center p-3 text-secondary hover:bg-gray_light duration-200 rounded-full ${
                  active && "bg-gray_light"
                }`}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <GrNotification size={17} />
                )}
              </p>
            </div>
          )}
        </MenuButton>

        <MenuItems
          anchor={{ to: "bottom start", gap: "4px" }}
          transition
          className="flex flex-col gap-2 min-w-48 bg-background_light z-[100000] rounded-xl border shadow-2xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 outline-none pb-4 "
        >
          <div className="flex flex-col gap-1 p-1 max-h-[50vh] overflow-y-auto ">
            <MenuItem>
              <Link href={"/notifications"} className="w-full">
                <NotificationCard type={NotificationTypes.ACCEPT} />
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href={"/notifications"} className="w-full">
                <NotificationCard type={NotificationTypes.COMMENT} />
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href={"/notifications"} className="w-full">
                <NotificationCard type={NotificationTypes.BAN} />
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href={"/notifications"} className="w-full">
                <NotificationCard type={NotificationTypes.ACCEPT} />
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                href={"/notifications"}
                className="flex items-center gap-2 text-primary text-[11px] hover:underline cursor-pointer font-bold mt-2 w-fit mx-auto"
              >
                <p> كافة الإشعارات </p>
                <GrNotification size={12} className="rotate-[30deg]" />
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
}

export default NotificationPopper;
