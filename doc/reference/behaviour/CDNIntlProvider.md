<!-- 
This is an auto-generated markdown. 
You can change it in "src/behaviour/CDNIntlProvider.jsx" and run build:docs to update this file.
-->
# CDNIntlProvider

## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|children|node|
|fetchMethod|func|Optional alternative fetch like method
|locale **(required)**|string|Locale you like to get, EN_us, DE_de
|messages|object|Optionally pass messages. This will prevent initial loading.
|onDone|func|Called when new languages got loaded<br>Default: _ => _
|project **(required)**|string|The project ID loading the langauges for
|stage|enum|Stage, can be production and staging<br>Default: 'production'
|variation|string|"Default" by default. Can be any allowed variation string.<br>Default: 'default'
