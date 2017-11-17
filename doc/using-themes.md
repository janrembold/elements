# Using Themes

## How themes are provided
To get started with theming, wrap your application in the **ThemeProvider**.
Note: You only need one ThemeProvider in your application. 
However if you like to change your theme deep in your component tree, you can nest. 
        
```diff
import React from 'react'
+ import {
+   ThemeProvider
+ } from '@allthings/elements/behavior/ThemeProvider';

export default class Application extends React.Component {
    render() {
      return (
+       <ThemeProvider theme={{primary: 'red'}}>
          <Button>
            This is a red button
          </Button>
+       </ThemeProvider>
      );
    }
  }
```

## How to theme a component</h3>

To make a component themable a higher-order-component (HoC) is provided. With this HoC you can wrap your component.<br />

```js
import { withTheme } from '@allthings/elements/behaviours/ThemeProvider'

withTheme(Component, [mapThemeToProps], [displayName])
```
Simply wrap a component with *withTheme* and a property theme gets passed:

```js
import { withTheme } from '@allthings/elements/behaviours/ThemeProvider'

const Component = ({ theme }) => (
  <div style={{ background: theme.primary }}>Component</div>
)

const ThemedComponent = withTheme(Component)
```

You can also directly map the theme values to the properties via the second parameter <code>mapThemeToProps</code>. All other properties will also be passed through.

```js
const Component = ({ background }) => (
  <div style={{ background }}>Component</div>
)

const ThemedComponent = withTheme(
  Component,
  theme => ({ background: theme.primary })
)
```

```example
<ThemeProvider theme={{ primary: 'redIntense' }} root>
  <View direction="column" flex="nogrow">
    <Button>Default button</Button>
    <Line />
    <ThemeProvider theme={{ primary: 'greenIntense' }}>
      <View flex="flex" direction="column">
        <Button>Themed button</Button>
        <Line />
        <Button color="blue">Customized + themed button</Button>
      </View>
    </ThemeProvider>
  </View>
</ThemeProvider>
```
