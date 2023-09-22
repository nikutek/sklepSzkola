import React from "react";
import { Button } from "components/ui/button";
import { Progress } from "components/ui/progress";

export default function App() {
  return (
    <div className=" flex h-screen w-full flex-col items-center justify-center gap-12">
      <Button>123</Button>
      <Progress value={33} className=" w-1/3" />
    </div>
  );
}
