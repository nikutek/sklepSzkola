import { Card, CardContent, CardHeader } from "components/ui/card";
import React, { useEffect, useState } from "react";

import { Button } from "components/ui/button";
import Link from "next/link";
import { useToast } from "components/ui/use-toast";
import { type userType } from "./ordersList";

const WorkersListItem = (props: {
  key: string;
  name: string;
  surname: string;
  email: string;
  onClick: (worker_id: string) => void;
}) => {
  return (
    <li className="border-grey my-3 flex w-full flex-wrap  items-center justify-between border-b-2 py-2 text-sm md:flex-nowrap md:p-2 md:text-lg">
      <div className="flex w-full  items-center justify-around md:w-[70%] ">
        <div className="flex items-center">
          <p className="font-bold">{`${props.name} ${props.surname}`}</p>
        </div>
        <div className="flex items-center">
          <p>{`${props.email}`}</p>
        </div>
      </div>
      <div className=" my-2 flex w-full justify-around md:w-1/4">
        <Button className=" bg-blue-400 p-4 text-sm hover:bg-blue-500 md:text-lg">
          Edytuj
        </Button>
        <Button className=" bg-red-700 p-4 text-sm hover:bg-red-800 md:text-lg">
          Usuń
        </Button>
      </div>
    </li>
  );
};

const WorkersList = () => {
  const [workers, setWorkers] = useState<userType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();
  console.log(workers);
  const fetchWorkers = async () => {
    try {
      const response = await fetch("/api/workers");
      const data = (await response.json()) as {
        workers: userType[];
        admins: userType[];
      };
      setWorkers(data.workers);
      setIsLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    fetchWorkers().catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteWorkerHandler = async (worker_id: string) => {
    console.log("es");
    const response = await fetch(`/api/workers/${worker_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Coś poszło nie tak",
      });
      return;
    }

    await fetchWorkers();
    toast({
      title: "Sukces",
      description: "Pomyślnie usunięto",
    });
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] w-full overflow-hidden md:w-[70%] ">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Pracownicy</h1>
        <div className="">
          <Button className=" px-6 py-6 hover:bg-orange-500">
            <Link href={"/admin/add/worker"}>Dodaj Pracownika</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="my-2 max-h-[85%] w-[full] overflow-hidden overflow-y-scroll p-2 md:my-6">
        {!isLoading && (
          <ul className="flex flex-col ">
            {workers.map((worker) => (
              <WorkersListItem
                key={worker.id}
                surname={worker.surname}
                email={worker.email}
                name={worker.name}
                onClick={deleteWorkerHandler.bind(null, worker.id)}
              />
            ))}
          </ul>
        )}
        {isLoading && <h2>Loading ...</h2>}
      </CardContent>
    </Card>
  );
};
export default WorkersList;
