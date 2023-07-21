import fetch from "node-fetch";

export const fetchAllProducts = async () => {
  const res = await fetch(`${process.env.NETLIFY_CONNECT_API}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NETLIFY_CONNECT_TOKEN`
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query fetchAllProducts {
                allContentfulProduct {
                    nodes {
                        name
                        id
                        sku
                        price
                        images {
                            name
                            image {
                            url
                            }
                            altImage
                        }
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
