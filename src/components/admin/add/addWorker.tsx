import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export type addWorkerType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  place: string;
};

const AddWorkerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
    control,
  } = useForm<addWorkerType>();

  const submitHandler = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Dodaj Pracownika</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-4">
            <Label htmlFor="name">Imie</Label>
            <Input
              id="name"
              {...register("name", {
                required: "Imie jest wymagane",
              })}
            />
            {errors.name && (
              <p className="sm:text-md text-red-600">{`${errors.name.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="surname">Nazwisko</Label>
            <Input
              id="surname"
              {...register("surname", {
                required: "Nazwisko jest wymagana",
              })}
            />
            {errors.surname && (
              <p className="sm:text-md text-red-600">{`${errors.surname.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "To nie jest email",
                },
              })}
            />
            {errors.email && (
              <p className="sm:text-md text-red-600">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              type="password"
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
            />
            {errors.password && (
              <p className="sm:text-md text-red-600">{`${errors.password.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="place">Miejsce Zamieszkania</Label>
            <Input
              id="place"
              {...register("place", {
                required: "Miejsce zamieszkania jest wymagane",
              })}
            />
            {errors.place && (
              <p className="sm:text-md text-red-600">{`${errors.place.message}`}</p>
            )}
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Button
              disabled={isSubmitting ? true : false}
              className="bg-blue-500 px-8 py-5 hover:bg-blue-700"
              type="submit"
            >
              Dodaj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddWorkerForm;
