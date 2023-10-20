import React from "react";
import Link from "next/link";
import { Card } from "components/ui/card";
const AdminMenu = (props: { activeSite: string }) => {
  return (
    <Card className="flex min-h-[60%] w-full items-center justify-center">
      <nav className="flex w-full items-center justify-center">
        <ul className="flex w-full flex-row  flex-wrap items-center justify-around md:flex-col md:flex-nowrap ">
          <li
            className={`${
              props.activeSite === "/admin" && "bg-black text-white"
            } pointer  my-2 w-[40%] border-2 border-black px-3 py-3 text-center text-sm md:mx-0  md:w-[90%] md:border-l-2 md:border-t-2 md:px-5  md:text-lg`}
          >
            <Link className="block w-full" href={`/admin`}>
              Produkty
            </Link>
          </li>
          <li
            className={`${
              props.activeSite === "/orders" && "bg-black text-white"
            } pointer  my-2 w-[40%] border-2 border-black px-3 py-3 text-center text-sm md:mx-0  md:w-[90%] md:border-l-2 md:border-t-2 md:px-5  md:text-lg`}
          >
            <Link className="block w-full" href={`/admin/orders`}>
              Zamówienia
            </Link>
          </li>
          <li
            className={`${
              props.activeSite === "/workers" && "bg-black text-white"
            } pointer  my-2 w-[40%] border-2 border-black px-3 py-3 text-center text-sm md:mx-0  md:w-[90%] md:border-l-2 md:border-t-2 md:px-5  md:text-lg`}
          >
            <Link className="block w-full" href={`/admin/workers`}>
              Pracownicy
            </Link>
          </li>
          <li
            className={`${
              props.activeSite === "/categories" && "bg-black text-white "
            }pointer  my-2 w-[40%] border-2 border-black px-3 py-3 text-center text-sm md:mx-0  md:w-[90%] md:border-l-2 md:border-t-2 md:px-5  md:text-lg`}
          >
            <Link className={`block w-full`} href={`/admin/categories`}>
              Kategorie
            </Link>
          </li>
        </ul>
      </nav>
    </Card>
  );
};
export default AdminMenu;
