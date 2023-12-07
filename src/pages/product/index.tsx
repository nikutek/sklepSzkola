import type { GetServerSideProps } from "next";
import Product from "~/components/shop/Product";
import type { ProductData } from "~/components/shop/Product";
const ProductPage = (props: { product: ProductData }) => {
  const { product } = props;
  console.log(product);
  if (!product) {
    return <></>;
  }

  return (
    <div className="flex h-[90vh] items-center justify-center bg-bg-grey">
      <Product product={product} />
    </div>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id as string;
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    return { props: {} };
  }
  const product = (await response.json()) as ProductData;

  return { props: { product } };
};
