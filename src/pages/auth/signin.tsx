import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { FieldValues } from "react-hook-form/dist/types";
import { signIn } from "next-auth/react";
import { AlertPopup } from "~/components/alert";

//Typ wartości pól formularza
type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};
interface ResponseData {
  message: string;
}
export default function Signin() {
  //Tryb rejestracji lub logowania
  const [mode, setMode] = useState("sign-in");
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    description: "",
    isError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<FormValues>();

  //Reset formularza po wysłaniu
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  //Zmiana trybu logowania lub rejestracji
  function changeMode() {
    if (mode === "sign-in") {
      setMode("sign-up");
    } else {
      setMode("sign-in");
    }
    reset();
  }
  const closePopupOnTimeout = () => {
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const changePassword = () => {
    console.log("Zmiana hasła");
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FieldValues) => {
    const userData = {
      email: getValues("email"),
      password: getValues("password"),
    };
    if (mode === "sign-up") {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const res = (await response.json()) as ResponseData;
        if (response.ok) {
          setPopupData({
            title: "Sukces",
            description: "Pomyślnie utworzono użytkownika",
            isError: false,
          });
          setShowPopup(true);
          closePopupOnTimeout();
          setMode("sign-in");
        } else {
          setPopupData({
            title: "Błąd",
            description: res.message,
            isError: true,
          });
          setShowPopup(true);
          closePopupOnTimeout();
        }
      } catch (error: unknown) {
        console.log(error);
      }
    } else if (mode === "sign-in") {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        console.log("Zalogowano");
      } else {
        console.log(response);

        setPopupData({
          title: "Błąd",
          description: response?.error ? response.error : "Unknown error",
          isError: true,
        });
        setShowPopup(true);
        closePopupOnTimeout();
      }
    }
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-bg-grey ">
        <Card className="w-[350px] sm:w-[500px]">
          <CardHeader>
            <CardTitle className="text-center sm:text-3xl">{`${
              mode === "sign-in" ? "Zaloguj się" : "Zarejestruj się"
            }`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label className="sm:text-xl" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="sm:text-lg"
                    {...register("email", {
                      required: "Email jest wymagany",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "To nie jest email",
                      },
                    })}
                    id="email"
                    placeholder="Podaj email"
                  />
                  {errors.email && (
                    <p className="sm:text-md text-red-600">{`${errors.email.message}`}</p>
                  )}
                </div>
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
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
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
                {mode === "sign-up" && (
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
                )}
              </div>
              <div className="mt-12 flex flex-wrap justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:p-6 sm:text-xl"
                >{`${
                  mode === "sign-in" ? "Zaloguj się" : "Zarejestruj się"
                }`}</Button>
              </div>
            </form>
            <CardFooter className="flex justify-center"></CardFooter>
            <Button
              onClick={changeMode}
              className="mt-4 w-full sm:text-lg"
              variant="link"
            >
              {`${
                mode === "sign-in"
                  ? "Nie masz konta? Utwórz tutaj!"
                  : "Masz już konto? Zaloguj się!"
              }`}
            </Button>
            {mode === "sign-in" && (
              <Button
                onClick={changePassword}
                className="mt-4 w-full sm:text-lg"
                variant="link"
              >
                Zapomniałeś hasła? Kliknij tutaj!
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      {showPopup && (
        <AlertPopup
          className="fixed bottom-10 left-1/2 w-3/4 -translate-x-2/4 "
          alertData={popupData}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
