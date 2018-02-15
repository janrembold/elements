<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/PhoneInput.jsx" and run build:docs to update this file.
-->
# PhoneInput
PhoneInputs are used to enter international phone numbers - country codes are mandatory.
For non-international numbers, please see our TextInput component.

Features:
Entered information will automatically be formatted according to the country code.
Currently, area codes are only formatted for Austria, France, Germany, Italy, Portugal, Switzerland, and the United States.

```example
<PhoneInput name="phone" placeholder="Example Placeholder" defaultValue="4907615555555" required />
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|required|bool|Indicates that this field is required
|name **(required)**|string|The name of this input field
|onChange|func|Called, when the users changes something
|defaultValue|string|Prefilled default value (optional)
|placeholder|string|Value of placeholder
