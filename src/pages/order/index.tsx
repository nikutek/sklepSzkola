import type { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import OrderPageLayout from "~/components/order/OrderPageLayout";
import { authOptions } from "~/server/auth";
type UserType = {
  id: string;
  name: string;
  isWorker: string;
  address: string;
  post: string;
  postal: string;
  password: string;
  email: string;
};
const OrderPage = (props: { user: UserType }) => {
  return (
    <div className="flex h-[90vh] items-center justify-center bg-bg-grey ">
      <OrderPageLayout user={props.user} />
    </div>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as NextApiRequest;
  const res = context.res as NextApiResponse;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      props: {
        user: {
          user_id: "",
          name: "",
          email: "",
          post: "",
          postal: "",
          address: "",
        },
      },
    };
  }
  const userEndpointResponse = await fetch(
    `http://localhost:3000/api/user/${session.user.email}`,
    {
      method: "GET",
    },
  );

  const userData = (await userEndpointResponse.json()) as UserType;

  return {
    props: {
      user: userData,
    },
  };
};
