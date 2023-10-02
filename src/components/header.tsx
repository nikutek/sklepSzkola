import { Button } from "components/ui/button";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const { status } = useSession();
  const logoutHandler = async () => {
    await signOut();
  };
  return (
    <header className="fixed left-0 top-0 flex h-24 w-full flex-row  items-center justify-between bg-black px-20 py-3 text-white sm:text-xl">
      <h1 className="text-5xl">Shop</h1>
      <div className="flex w-1/2">
        <nav className="flex w-3/4  flex-row items-center justify-center">
          <ul className="flex  flex-row items-center justify-center">
            {status === "authenticated" && (
              <li className="mx-6 border-b-0 hover:border-b-2">
                <Link className="pointer " href={"/profile"}>
                  Profile
                </Link>
              </li>
            )}
            <li className="mx-6 border-b-0 hover:border-b-2">
              <Link href={"#"}>Menu 2 </Link>
            </li>
            <li className="mx-6 border-b-0 hover:border-b-2">
              <Link href={"#"}>Menu 3</Link>
            </li>
          </ul>
        </nav>
        {status === "authenticated" && (
          <Button
            onClick={logoutHandler}
            className="sm:p-6"
            variant="secondary"
          >
            Wyloguj się
          </Button>
        )}
        {status === "unauthenticated" && (
          <Link className="rounded-lg p-3 hover:border-2" href={"/auth/signin"}>
            Zaloguj się
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
