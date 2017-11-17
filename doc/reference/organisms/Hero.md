# Hero
Heros are used to give users an introduction and quickly explain features.

```example
<ThemeProvider>
    <Hero text="You are my Hero!" img="https://placeimg.com/500/500/people">
      <View fill direction="row" alignH="space-between" alignV="space-between">
        <Button backgroundColor="rgba(0,0,0,0.2)" color="white">Thank you</Button>
      </View>
    </Hero>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|color|string|Color of the hero, will be primary color by default<br>Default: 'grey'
|text|string|Text that will be announced with the Hero
|children|node|Additional children, try to avoid
|img|string|URL to image that will be rendered
