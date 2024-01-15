import { fetchFormData, fetchPageData } from "../lib/apiContentful";
import ProductCard from "../components/productCard";
import localization from "../lib/localization";
import CustomForm from "../components/form";

import NavBar from "../components/navBar";
import Header from "../components/header";

export async function getStaticPaths() {
  const paths = [];
  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params, locale }) => {
  let slug = params.slug ? params.slug[0] : "/";
  let preview = JSON.parse(process.env.PREVIEW);

  let form = null;
  const pageLocale = locale || localization.defaultLocale;
  let {
    products,
    id,
    form: formId,
  } = await fetchPageData(slug, pageLocale, preview);
  if (formId) {
    form = await fetchFormData(formId, preview);
  }

  return {
    props: { products, id, form },
  };
};

export default function Home({ products, id, form }) {
  return (
    <div className="bg-white min-h-screen h-full" data-sb-object-id={id}>
      <NavBar />
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) =>
            product ? <ProductCard key={product?.name} product={product} /> : ""
          )}
        </div>
      </div>
      {form ? <CustomForm form={form} /> : ""}
    </div>
  );
}
