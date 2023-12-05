import { Card, CardContent, CardHeader } from "components/ui/card";
import {
  type GetServerSideProps,
  type NextApiRequest,
  type NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { type UserDataType } from "~/pages/profile";
import { authOptions } from "~/server/auth";
import { type orderType } from "~/pages/api/orders";
import Image from "next/image";

const OrderPage = ({ orderData }: { orderData: orderType }) => {
  console.log(orderData);
  const router = useRouter();
  const orderID = router.query.orderId as string;

  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">{`Zamówienie nr: ${orderID}`}</h1>
      </CardHeader>
      <CardContent>
        <div className="border-b-2 border-black p-4">
          <h1 className="m-2 text-xl font-bold">Zamawiający:</h1>
          <p>Imie: {orderData.user.name}</p>
          <p>
            Adres: {orderData.address}, {orderData.postal} {orderData.post}
          </p>
          {orderData.shipped_date && (
            <p>Data wysyłki: {orderData.shipped_date.toString()}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          {orderData.products.map((item) => {
            return (
              <div
                key={item.product_id}
                className=" m-2 flex w-1/2 flex-row rounded-md border-2 border-black shadow-md"
              >
                <Image
                  src={item.mainImage}
                  width={100}
                  height={100}
                  alt="image"
                ></Image>
                <div className="flex flex-grow flex-col items-center justify-center text-center">
                  <p>{item.name}</p>
                  <p className="flex  flex-row gap-2">{item.quantity} szt </p>
                </div>

                <div className=" m-4 flex flex-col justify-center">
                  <p>Koszt: {item.price * item.quantity} zł</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const res = context.res as NextApiResponse;
  const session = await getServerSession(req, res, authOptions);

  if (!session || !context.params) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const orderID = context.params.orderId as string;

  const ordersEndpointResponse = await fetch(
    `http://localhost:3000/api/orders/${orderID}`,
    {
      method: "GET",
    },
  );

  const orderData = (await ordersEndpointResponse.json()) as UserDataType;

  return {
    props: {
      session,
      orderData,
    },
  };
};
