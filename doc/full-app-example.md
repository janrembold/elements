# Full app example
```example
<ResourceProvider>
  <ThemeProvider theme={{primary: "#bada55"}}>
    <View direction="column" flex="flex">
      <TitleBar>
        <SquareIconButton
          icon="emailFilled" iconColor="white"
        />
        <Text strong color="white">
          My Mails
        </Text>
      </TitleBar>
      <SimpleLayout>
        <Card>
          <List>
            <ListItem alignH="space-between">
              <View direction="row" alignV="center">
                <Circle color="primary" radius={8}/>
                <Inset>
                  <Text strong>Mark Mauferd</Text>
                  <Text size="s">Sprint Review tomorrow will be at 3pm</Text>
                </Inset>
              </View>
              <Text size="s">12.04.2018</Text>
            </ListItem>
            <ListItem alignH="space-between">
              <View direction="row" alignV="center">
                <Circle color="primary" radius={8} color="grey" />
                <Inset>
                  <Text strong>Dex Kent</Text>
                  <Text size="s">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </Text>
                </Inset>
              </View>
              <Text size="s">12.04.2018</Text>
            </ListItem>
            <ListItem alignH="space-between">
              <View direction="row" alignV="center">
                <Circle color="primary" radius={8} color="grey" />
                <Inset>
                  <Text strong>Reginald Ernest</Text>
                  <Text size="s">Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean...</Text>
                </Inset>
              </View>
              <Text size="s">12.04.2018</Text>
            </ListItem>
            <ListItem alignH="space-between">
              <View direction="row" alignV="center">
                <Circle color="primary" radius={8} color="grey" />
                <Inset>
                  <Text strong>Walter Indiana</Text>
                  <Text size="s">A small river named Duden flows by their place and supplies it with the necessary regelialia.</Text>
                </Inset>
              </View>
              <Text size="s">12.04.2018</Text>
            </ListItem>
          </List>
        </Card>
      </SimpleLayout>
    </View>
  </ThemeProvider>
</ResourceProvider>
```
