import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";

export default function signin() {
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  function getEmail(e: React.ChangeEvent) {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  }

  function changeMode() {
    if (mode === "sign-in") {
      setMode("sign-up");
    } else {
      setMode("sign-in");
    }
  }
  return (
    <div className="bg-bg-grey flex h-screen items-center justify-center ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{`${
            mode === "sign-in" ? "Zaloguj się" : "Zarejestruj się"
          }`}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={getEmail}
                  id="email"
                  placeholder="Podaj email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Podaj hasło"
                />
              </div>
              {mode === "sign-up" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="repeatPassword">Powtórz Hasło</Label>
                  <Input
                    type="password"
                    id="repatPassword"
                    placeholder="Powtórz hasło"
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center">
          <Button>{`${
            mode === "sign-in" ? "Zaloguj się" : "Zarejestruj się"
          }`}</Button>
          <Button onClick={changeMode} className="mt-4 w-full" variant="link">
            {`${
              mode === "sign-in"
                ? "Nie masz konta? Utwórz tutaj!"
                : "Masz już konto? Zaloguj się!"
            }`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
