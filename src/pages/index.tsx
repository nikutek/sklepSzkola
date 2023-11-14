/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "components/ui/button";
import { Progress } from "components/ui/progress";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";

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
    <div className=" flex h-screen w-full flex-col items-center justify-center gap-12">
      <Button>123</Button>
      <Progress value={33} className=" w-1/3" />
      <input
        type="file"
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .jpeg, .png, .jfif"
        multiple
        // onChange={handleFileChange}
      />
      {/* //In order to use the SDK, you need to provide it with a few configuration
      parameters. //The configuration parameters can be applied directly to the
      IKImage component or using //an IKContext component. */}
      <IKContext
        publicKey="public_/+LytKfMQpryszlk5TiCCBsHWzE="
        urlEndpoint="https://ik.imagekit.io/szkolaaaa"
        transformationPosition="path"
        authenticator={authenticator}
      >
        {/* // Image component */}
        <IKImage
          path="/default-image.jpg"
          transformation={[
            {
              height: "300",
              width: "400",
            },
          ]}
        />
        {/* // Image upload */}
        <IKUpload
          fileName="my-upload"
          onError={(err) => {
            console.log(err);
          }}
        />
      </IKContext>
    </div>
  );
}
