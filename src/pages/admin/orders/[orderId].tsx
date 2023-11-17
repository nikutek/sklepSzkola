import { Card, CardContent, CardHeader } from "components/ui/card";

const OrderPage = () => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <h1 className="text-center text-3xl font-bold">{`Zamówienie nr: 5`}</h1>
      </CardHeader>
      <CardContent>
        <div></div>
      </CardContent>
    </Card>
  );
};

export default OrderPage;
