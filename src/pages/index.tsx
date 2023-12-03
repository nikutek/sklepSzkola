/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "components/ui/button";
import { Progress } from "components/ui/progress";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import Products from "~/components/shop/Products";
import { Slider } from "~/components/shop/UI/Slider";

export default function App() {
  const authenticator = async () => {
    try {
      // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.
      const headers = {
        CustomHeader: "CustomValue",
      };

      const response = await fetch("https://ik.imagekit.io/szkolaaaa", {
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-12 bg-[#111]">
      <Products />
    </div>
  );
}
