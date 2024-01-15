var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.js
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_cms_contentful = require("@stackbit/cms-contentful");
var import_cms_git = require("@stackbit/cms-git");

// .stackbit/models/GlobalStyles.js
var GlobalStyles = {
  type: "data",
  label: "Global styles",
  filePath: "./content/style.json",
  name: "GlobalStyles",
  fields: [
    {
      type: "enum",
      name: "mode",
      controlType: "button-group",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" }
      ],
      default: "light"
    },
    { type: "color", name: "primaryColor", label: "Primary color" },
    { type: "color", name: "secondaryColor", label: "Secondary color" }
  ]
};

// .stackbit/models/AltHero.js
var import_uuid = require("uuid");
var AltHero = {
  name: "AltHero",
  type: "data",
  label: "Alt Hero",
  filePath: `content/data/alt-hero-${(0, import_uuid.v4)()}.json`,
  fieldGroups: [{ name: "styles", label: "Styles", icon: "palette" }],
  fields: [
    {
      name: "title",
      type: "string",
      actions: [
        {
          name: "generate-title",
          label: "Generate Title",
          run: async (options) => {
            const { faker } = await import("@faker-js/faker");
            const document = options.currentPageDocument;
            if (!document)
              return;
            const logger = options.getLogger();
            logger.debug(
              `Running generate-title action on page: ${document.id}`
            );
            const newTitle = faker.lorem.words(4);
            logger.debug(`This is the ref: ${document}`);
            options.contentSourceActions.updateDocument({
              document,
              userContext: options.getUserContextForContentSourceType(
                document.srcType
              ),
              operations: [
                {
                  opType: "set",
                  fieldPath: options.fieldPath,
                  modelField: options.modelField,
                  field: { type: "string", value: newTitle }
                }
              ]
            });
            logger.debug("Finished generate-title action");
          }
        }
      ]
    },
    {
      name: "description",
      type: "string"
    },
    { name: "heroImage", type: "image" },
    {
      name: "reverseContent",
      type: "boolean",
      default: false
    },
    {
      name: "backgroundColor",
      type: "color",
      default: "#e60606",
      group: "styles"
    },
    {
      name: "styles",
      type: "style",
      styles: {
        title: { fontSize: "*" },
        heroImage: { width: ["narrow", "wide"] },
        description: {
          fontSize: "*",
          fontStyle: ["italic", "normal"]
        }
      }
    }
  ]
};

// .stackbit/models/AltPage.js
var AltPage = {
  type: "page",
  label: "Alt Page",
  filePath: `content/pages/{slug}.json`,
  name: "AltPage",
  urlPath: "/alt/{slug}",
  localized: true,
  fields: [
    { name: "title", type: "string", required: true },
    { name: "slug", type: "slug", required: true },
    {
      name: "sections",
      type: "list",
      items: { type: "model", models: ["AltHero"] }
    },
    {
      name: "showJson",
      label: "Show JSON",
      type: "boolean",
      default: false
    }
  ]
};

// stackbit.config.js
var contentfulSource = new import_cms_contentful.ContentfulContentSource({
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});
var gitSource = new import_cms_git.GitContentSource({
  rootPath: "/Users/hs/code/stackbit-demo",
  contentDirs: ["content"],
  assetsConfig: {
    referenceType: "static",
    staticDir: "public",
    uploadDir: "images",
    publicPath: "/"
  },
  models: [GlobalStyles, AltPage, AltHero]
});
var config = {
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "18",
  contentSources: [contentfulSource, gitSource],
  modelExtensions: [
    {
      name: "page",
      type: "page",
      urlPath: "/{slug}",
      fields: [{ name: "backgroundColor", type: "color", default: "#ffffff" }]
    }
  ]
};
var stackbit_config_default = config;
//# sourceMappingURL=stackbit.config.LEQJEAOE.cjs.map
