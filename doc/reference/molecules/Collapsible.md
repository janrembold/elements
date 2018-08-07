<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/Collapsible.jsx" and run build:docs to update this file.
-->
# Collapsible
A Collapsible is a simple container, that makes it possible to change between collapsed and extended states, and this way hiding and showing the children passed in.
```js
<ThemeProvider>
 <Card>
   <Collapsible
     title="Address"
     hasBottomBorder
     initiallyCollapsed={false}
     tabIndex={1}
   >
     <CardContent>
       <Text>Kaiser Joseph Str. 260</Text>
     </CardContent>
   </Collapsible>
   <Collapsible
       title="Contact"
       initiallyCollapsed={true}
       tabIndex={2}
   >
     <CardContent>
       <Text>1(23) 456-7890</Text>
     </CardContent>
   </Collapsible>
 </Card>
</ThemeProvider>
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|title|string|
|children|node|
|initiallyCollapsed|bool|<br>Default: true
|hasBottomBorder|bool|<br>Default: false
|tabIndex|number|<br>Default: null
|onToggle|func|<br>Default: () => {}
