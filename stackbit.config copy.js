import { ContentfulContentSource } from "@stackbit/cms-contentful";
import { GitContentSource } from "@stackbit/cms-git";
import { GlobalStyles } from "./.stackbit/models/GlobalStyles";
import { AltPage } from "./.stackbit/models/AltPage";
import { AltHero } from "./.stackbit/models/AltHero";
import { getSlug, markLocalizedModel } from "./config-helpers";
import { normalizeSlug, PAGE_TYPES } from "./lib/common";
import { locales } from "./lib/localization";
import { getLocalizedFieldForLocale } from "@stackbit/types";

const contentfulSource = new ContentfulContentSource({
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const gitSource = new GitContentSource({
  rootPath: __dirname,
  contentDirs: ["content"],
  assetsConfig: {
    referenceType: "static",
    staticDir: "public",
    uploadDir: "images",
    publicPath: "/",
  },
  models: [GlobalStyles, AltPage, AltHero],
});
const config = {
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "18",
  contentSources: [contentfulSource, gitSource],
  // mapModels: ({ models }) => {
  //   models = models.map(markLocalizedModel);
  //   return models;
  // },
  modelExtensions: [
    {
      name: "page",
      type: "page",
      urlPath: "/{slug}",
      fields: [{ name: "backgroundColor", type: "color", default: "#ffffff" }],
    },
  ],
  // siteMap: ({ documents, models }) => {
  //   const pageModels = models
  //     .filter((m) => m.name === "page")
  //     .map((m) => m.name);
  //   let entries = locales.map((locale) => {
  //     return documents
  //       .filter((d) => pageModels.includes(d.modelName))
  //       .map((document) => {
  //         const slug = getLocalizedFieldForLocale(document.fields.slug, locale);
  //         console.log("slug", slug);
  //         if (!slug.value) return null;
  //         const urlPath =
  //           locale === "en-US"
  //             ? "/"
  //             : `/${locale}/` + slug.value.replace(/^\/+/, "");
  //         return {
  //           stableId: document.id,
  //           urlPath,
  //           document,
  //           isHomePage: urlPath === "/",
  //         };
  //       });
  //   });

  //   console.log(entries.flat());
  //   enterise
  //   return entries.flat();
  // },

  // return documents;
  //},
  // siteMap: ({ documents }) => {
  //   const pages = documents.filter((doc) => PAGE_TYPES.includes(doc.modelName));
  //   console.log(pages);

  //     return pages.flatMap((document) => {
  //       console.log("doc", document);
  //       let slug = document.fields?.slug?.value;

  //       let localePrefix = locale === "en-US" ? "" : `/${locale}`;

  //       return {
  //         urlPath: localePrefix + slug,
  //         document: { ...document, localized: true },
  //         locale,
  //       };
  //     });
  //   });
  //   entries.push(documents.filter((doc) => doc.modelName === "AltPage"));
  //   console.log(entries);
  //   return entries;
  // },
  // sidebarButtons: [
  //   {
  //     type: "model",
  //     modelName: "siteConfig",
  //     label: "Site configuration",
  //     icon: "gear",
  //     srcProjectId: contentfulSource.getProjectId(),
  //     srcType: contentfulSource.getContentSourceType(),
  //   },
  // ],
};

export default config;
