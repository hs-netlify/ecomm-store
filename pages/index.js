import { fetchAllProducts } from "../lib/api";
import NavBar from "../components/navBar";
import Header from "../components/header";

import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const products = await fetchAllProducts();
  return {
    props: { products: products?.data?.allContentfulProduct?.nodes },
  };
};

export default function Home({ products }) {
  return (
    <div className="bg-white min-h-screen h-full">
      <NavBar />
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <Image
                  src={product.images[0].image.url}
                  alt={product.images[0].image.altImage}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={product.href || "/"}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-base font-medium text-gray-900">
                    £{product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
