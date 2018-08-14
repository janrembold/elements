<!-- 
This is an auto-generated markdown. 
You can change it in "src/organisms/Typeahead.jsx" and run build:docs to update this file.
-->
# Typeahead

## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|autoOpen|bool|Forces the menu to be opened when clicking in the input.
|clearOnSelect|bool|Automatically clears the selection. Must not be used with controlled
and uncontrolled components.
|defaultValue|string|The default value of the component, without making it controlled.
|isLoading|bool|The loading state of the component, e.g when externally fetching some
data.
|items **(required)**|arrayOf|The items passed to component as an array of objects.
|limit|number|The maximum number of items displayed in the menu.<br>Default: 20
|menuHeight|number|The height of the menu in pixels.<br>Default: 300
|onClearSelection|func|Callback triggered when clearing the selection.<br>Default: _ => _
|onClose|func|Callback triggered when the menu is closed.<br>Default: _ => _
|onInputValueChange|func|Callback triggered when the input value is modified.
|onOpen|func|Callback triggered when the menu is opened.<br>Default: _ => _
|onSelect|func|Callback triggered when selecting an item.
|placeholder|string|The placeholder displayed in the input field.
|value|string|The value of the component, makes this a controlled component.
