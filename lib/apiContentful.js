import fetch from "node-fetch";

export const fetchPageData = async (slug) => {
  const res = await fetch(
    `${process.env.CONTENTFUL_API}/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variables: {
          preview: true,
          where: {
            slug,
          },
          limit: 1,
          imagesCollectionLimit2: 1,
        },
        query: `
            query PageCollection($preview: Boolean, $where: PageFilter, $limit: Int, $imagesCollectionLimit2: Int) {
              pageCollection(preview: $preview, where: $where, limit: $limit) {
                items {
                  productsCollection {
                    items {
                      name
                      price
                      sku
                      description
                      imagesCollection(limit: $imagesCollectionLimit2) {
                        items {
                          image {
                            description
                            url
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        `,
      }),
    }
  );

  const data = await res.json();

  return data.data.pageCollection.items[0].productsCollection.items;
};
