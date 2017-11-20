<!-- 
This is an auto-generated markdown. 
You can change it in "src/atoms/Circle.jsx" and run build:docs to update this file.
-->
# Circle
Simple circle element that is used to build other things.

Check out ProfileImage to see it in action.

```example
<ThemeProvider>
  <ResourceProvider>
    <View direction="row" alignV="center">
      <Circle outline fill={false} outlineColor="lightGrey">
        <Icon size="s" name="remove-filled" color="lightGrey" />
      </Circle>
      <Circle color="primary" />
      <Circle color="#bada55" radius={20} />
      <Circle color="gray" radius={10} />
    </View>
  </ResourceProvider>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|children|node|Content of the Circle will be always centered
|color|string|Color of the Circle. Allows theme names (like 'primary') or hex colors<br>Default: 'primary'
|radius|number|Radius of Circle, defaults to 40<br>Default: 40
|outline|bool|If true it will only render the outline
|outlineColor|string|If passed outline will use as outline color instead of color<br>Default: 'primary'
|fill|bool|If true it will fill the circle<br>Default: true
