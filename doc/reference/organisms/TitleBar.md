# TitleBar
Title bar is used to give user control and information about navigation.

```example
<ThemeProvider>
  <TitleBar alignH="space-between" color="blueIntense">
    <View direction="row" alignV="center">
      <SquareIconButton icon="ArmchairFilledIcon" iconColor="white" />
      <Text color="white" strong>
        Get Relaxed
      </Text>
    </View>
    <SquareIconButton icon="SearchFilledIcon" iconColor="white" />
  </TitleBar>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|onClick|func|Callback when title bar is clicked
|color|string|Color of the title bar<br>Default: 'grey'
|children|node|