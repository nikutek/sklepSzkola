import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export type editWorkerType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  place: string;
};

const EditWorkerForm = (props: { worker: editWorkerType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    reset,
    control,
  } = useForm<editWorkerType>();

  const submitHandler = (data: FieldValues) => {
    console.log(data);
  };

  const { id, name, surname, email, password, place } = props.worker;
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
              defaultValue={name}
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
              defaultValue={surname}
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
              defaultValue={email}
              id="email"
              {...register("email", {
                required: "Email jest wymagany",
              })}
            />
            {errors.email && (
              <p className="sm:text-md text-red-600">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Hasło</Label>
            <Input
              defaultValue={password}
              id="password"
              type="password"
              {...register("password", {
                required: "Hasło jest wymagane",
              })}
            />
            {errors.password && (
              <p className="sm:text-md text-red-600">{`${errors.password.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="place">Miejsce Zamieszkania</Label>
            <Input
              defaultValue={place}
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
              Edytuj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditWorkerForm;
