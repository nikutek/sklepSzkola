import React, { useEffect, useState } from "react";
import Image from "next/image";

function Cart() {
  const DUMMY_ITEMS = [
    {
      product_id: 1,
      name: "test1",
      price: 1,
      quantity: 1,
      description: "1",
      isDigital: false,
      mainImage: "https://ik.imagekit.io/szkolaaaa/udayo_33WXEBxoJ",
      images: [
        {
          image_id: 20,
          source: "https://ik.imagekit.io/szkolaaaa/tc5fj_VE9Tollrf",
          product_id: 1,
        },
        {
          image_id: 21,
          source: "https://ik.imagekit.io/szkolaaaa/uyqv6_MUfspaASn",
          product_id: 1,
        },
      ],
      categories: [],
    },
    {
      product_id: 21,
      name: "Obraz",
      price: 2345,
      quantity: 23,
      description:
        "afsdfsadfasdafsdfsadfasdafsdfsadfasdafsdfsadfasdafsdfsadfasd",
      isDigital: false,
      mainImage: "https://ik.imagekit.io/szkolaaaa/gozc2_nB4hOWE1j",
      images: [
        {
          image_id: 97,
          source: "https://ik.imagekit.io/szkolaaaa/8a5ag_3yAnt8fp7",
          product_id: 21,
        },
        {
          image_id: 98,
          source: "https://ik.imagekit.io/szkolaaaa/tmtxy_VlD6rwoHV",
          product_id: 21,
        },
      ],
      categories: [],
    },
    {
      product_id: 22,
      name: "Testowy",
      price: 34,
      quantity: 2,
      description:
        "sadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdf",
      isDigital: false,
      mainImage: "https://ik.imagekit.io/szkolaaaa/gozc2_nB4hOWE1j",
      images: [
        {
          image_id: 99,
          source: "https://ik.imagekit.io/szkolaaaa/vri9d_ME_cNXpvx",
          product_id: 22,
        },
      ],
      categories: [
        {
          category_id: 20,
          name: "cat2",
        },
        {
          category_id: 23,
          name: "huj",
        },
      ],
    },
    {
      product_id: 22,
      name: "Testowy",
      price: 34,
      quantity: 2,
      description:
        "sadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdf",
      isDigital: false,
      mainImage: "https://ik.imagekit.io/szkolaaaa/gozc2_nB4hOWE1j",
      images: [
        {
          image_id: 99,
          source: "https://ik.imagekit.io/szkolaaaa/vri9d_ME_cNXpvx",
          product_id: 22,
        },
      ],
      categories: [
        {
          category_id: 20,
          name: "cat2",
        },
        {
          category_id: 23,
          name: "huj",
        },
      ],
    },
  ];
  const [items, setItems] = useState(DUMMY_ITEMS);

  return (
    <div className="w-full">
      {items.map((item) => {
        return (
          <div
            key={item.product_id}
            className="m-2 flex flex-row items-center rounded-md border-2 border-black"
          >
            <Image
              src={item.mainImage}
              width={80}
              height={80}
              alt="Image"
            ></Image>
            <div className="flex-grow text-center">
              <p className="text-xl">{item.name}</p>
              <p className="text-sm"> ilość szt</p>
            </div>

            <div className="text-bold flex flex-col p-2 text-xl">
              <button>+</button>
              <button>-</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
