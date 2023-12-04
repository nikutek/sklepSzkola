import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useShoppingCart } from "~/store/cartCtx";
import { type productType } from "../admin/productList";

interface cartItem {
  item: productType;
  quantity: number;
}

function Cart() {
  const { cartItems, decreaseCartQuantity, getItemQuantity, removeFromCart } =
    useShoppingCart();

  console.log(cartItems);

  return <div className="w-full"></div>;
}

export default Cart;
