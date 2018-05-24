<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/RadioButtonSet.jsx" and run build:docs to update this file.
-->
# RadioButtonSet
RadioButtonSet can be used to render a set of RadioButtons to allow users to select exactly one item from a set.
Like gender (male / female) or sizes (s,m,l,xl)

```example

const gender = [
   { key: m, value: 'male' },
   { key: f, value: 'female' },
]

<RadioButtonSet name="gender" selection={gender} defaultValue="male" required />


const sizes = [
   { key: s, value: 'short' },
   { key: m, value: 'medium' },
   { key: l, value: 'large' },
   { key: xl, value: 'x-large' },
]

<RadioButtonSet
   name="sizes"
   selection={sizes}
   defaultValue="large"
   radioSetStyles={css({
                  margin: '0 50px',
                })}
   radioElementStyles={css({
                  width: '100%',
                  backgroundColor: '#f00',
                })}
   required
/>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|defaultValue|string|The default value to put into the component, without making it controlled
|name **(required)**|string|The name of this input field
|onChange|func|Called when a radio button is clicked
|selection **(required)**|array|an array of key/values
|backgroundColor|string|Background color of the form item
|labelSize|custom|Text size of the label one of xs,s,m,l,xl<br>Default: 'l'
|radioSetStyles|object|css object, that overwrites the default styles of the radio set
|radioElementStyles|object|css object, that overwrites the default styles of a single radio element
|required|bool|Mark if the RadioButton is required<br>Default: false
