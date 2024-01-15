import { v4 as uuidv4 } from "uuid";

export const AltHero = {
  name: "AltHero",
  type: "data",
  label: "Alt Hero",
  filePath: `content/data/alt-hero-${uuidv4()}.json`,

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
            if (!document) return;
            // Send feedback in the appropriate context
            const logger = options.getLogger();
            logger.debug(
              `Running generate-title action on page: ${document.id}`
            );
            // Generate title
            const newTitle = faker.lorem.words(4);
            logger.debug(`This is the ref: ${document}`);
            // Update the document with the new random title
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
                  field: { type: "string", value: newTitle },
                },
              ],
            });
            logger.debug("Finished generate-title action");
          },
        },
      ],
    },
    {
      name: "description",
      type: "string",
    },
    { name: "heroImage", type: "image" },
    {
      name: "reverseContent",
      type: "boolean",
      default: false,
    },
    {
      name: "backgroundColor",
      type: "color",
      default: "#e60606",
      group: "styles",
    },

    {
      name: "styles",
      type: "style",
      styles: {
        title: { fontSize: "*" },
        heroImage: { width: ["narrow", "wide"] },
        description: {
          fontSize: "*",
          fontStyle: ["italic", "normal"],
        },
      },
    },
  ],
};
