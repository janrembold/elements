<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/CountIndicator.jsx" and run build:docs to update this file.
-->
# CountIndicator
CountIndicator are used to indicated changes or updates. They can also be
used to inform user about new or unseen information that are available

```example
<ThemeProvider>
  <Relative>
    <Text>Hello</Text>
    <CountIndicator top={0} left={35} count={123} />
  </Relative>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|count **(required)**|number|Number to display
|top|union|Top offset
|bottom|union|Bottom offset
|left|union|Left offset
|right|union|Right offset
|color|union|Color<br>Default: 'warn'
