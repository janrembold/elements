<!-- 
This is an auto-generated markdown. 
You can change it in "src/organisms/TitleBar.jsx" and run build:docs to update this file.
-->
# TitleBar
Title bar is used to give user control and information about navigation.

```example
<ThemeProvider>
  <TitleBar alignH="space-between" color="blueIntense">
    <View direction="row" alignV="center">
      <SquareIconButton icon="armchair-filled" iconColor="white" />
      <Text color="white" strong>
        Get Relaxed
      </Text>
    </View>
    <SquareIconButton icon="search-filled" iconColor="white" />
  </TitleBar>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|onClick|func|Callback when title bar is clicked
|color|string|Color of the title bar<br>Default: 'grey'
|children|node|
