import { getServerSession } from "next-auth";
import type {
  GetServerSideProps,
  NextApiRequest,
  NextApiResponse,
  NextPage,
} from "next";
import { authOptions } from "~/server/auth";
import React, { useRef } from "react";
import { useState } from "react";
import { type UserDataType } from ".";

const Settings: NextPage<{ userDataProps: UserDataType }> = ({
  userDataProps,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<UserDataType>(userDataProps);

  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isAddressChanged, setIsAddressChanged] = useState(false);
  const [isPostChanged, setIsPostChanged] = useState(false);
  const [isPostalChanged, setIsPostalChanged] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const postRef = useRef<HTMLInputElement>(null);
  const postalRef = useRef<HTMLInputElement>(null);

  const confirmNameChangeHandler = async () => {
    if (!nameRef.current) {
      return;
    }
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        id: userData.id,
        name: nameRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsNameChanged(false);
    // TODO: TOAST
  };
  const confirmAddressChangeHandler = async () => {
    if (!addressRef.current) {
      return;
    }
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        id: userData.id,
        name: addressRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsAddressChanged(false);
    // TODO: TOAST
  };
  const confirmPostChangeHandler = async () => {
    if (!postRef.current) {
      return;
    }
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        id: userData.id,
        name: postRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsPostChanged(false);
    // TODO: TOAST
  };
  const confirmPostalChangeHandler = async () => {
    if (!postalRef.current) {
      return;
    }
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({
        id: userData.id,
        name: postalRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsPostalChanged(false);
    // TODO: TOAST
  };

  return (
    <div className="mt-[10vh] flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="flex w-2/3 flex-row">
        <p className="w-1/3 p-4 text-right text-xl">Name: </p>
        <input
          type="text"
          defaultValue={userData.name}
          className="m-2 w-1/3 rounded-md border-2 border-black"
          ref={nameRef}
          onChange={(e) => {
            setIsNameChanged(e.target.value == userData.name ? false : true);
          }}
        />
        {isNameChanged && (
          <button onClick={confirmNameChangeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              className=" h-10"
            >
              <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex w-2/3 flex-row">
        <p className="w-1/3 p-4 text-right text-xl">Adres: </p>
        <input
          type="text"
          defaultValue={userData.address}
          className="m-2 w-1/3 rounded-md border-2 border-black"
          ref={addressRef}
          onChange={(e) => {
            setIsAddressChanged(
              e.target.value == userData.address ? false : true,
            );
          }}
        />
        {isAddressChanged && (
          <button onClick={confirmAddressChangeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              className=" h-10"
            >
              <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex w-2/3 flex-row">
        <p className="w-1/3 p-4 text-right text-xl">Poczta: </p>
        <input
          type="text"
          defaultValue={userData.post}
          className="m-2 w-1/3 rounded-md border-2 border-black"
          ref={postRef}
          onChange={(e) => {
            setIsPostChanged(e.target.value == userData.post ? false : true);
          }}
        />
        {isPostChanged && (
          <button onClick={confirmPostChangeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              className=" h-10"
            >
              <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex w-2/3 flex-row">
        <p className="w-1/3 p-4 text-right text-xl">Kod Pocztowy: </p>
        <input
          type="text"
          defaultValue={userData.postal}
          className="m-2 w-1/3 rounded-md border-2 border-black"
          ref={postalRef}
          onChange={(e) => {
            setIsPostalChanged(
              e.target.value == userData.postal ? false : true,
            );
          }}
        />
        {isPostalChanged && (
          <button onClick={confirmPostalChangeHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              className=" h-10"
            >
              <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const res = context.res as NextApiResponse;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const userEndpointResponse = await fetch(
    `https://sklepszkola-production.up.railway.app/api/user/${session.user.email}`,
    {
      method: "GET",
    },
  );

  const userData = (await userEndpointResponse.json()) as UserDataType;

  return {
    props: {
      session,
      userDataProps: userData,
    },
  };
};

export default Settings;
