import { fetchAllProducts } from "../../lib/api";

exports.handler = async (event) => {
  const products = await fetchAllProducts();
  return {
    statusCode: 200,
    body: `<pre> ${JSON.stringify(products, "", 2)} </pre>`,
  };
};
