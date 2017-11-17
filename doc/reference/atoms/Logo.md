# Logo
The Allthings logo

```example
<ThemeProvider>
 <View style={{ background: '#bada55', padding: 15 }}>
   <Relative>
     <Logo size={80} onClick={this.handleClick} />
     <CountIndicator top="55" left="50" count={this.state.count} />
   </Relative>
 </View>
</ThemeProvider>
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|onClick|func|Callback when user clicks the logo
|size|number|Size of the number in pixels
