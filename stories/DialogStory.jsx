import React from 'react'
import {
  ThemeProvider,
  View,
  TitleBar,
  Text,
  SimpleLayout,
  ResourceProvider,
  SquareIconButton,
  Card,
  List,
  ListItem,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../src'

export default class DialogStory extends React.Component {
  state = {
    regularDialogActive: false,
  }

  handleRegularDialog = () =>
    this.setState(state => ({
      regularDialogActive: true,
    }))

  render() {
    return (
      <ResourceProvider>
        <ThemeProvider theme={{ primary: '#bada55' }}>
          <View direction="column" flex="flex">
            <TitleBar>
              <SquareIconButton icon="login-key" iconColor="white" />
              <Text strong color="white">
                Testing a dialog
              </Text>
            </TitleBar>
            <SimpleLayout>
              <Card>
                <List>
                  <ListItem onClick={this.handleRegularDialog}>
                    <Text>Open default Dialog</Text>
                  </ListItem>
                </List>
              </Card>

              <Dialog { ...this.state.regularDialogActive ? 'active' : undefined } >
                <DialogTitle>
                  <TitleBar>
                      <View style={{ padding: '16px 16px 16px 0' }} />
                      <Text strong color="white">
                          Dialog Title
                      </Text>
                  </TitleBar>
                </DialogTitle>
                <DialogContent>
                  <Text size="xl" strong>
                      Dialog Content
                  </Text>
                  <Text>
                      This is the looong story of this Dialog
                  </Text>
                </DialogContent>
                <DialogFooter>
                  <Text>
                    DialogFooter
                  </Text>
                </DialogFooter>
              </Dialog>


            </SimpleLayout>
          </View>
        </ThemeProvider>
      </ResourceProvider>
    )
  }
}
