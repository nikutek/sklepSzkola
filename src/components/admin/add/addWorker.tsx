import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "components/ui/use-toast";

export type addWorkerType = {
  name: string;
  email: string;
  password: string;
  address: string;
  post: string;
  postal: string;
};

const AddWorkerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<addWorkerType>();

  const { toast } = useToast();

  const submitHandler = async (data: addWorkerType) => {
    const worker = { ...data, isAdmin: false, isWorker: true };
    console.log(worker);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(worker),
    });
    const { message } = (await response.json()) as { message: string };
    if (!response.ok) {
      toast({
        title: "Błąd",
        description: message ?? "Coś poszło nie tak",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sukces",
      description: `${message} Zweryfikuj konto za pomocą maila`,
    });
    reset();
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Dodaj Pracownika</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-4">
            <Label htmlFor="name">Imie i Nazwisko</Label>
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
            <Label htmlFor="post">Poczta</Label>
            <Input
              id="post"
              {...register("post", {
                required: "Poczta jest wymagana",
              })}
            />
            {errors.post && (
              <p className="sm:text-md text-red-600">{`${errors.post.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="postal">Kod pocztowy</Label>
            <Input
              id="postal"
              {...register("postal", {
                required: "Kod pocztowy jest wymagany",
              })}
            />
            {errors.postal && (
              <p className="sm:text-md text-red-600">{`${errors.postal.message}`}</p>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="address">Adres Zamieszkania</Label>
            <Input
              id="address"
              {...register("address", {
                required: "Adres zamieszkania jest wymagany",
              })}
            />
            {errors.address && (
              <p className="sm:text-md text-red-600">{`${errors.address.message}`}</p>
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
