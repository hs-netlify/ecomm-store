import { loadJsonFile } from "load-json-file";

export async function getStaticPaths() {
  const paths = [];
  return { paths, fallback: "blocking" };
}

const getFromSlug = async (slug) => {
  let page = await loadJsonFile(`./content/pages${slug}.json`);
  return page;
};

export async function getStaticProps({ params }) {
  const slug = "/" + (params?.slug ?? [""]).join("/");
  const data = await getFromSlug(slug);

  return { props: { page: data, slug } };
}

export default function AltPage({ page }) {
  return (
    <div
      className="bg-blue-500"
      data-sb-object-id={`content/pages/${page.slug}.json`}
    >
      <div>
        {page?.sections?.map((section, i) => (
          <div
            key={i}
            data-sb-field-path={`sections[${i}]`}
            style={{
              backgroundColor: section.backgroundColor,
              ...section.styles,
            }}
            className={`px-6 py-16 flex justify-between sm:px-12 sm:py-24 ${
              section?.reverseContent ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <img
              style={{ ...section?.styles?.heroImage }}
              data-sb-field-path={`sections[${i}].heroImage`}
              className="h-72"
              src={section?.heroImage}
            />
            <div className="w-full px-20 ">
              <h1
                style={{ ...section?.styles?.title }}
                data-sb-field-path={`sections[${i}].title`}
                className="text-4xl py-10"
              >
                {section?.title}
              </h1>
              <p
                data-sb-field-path={`sections[${i}].description`}
                style={{ ...section?.styles?.description }}
                className="text-lg"
              >
                {section?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {page.showJson ? (
        <pre className="">{JSON.stringify(page, "", 2)}</pre>
      ) : (
        ""
      )}
    </div>
  );
}
