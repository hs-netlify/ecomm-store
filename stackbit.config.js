import { ContentfulContentSource } from "@stackbit/cms-contentful";
import { GitContentSource } from "@stackbit/cms-git";
import { GlobalStyles } from "./.stackbit/models/GlobalStyles";
import { AltPage } from "./.stackbit/models/AltPage";
import { AltHero } from "./.stackbit/models/AltHero";

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

  modelExtensions: [
    {
      name: "page",
      type: "page",
      urlPath: "/{slug}",
      fields: [{ name: "backgroundColor", type: "color", default: "#ffffff" }],
    },
  ],
};

export default config;
