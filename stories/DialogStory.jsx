import React from 'react'
import {
  ThemeProvider,
  View,
  TitleBar,
  Text,
  SimpleLayout,
  ResourceProvider,
  SquareIconButton,
  Button,
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
    secondDialogActive: false,
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
                  <ListItem onClick={()=>this.setState({regularDialogActive: true})}>
                    <Text>Open App-Style Dialog</Text>
                  </ListItem>
                  <ListItem onClick={()=>this.setState({secondDialogActive: true})}>
                    <Text>Open differently styled Dialog</Text>
                  </ListItem>
                </List>
              </Card>

              <Dialog active={this.state.regularDialogActive} >
                <DialogTitle padding="0">
                  <TitleBar>
                      <View style={{ padding: '16px 16px 16px 0' }} />
                      <Text strong color="white">
                          Dialog Title
                      </Text>
                  </TitleBar>
                </DialogTitle>
                <DialogContent>
                  <Text strong>
                      Dialog Content
                  </Text>
                  <Text>
                      This is the looong story of this Dialog
                  </Text>
                </DialogContent>
                <DialogFooter>
                  <Button onClick={()=>this.setState({regularDialogActive: false})}>Ok, cool</Button>
                  <Button backgroundColor="whiteIntense" color="grey" onClick={()=>this.setState({regularDialogActive: false})}>Cancel</Button>
                </DialogFooter>
              </Dialog>

              <Dialog active={this.state.secondDialogActive} >
                <DialogTitle>
                    <Text strong color="red" size="giant">
                        Dialog Title
                    </Text>
                </DialogTitle>
                <DialogContent>
                  <Text strong>
                      Dialog Content
                  </Text>
                  <Text>
                      This is the looong story of this Dialog
                  </Text>
                </DialogContent>
                <DialogFooter padding="15px 0 15px 0">
                  <Button size="xs" backgroundColor="white" color="red" onClick={()=>this.setState({secondDialogActive: false})}>Ok, cool</Button>
                  <Button size="xs" backgroundColor="white" color="grey" onClick={()=>this.setState({secondDialogActive: false})}>Cancel</Button>
                </DialogFooter>
              </Dialog>

            </SimpleLayout>
          </View>
        </ThemeProvider>
      </ResourceProvider>
    )
  }
}
