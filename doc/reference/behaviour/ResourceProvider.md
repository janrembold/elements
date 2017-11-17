# ResourceProvider
Elements uses a set of static resources like images or icons.
In order to benefit from caching across all apps, these resources are provided by a static asset CDN.

Whenever you like to use Icons or Illustrations, you need to use the ResouceProvider to let the components know where they are.
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|resourcePath **(required)**|string|<br>Default: 'https://static.allthings.me'
|children **(required)**|node|<br>Default: null
