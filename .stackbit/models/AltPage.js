import { AltHero } from "./AltHero";
export const AltPage = {
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
      items: { type: "model", models: ["AltHero"] },
    },
    {
      name: "showJson",
      label: "Show JSON",
      type: "boolean",
      default: false,
    },
  ],
};
