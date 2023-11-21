import React from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Controller, useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { useToast } from "components/ui/use-toast";
import { useRouter } from "next/router";

export type editWorkerType = {
  id: string;
  name: string;
  isWorker: string;
  address: string;
  post: string;
  postal: string;
  password: string;
};

const EditWorkerForm = (props: { worker: editWorkerType; email: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<editWorkerType>();

  const { toast } = useToast();
  const router = useRouter();

  const submitHandler = async (data: FieldValues) => {
    const worker = {
      ...data,
      id: props.worker.id,
      email: props.email,
      isWorker: data.isWorker === "true" ? true : false,
      isAdmin: false,
      image: null,
      emailVerified: true,
      password: props.worker.password,
    };
    console.log(worker);
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(worker),
    });
    if (!response.ok) {
      toast({
        title: "Błąd",
        description: "Coś poszło nie tak.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Sukces",
      description: "Pomyślnie edytowano pracownika.",
    });
    await router.replace("/admin/workers");
  };

  const { name, address, postal, post } = props.worker;
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
              defaultValue={name}
              {...register("name", {
                required: "Imie i nazwisko jest wymagane",
              })}
            />
            {errors.name && (
              <p className="sm:text-md text-red-600">{`${errors.name.message}`}</p>
            )}
          </div>
          <Controller
            name="isWorker"
            control={control}
            rules={{ required: "Pole nie może być puste" }}
            render={({ field }) => (
              <div className="mt-4">
                <Label>Czy użytkownik jest pracownkiem?</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Czy użytkownik jest pracownikiem?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Tak</SelectItem>
                    <SelectItem value="false">Nie</SelectItem>
                  </SelectContent>
                </Select>
                {errors.isWorker && (
                  <p className="sm:text-md text-red-600">{`${errors.isWorker.message}`}</p>
                )}
              </div>
            )}
          />
          <div className="mt-4">
            <Label htmlFor="post">Poczta</Label>
            <Input
              defaultValue={post}
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
              defaultValue={postal}
              {...register("postal", {
                required: "Kod pocztowy jest wymagany",
                pattern: {
                  value: /\d{2}-\d{3}/,
                  message:
                    "Błędny kod pocztowy. Kod pocztowy musi mieć format xx-xxx",
                },
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
              defaultValue={address}
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
              Edytuj
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditWorkerForm;
