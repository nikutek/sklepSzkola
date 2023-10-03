import React from "react";
import { getServerSession } from "next-auth";
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "~/server/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Label } from "components/ui/label";
import { Input } from "components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "components/ui/button";
import type { changePasswordResponseObject } from "utils/changePassword";
import { AlertPopup } from "~/components/alert";

type FormValues = {
  password: string;
  repeatPassword: string;
};

const ChangePassword = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    description: "",
    isError: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>();

  const router = useRouter();

  const { email, token } = router.query;

  const closePopup = () => {
    setShowPopup(false);
  };

  const updatePassword = async () => {
    const changePasswordData = {
      email: email,
      token: token,
      newPassword: getValues("password"),
    };
    console.log(changePasswordData);
    const response = await fetch("/api/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changePasswordData),
    });
    // if (response.ok) {
    //   await router.push("/auth/signin");
    // }
    const res = (await response.json()) as changePasswordResponseObject;
    setPopupData({
      title: res.isError ? "Błąd" : "Sukces",
      description: res.message,
      isError: res.isError,
    });
    setShowPopup(true);
  };

  return (
    <div className="h-[90vh]  bg-bg-grey">
      <Card className="fixed left-1/2 top-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 sm:w-[500px]">
        <CardHeader>
          <CardTitle className="text-center sm:text-3xl">Zmień hasło</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="POST" onSubmit={handleSubmit(updatePassword)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="sm:text-lg" htmlFor="password">
                  Hasło
                </Label>
                <Input
                  className="sm:text-lg"
                  {...register("password", {
                    required: "Hasło jest wymagane",
                    minLength: {
                      value: 8,
                      message: "Hasło musi mieć minimum niż 8 znaków",
                    },
                    maxLength: {
                      value: 20,
                      message: "Hasło może mieć maksymalnie 20 znaków",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                      message:
                        "Hasło musi zawierać małą i wielką literę oraz cyfrę",
                    },
                  })}
                  type="password"
                  id="password"
                  placeholder="Podaj hasło"
                />
                {errors.password && (
                  <p className="sm:text-md text-red-600">{`${errors.password.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="sm:text-lg" htmlFor="repeatPassword">
                  Powtórz Hasło
                </Label>
                <Input
                  className="sm:text-lg"
                  {...register("repeatPassword", {
                    required: "Pole powtórz hasło jest wymagane",

                    validate: (value) =>
                      value === getValues("password") || "Hasła się różnią",
                  })}
                  type="password"
                  id="repatPassword"
                  placeholder="Powtórz hasło"
                />
                {errors.repeatPassword && (
                  <p className="sm:text-md text-red-600">{`${errors.repeatPassword.message}`}</p>
                )}
              </div>
            </div>
            <div className="mt-12 flex flex-wrap justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="sm:p-6 sm:text-xl"
              >
                Zmień
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {showPopup && (
        <AlertPopup
          className="fixed bottom-10 left-1/2 w-3/4 -translate-x-2/4 "
          alertData={popupData}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default ChangePassword;
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const req = context.req as NextApiRequest;
//   const res = context.res as NextApiResponse;
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
