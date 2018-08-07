<!-- 
This is an auto-generated markdown. 
You can change it in "src/atoms/View.jsx" and run build:docs to update this file.
-->
# View
This Component is rebuild of angular-material's flexbox directives.

Different to angular's directive implementation, which can be used independent of each other,
this component combines layout and element attributes within one component.

For explanation see:
- https://material.angularjs.org/latest/layout/alignment
- https://material.angularjs.org/latest/layout/children

```example
<ThemeProvider>
  <View fill direction="row" alignH="end">
    <Text>Say Hello!</Text>
  </View>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|children|node|
|htmlElement|string|<br>Default: 'div'
|alignH|enum|horizontal alignment<br>Default: 'start'
|alignV|enum|vertical alignment<br>Default: 'stretch'
|direction|enum|direction
|fill|bool|Passing true, will make the view fill out available space<br>Default: false
|wrap|enum|Defining how children will wrap
|flex|enum|Flex values, can be 5, 10, 15 ... 100 or 33, 66<br>Default: 'none'
|onClick|func|
|onRef|union|@deprecated<br>Default: _ => _
