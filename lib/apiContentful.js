import fetch from "node-fetch";

export const fetchFormData = async (formId, preview) => {
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
          preview,
          formId,
          limit: 10,
        },
        query: `
          query FormData($preview: Boolean, $formId: String!, $limit: Int){
            form(id: $formId, , preview: $preview) {
              name
              label
              formItemsCollection(limit: $limit) {
                items {
                  name
                  inputType
                  label
                  optionsCollection {
                    items {
                      value
                    }
                  }
                  customStyle
                  type
                          sys {
                   id
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

  return {
    id: formId,
    name: data?.data?.form?.name,
    label: data?.data?.form?.label,
    inputs: data?.data?.form?.formItemsCollection?.items,
  };
};

export const fetchPageData = async (slug, locale, preview) => {
  console.log("preview", JSON.parse(preview));
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
          preview,
          where: {
            slug,
          },
          limit: 1,
          imagesCollectionLimit2: 1,
          locale,
        },
        query: `
            query PageCollection($preview: Boolean, $locale: String, $where: PageFilter, $limit: Int, $imagesCollectionLimit2: Int) {
              pageCollection(preview: $preview, where: $where, limit: $limit) {
                items {
                  sys {
                    id
                  }
                  form {
                    name
                    sys {
                      id
                    }
                  }
                  productsCollection(locale: $locale) {
                    items {
                      sys{
                        id
                      }
                      name
                      price
                      sku
                      description
                      imagesCollection(limit: $imagesCollectionLimit2) {
                        items {
                          sys {
                            id
                          }
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

  return {
    id: data?.data?.pageCollection?.items[0]?.sys?.id,
    products: data?.data?.pageCollection?.items[0]?.productsCollection?.items,
    form: data?.data?.pageCollection?.items[0]?.form?.sys?.id,
  };
};
