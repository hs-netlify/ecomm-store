import fetch from "node-fetch";

export const fetchAllProducts = async () => {
  const res = await fetch(`${process.env.NETLIFY_CONNECT_API}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_CONNECT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query Query {
          productCollection {
            items {
              name
              price
              sku
              description
            }
          }
        }
        `,
    }),
  });

  const data = await res.json();
  return data;
};
