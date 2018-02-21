<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/FloatingButton.jsx" and run build:docs to update this file.
-->
# FloatingButton
A FloatingButton will stick to the bottom of the viewport all the time.
They make common actions immediately visible and easy to perform with one
click or tap. They can be used for any type of action, including navigation.


```example
<ThemeProvider>
  <FloatingButton>
    <Text size="l" color="white">Hello world</Text>
  </FloatingButton>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|color **(required)**|string|Textcolor of the button
|disabled|bool|Disable button state to indicate it's not touchable
|disabledColor **(required)**|string|Textcolor when button is disabled
|size|enum|Size of the button (defaults to l)<br>Default: 'l'
