export const GlobalStyles = {
  type: 'data',
  label: 'Global styles',
  filePath: './content/style.json',
  name: 'GlobalStyles',
  fields: [
    {
      type: 'enum',
      name: 'mode',
      controlType: 'button-group',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      default: 'light',
    },
    { type: 'color', name: 'primaryColor', label: 'Primary color' },
    { type: 'color', name: 'secondaryColor', label: 'Secondary color' },
  ],
};
