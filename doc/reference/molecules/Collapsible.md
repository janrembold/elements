<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/Collapsible.jsx" and run build:docs to update this file.
-->
# Collapsible
A Collapsible is a simple container, that makes it possible to change between collapsed and extended states, and this way hiding and showing the children passed in.

```example
<ThemeProvider>
  <ResourceProvider>
    <Card
      {...css({
        width: '300px',
        margin: '10px 10px 10px 10px',
      })}
    >
      <Collapsible
        title="Address"
        hasBottomBorder
        initiallyCollapsed={false}
        tabIndex={1}
      >
        <View
          direction="row"
          {...css({
            width: '300px',
            padding: '5px 10px 10px 10px',
          })}
        >
          <Icon
            name="house"
            color="grey"
            {...css({ margin: '0px 20px 0px 30px' })}
          />
          <View direction="column">
            <Text {...css({ width: '150px', margin: '2px 0px' })}>
              Kaiser Joseph Str. 260
            </Text>
            <Text {...css({ width: '150px', margin: '2px 0px' })}>
              Freiburg Im Breisgau
            </Text>
          </View>
        </View>
      </Collapsible>
      <Collapsible
        title="Contact"
        initiallyCollapsed={true}
        tabIndex={2}
      >
        <View
          direction="column"
          {...css({
            width: '300px',
            padding: '0px 10px 10px 10px',
          })}
        >
          <View direction="row" {...css({ margin: '5px 0px' })}>
            <Icon
              name="phone"
              color="grey"
              {...css({ margin: '0px 20px 0px 30px' })}
              size="s"
            />
            <Text {...css({ width: '150px', margin: '2px 0px' })}>
              1(23) 456-7890
            </Text>
          </View>
          <View direction="row" {...css({ margin: '5px 0px' })}>
            <Icon
              name="email"
              color="grey"
              {...css({ margin: '0px 20px 0px 30px' })}
              size="s"
            />
            <Text {...css({ width: '150px', margin: '2px 0px' })}>
              your@email.com
            </Text>
          </View>
        </View>
      </Collapsible>
    </Card>
  </ResourceProvider>
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
