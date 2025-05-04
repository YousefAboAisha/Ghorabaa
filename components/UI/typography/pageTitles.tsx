import Link from "next/link";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type PageTitlesProps = {
  first_title: string;
  second_title?: {
    title: string;
    href: string;
  };
} & React.HTMLAttributes<HTMLHeadingElement>;

const PageTitles = ({ first_title, second_title }: PageTitlesProps) => {
  const renderTitles = () => {
    if (first_title && second_title) {
      return (
        <>
          <Link
            href={second_title.href}
            className="flex items-center text-gray-500 hover:underline"
          >
            {first_title}
            <MdKeyboardArrowLeft size={20} />
          </Link>

          <p className="mr-1">{second_title.title}</p>
        </>
      );
    }

    if (first_title && !second_title) {
      return <p className="mr-1">{first_title}</p>;
    }
  };

  return (
    <div className="flex items-center mb-2 text-sm">
      {/* First title */}
      <Link
        href={"/"}
        className="flex items-center text-gray-500 hover:underline"
      >
        الرئيسية
        <MdKeyboardArrowLeft size={20} />
      </Link>

      {/* Render Second Titles */}
      {renderTitles()}
    </div>
  );
};

export default PageTitles;
