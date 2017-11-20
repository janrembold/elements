<!-- 
This is an auto-generated markdown. 
You can change it in "src/behaviour/ThemeProvider.jsx" and run build:docs to update this file.
-->
# ThemeProvider
All elements support theming by default, and therefore every element must be wrapped inside a ThemeProvider.
The ThemeProvider allows you to define the default colors for most elements.

**Example**: If you want all you buttons to be red, instead of writing <Button color="red" /> all the time, you might want to set the "primary" color of your theme to red.
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|root|bool|
|theme|shape|<br>Default: {
  primary: ColorPalette.primary.blue,
  text: ColorPalette.text.primary,
  secondaryText: ColorPalette.text.secondary,
  titleColor: ColorPalette.text.primary,
  contrast: ColorPalette.white,
  warn: ColorPalette.red,
  disabled: ColorPalette.grey,
  background: ColorPalette.background.bright,
  textOnBackground: ColorPalette.white,
}
|children|node|
