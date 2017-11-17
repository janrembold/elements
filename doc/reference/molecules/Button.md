# Button
Buttons make common actions immediately visible and easy to perform with one
click or tap. They can be used for any type of action, including navigation.

You can use two different looks for the button: primary and
secondary. Primary is the default type, so there's no need to explicitly
define it.

```example
<ThemeProvider>
  <Button>Hello you</Button>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|children **(required)**|node|Just text most of the time
|onClick|func|Called when the button is clicked
|type|enum|Type of the button (deprecated)<br>Default: 'button'
|disabled|bool|Disable button state to indicate it's not touchable<br>Default: false
|backgroundColor|string|Color of the button, theme primary color by default<br>Default: 'purple'
|color|custom|Textcolor of the button (deprecated)<br>Default: 'white'
|disabledColor|string|Textcolor when button is disabled (deprecated)<br>Default: 'darkgray'
|disabledBackgroundColor|string|Color when button is disabled (deprecated)<br>Default: 'lightGray'
|css|object|Pass your own css (deprecated)
