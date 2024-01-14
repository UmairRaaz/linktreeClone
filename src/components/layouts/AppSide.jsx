'use client'
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import LogoutButton from "../buttons/LogoutButton";
import { usePathname } from "next/navigation";
const AppSide = () => {
    const path = usePathname()
  return (
    <nav className="inline-flex flex-col text-center mt-12 gap-6 text-gray-500">
      <Link href={"/account"} 
      className={"flex items-center gap-4" + (path === "/account" ? " text-blue-500 font-bold" : "")}>

        <FaFileAlt size={20} />
        <span>My Page</span>
      </Link>
      <Link href={"/analytics"} className={"flex items-center gap-4" + (path === "/analytics" ? " text-blue-500 font-bold" : "")}>
        <FaChartLine size={20} />
        <span>Analytics</span>
      </Link>
      <LogoutButton className="flex items-center gap-4 flex-row-reverse justify-between text-gray-500 w-[90px]" />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-gray-500 border-t pt-4"
      >
        <FaArrowLeft size={14} />
        <span className="text-sm">Back to website</span>
      </Link>
    </nav>
  );
};

export default AppSide;
