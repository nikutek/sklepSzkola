import { Button } from "components/ui/button";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { status } = useSession();
  const logoutHandler = async () => {
    await signOut();
  };
  return (
    <Fragment>
      <div
        onClick={() => {
          setMenuVisible((prev) => !prev);
        }}
        className={`fixed ${
          menuVisible ? "left-[260px] " : "left-[10px] "
        } top-[10px] w-[20px] transition-all`}
      >
        X
      </div>
      <header
        className={` ${
          menuVisible ? "left-0" : "-left-[250px]"
        } fixed  top-0 z-10 h-[100vh] w-[250px] rounded-r-lg bg-black px-2 py-3 text-white transition-all  md:sticky md:left-0 md:flex md:h-[10vh]  md:w-full md:flex-row md:items-center md:justify-between md:rounded-none md:px-10 md:text-xl`}
      >
        <h1 className=" mb-10 text-center text-4xl md:mb-0 md:text-5xl">
          Shop
        </h1>
        <div className="flex h-[85vh] flex-col justify-between md:h-auto md:w-3/4 md:flex-row md:items-center">
          <nav className="flex md:w-3/4 md:flex-row md:items-center md:justify-center">
            <ul className="flex w-full flex-col md:flex-row md:items-center md:justify-center">
              {status === "authenticated" && (
                <li className=" my-4 rounded-lg border-b-4 bg-slate-100 p-2  text-center text-xl text-black transition-all hover:border-4 hover:bg-black hover:text-white md:mx-6 md:rounded-none md:border-0 md:bg-black md:text-white md:hover:border-x-0 md:hover:border-b-2 md:hover:border-t-0">
                  <Link className="pointer " href={"/profile"}>
                    Profile
                  </Link>
                </li>
              )}
              <li className="my-4 rounded-lg border-b-4 bg-slate-100 p-2  text-center text-xl text-black transition-all hover:border-4 hover:bg-black hover:text-white md:mx-6 md:rounded-none md:border-0 md:bg-black md:text-white md:hover:border-x-0 md:hover:border-b-2 md:hover:border-t-0">
                <Link href={"#"}>Menu 2 </Link>
              </li>
              <li className=" my-4 rounded-lg border-b-4 bg-slate-100 p-2  text-center text-xl text-black transition-all hover:border-4 hover:bg-black hover:text-white md:mx-6 md:rounded-none md:border-0 md:bg-black md:text-white md:hover:border-x-0 md:hover:border-b-2 md:hover:border-t-0">
                <Link href={"#"}>Menu 3</Link>
              </li>
            </ul>
          </nav>
          {status === "authenticated" && (
            <Button
              onClick={logoutHandler}
              className="md:p-6"
              variant="secondary"
            >
              Wyloguj się
            </Button>
          )}
          {status === "unauthenticated" && (
            <Button
              onClick={logoutHandler}
              className="md:p-6"
              variant="secondary"
            >
              <Link href={"/auth/signin"}>Zaloguj się</Link>
            </Button>
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
