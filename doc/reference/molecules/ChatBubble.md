<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/ChatBubble.jsx" and run build:docs to update this file.
-->
# ChatBubble
ChatBubble are used to show conversations between to or more users.

```example
<ThemeProvider>
  <View>
    <ChatBubble
      text="Hello World"
      userName="You"
      userImage="https://placeimg.com/40/40/people?t=3"
      date="a minute ago"
    />
    <ChatBubble
      direction="right"
      text="Hello You"
      userName="Agent"
      userImage="https://placeimg.com/40/40/people?t=1"
      date="just now"
    />
  </View>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|userName **(required)**|string|
|userImage|union|
|date **(required)**|node|
|text **(required)**|node|
|background|string|<br>Default: 'white'
|direction|enum|<br>Default: 'left'
|fontColor|string|<br>Default: 'text'
