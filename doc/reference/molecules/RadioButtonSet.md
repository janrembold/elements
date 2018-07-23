<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/RadioButtonSet.jsx" and run build:docs to update this file.
-->
# RadioButtonSet
RadioButtonSet can be used to render a set of RadioButtons to allow users to select exactly one item from a set.

```example
<RadioButtonSet
   name="order"
   defaultValue="tee"
   required
>
  <RadioButton value="coffe">Coffe</RadioButton>
  <RadioButton value="tee">Tee</RadioButton>
  <RadioButton value="others">Others</RadioButton>
</RadioButtonSet>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|children **(required)**|node|Pass in RadioButton[]
|defaultValue|string|The default value to put into the component, without making it controlled
|direction|enum|Customize direction<br>Default: 'auto'
|label|string|The label of this input field
|name **(required)**|string|The name of this input field
|onChange|func|Called when a radio button is clicked
|required|bool|Pass true to mark the field as required
