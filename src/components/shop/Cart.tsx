import React from "react";
import Image from "next/image";
import { useShoppingCart } from "~/store/cartCtx";
import { redirect } from "next/navigation";

function Cart() {
  const {
    cartItems,
    decreaseCartQuantity,
    removeFromCart,
    increaseCartQuantity,
  } = useShoppingCart();

  const placeOrderHandler = () => {
    redirect("/order");
  };

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

            <div className=" flex flex-col items-end justify-center  gap-1 text-center">
              <button
                className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-slate-500  text-xl font-bold text-slate-700 transition hover:bg-red-300"
                onClick={() => {
                  removeFromCart(item.product.product_id);
                }}
              >
                x
              </button>
              <p>
                {Math.round(item.product.price * item.quantity * 100) / 100} zł
              </p>
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center justify-center">
        <button
          className=" w-3/4 rounded border-4 border-black p-2 text-center font-bold text-black shadow-xl transition hover:bg-black hover:text-white "
          onClick={placeOrderHandler}
        >
          Złóż zamówienie
        </button>
      </div>
    </div>
  );
}

export default Cart;
