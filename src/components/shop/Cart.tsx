import React from "react";
import Image from "next/image";
import { useShoppingCart } from "~/store/cartCtx";
import Link from "next/link";

function Cart() {
  const {
    cartItems,
    decreaseCartQuantity,
    removeFromCart,
    increaseCartQuantity,
  } = useShoppingCart();

  return (
    <div className="w-full">
      {cartItems.map((item) => {
        return (
          <div
            key={item.product.product_id}
            className=" flex flex-row border-b-2 border-t-2 p-2"
          >
            <Image
              src={item.product.mainImage}
              width={70}
              height={70}
              alt="image"
            ></Image>
            <div className="flex flex-grow flex-col items-center justify-center text-center">
              <p>{item.product.name}</p>
              <p className="flex  flex-row gap-2">
                <button
                  className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-slate-500  text-xl font-bold text-slate-700 transition hover:bg-red-300"
                  onClick={() => {
                    decreaseCartQuantity(item.product.product_id);
                  }}
                >
                  -
                </button>
                {item.quantity} szt{" "}
                <button
                  className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-slate-500  text-xl font-bold text-slate-700 transition hover:bg-green-300"
                  onClick={() => {
                    increaseCartQuantity(item.product);
                  }}
                >
                  +
                </button>
              </p>
            </div>

            <div className=" flex flex-col justify-center gap-1">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-slate-500  text-3xl font-bold text-slate-700 transition hover:bg-red-300"
                onClick={() => {
                  removeFromCart(item.product.product_id);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center justify-center">
        <Link href={"/order"} className="w-full text-center">
          <button className=" w-3/4 rounded border-4 border-black p-2 text-center font-bold text-black shadow-xl transition hover:bg-black hover:text-white ">
            Złóż zamówienie
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
