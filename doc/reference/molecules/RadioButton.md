<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/RadioButton.jsx" and run build:docs to update this file.
-->
# RadioButton
RadioButtonSet can be used to render a set of RadioButtons to allow users to select exactly one item from a set.
Like gender (male / female) or sizes (s,m,l,xl)

```example
<RadioButtonSet name="gender" defaultValue="male" required>
  <RadioButton value="female">Female</RadioButton>
  <RadioButton value="male">Male</RadioButton>
</RadioButtonSet>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|backgroundColor|string|Background color of the form item
|checked|bool|Set to true to controll radio button
|children|node|Label of the radio button
|id|string|Background color of the form item
|inputRef|func|reference to the input field
|name|string|The name of this input field
|onChange|func|Called when a radio button is clicked
|required|bool|Mark if the RadioButton is required<br>Default: false
|value **(required)**|string|The value the checkbox will have
