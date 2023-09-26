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
import { useForm, SubmitHandler } from "react-hook-form";
import type { FieldValues } from "react-hook-form/dist/types";

//Typ wartości pól formularza
type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

export default function signin() {
  //Tryb rejestracji lub logowania
  const [mode, setMode] = useState("sign-in");

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
  }, [isSubmitSuccessful]);

  //Zmiana trybu logowania lub rejestracji
  function changeMode() {
    if (mode === "sign-in") {
      setMode("sign-up");
    } else {
      setMode("sign-in");
    }
    reset();
  }

  const onSubmit: SubmitHandler<FormValues> = (data: FieldValues) => {
    //TODO wysłanie danych na serwer
    console.log(data);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-bg-grey ">
      <Card className="w-[350px] sm:w-[500px]">
        <CardHeader>
          <CardTitle className="text-center sm:text-3xl">{`${
            mode === "sign-in" ? "Zaloguj się" : "Zarejestruj się"
          }`}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button type="submit" className="sm:p-6 sm:text-xl">{`${
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
        </CardContent>
      </Card>
    </div>
  );
}
