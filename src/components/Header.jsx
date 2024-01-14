import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import LogoutButton from "./buttons/LogoutButton";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-4xl px-6 mx-auto flex justify-between ">
        <div className="flex gap-6 items-center">
          <Link href={"/"}>LinkTree</Link>
          <nav className="flex gap-4 text-slate-500 text-sm items-center">
            <Link href={"/about"}>About</Link>
            <Link href={"/pricing"}>Pricing</Link>
            <Link href={"/contact"}>Contact</Link>
          </nav>
        </div>

        <nav className="flex gap-4 items-center text-sm text-slate-500">
          {!!session && (
            <>
              <Link href={"/account"}>Hello, {session?.user?.name}</Link>
              <LogoutButton />
            </>
          )}
          {!session && (
            <>
              <Link href={"/login"}>Sign In</Link>
              <Link href={"/login"}>Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
