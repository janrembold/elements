# [@allthings/elements](https://github.com/allthings/elements)

<img alt="npm version" src="https://badge.fury.io/js/%40allthings%2Felements.svg"> [![Build Status](https://travis-ci.org/allthings/elements.svg?branch=master)](https://travis-ci.org/allthings/elements) [![Greenkeeper badge](https://badges.greenkeeper.io/allthings/elements.svg)](https://greenkeeper.io/)



 Elements is a set of **carefully crafted, high quality React UI components,** that [Allthings](https://www.allthings.me) uses to build their mobile app.

## Installation

Elements are available on [npm package](https://www.npmjs.com/package/@allthings/elements).

```sh
yarn add @allthings/elements
```

Please note that `@allthings/elements` is still under heavy development.

## Usage

Here is a quick example to get you started, it's all you need:

```jsx
import React from 'react'
import { render } from 'react-dom'
import Button from '@allthings/elements/molecules/Button'

function App() {
  return (
    <Button>
      Hello World
    </Button>
  )
}

render(<App />, document.querySelector('#app'))
```

## Examples

Are you looking for a full example project to get started?
[Check this out](https://github.com/allthings/elements-example).

## Documentation

Check out our [documentation website](https://developers.allthings.me/elements/index.html).
