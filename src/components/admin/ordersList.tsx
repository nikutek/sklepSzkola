import { Card, CardContent, CardHeader } from "components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { type orderType } from "~/pages/api/orders";
import Link from "next/link";

export type userType = {
  address: string;
  id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  addres: string;
  postal: string;
  post: string;
  isAdmin: boolean;
  isWorker: boolean;
  emailVerified: boolean;
};

function formatDate(date: Date) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const OrdersListItem = (props: {
  key: number;
  order: orderType;
  onDelete: (order_id: number) => void;
}) => {
  const order = {
    ...props.order,
  };
  console.log(order);
  return (
    <li className="border-grey my-3 flex w-full flex-wrap  items-center justify-between border-b-2 py-2 text-sm md:flex-nowrap md:p-2 md:text-lg">
      <Link
        href={`/admin/orders/${order.order_id}`}
        className="flex w-full  items-center justify-around md:w-[80%] "
      >
        <div className="flex items-center">
          <p className="text-md">{`Ilość produktów: ${order.products.length}`}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm">{`Zamówił: ${order.user.email}`}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm">{`Data zamówienia: ${formatDate(
            order.order_date,
          )}`}</p>
        </div>
      </Link>

      <div className=" my-2 flex w-full justify-around md:w-1/4">
        <Button
          onClick={props.onDelete.bind(null, order.order_id)}
          className=" bg-red-700 p-4 text-sm hover:bg-red-800 md:text-lg"
        >
          Usuń
        </Button>
      </div>
    </li>
  );
};
const OrdersList = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = (await response.json()) as orderType[];
      setOrders(data);
      setIsLoading(false);
    } catch (err) {}
  };
  useEffect(() => {
    fetchOrders().catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteOrderHandler = async (order_id: number) => {
    const response = await fetch(`/api/orders/${order_id}`, {
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

    await fetchOrders();
    toast({
      title: "Sukces",
      description: "Pomyślnie usunięto",
    });
  };

  return (
    <Card className="h-[80vh] max-h-[80vh] w-full overflow-hidden md:w-[70%] ">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">Zamówienia</h1>
      </CardHeader>
      <CardContent className="my-2 max-h-[85%] w-[full] overflow-hidden overflow-y-scroll p-2 md:my-6">
        {!isLoading && (
          <ul className="flex flex-col ">
            {orders.map((order: orderType) => (
              <OrdersListItem
                onDelete={deleteOrderHandler}
                key={order.order_id}
                order={order}
              />
            ))}
          </ul>
        )}

        {isLoading && <p className=" text-center text-xl">Loading...</p>}
      </CardContent>
    </Card>
  );
};
export default OrdersList;
