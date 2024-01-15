import localization from "./lib/localization";

export function getSlug(document) {
  return document.fields.slug?.value;
}

// Set the document's locale field (which is custom) to the user's chosen locale
export function LocalizedDocumentCreateHook(options) {
  const { createDocumentOptions, createDocument } = options;
  const { model, locale, updateOperationFields } = createDocumentOptions;

  if (!localization.nonLocalizedModels.includes(model.name)) {
    const localeField = model.fields.find((field) => field.name === "locale");
    if (localeField) {
      updateOperationFields.locale = { type: "enum", value: locale };
    }
  }
  return createDocument(createDocumentOptions);
}

export function markLocalizedModel(model) {
  if (!localization.nonLocalizedModels.includes(model.name)) {
    model = model;
    return {
      ...model,
      localized: true,
      locale: ({ document }) => {
        return document.fields["locale"]?.value;
      },
    };
  } else {
    return model;
  }
}
