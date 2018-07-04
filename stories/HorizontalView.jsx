import React from 'react'
import {
  ThemeProvider,
  TitleBar,
  SquareIconButton,
  Text,
  Button,
  View,
  CardList,
  ListItem,
  ResourceProvider,
} from '../src'
import HorizontalView from '../src/behaviour/HorizontalView'

export default class HorizontalViewStory extends React.Component {
  state = {
    level: 3,
  }

  prevLevel = () =>
    this.setState(state => ({
      level: state.level - 1,
    }))

  nextLevel = () =>
    this.setState(state => ({
      level: state.level + 1,
    }))

  render() {
    return (
      <ResourceProvider>
        <ThemeProvider>
          <View fill direction="column" alignV="stretch">
            <TitleBar alignH="space-between" color="blueIntense">
              <View direction="row" alignV="center">
                <SquareIconButton icon="ArmchairFilledIcon" iconColor="white" />
                <Text color="white" strong>
                  Get Relaxed
                </Text>
              </View>
              <SquareIconButton icon="SearchFilledIcon" iconColor="white" />
            </TitleBar>
            <View direction="row" flex="flex">
              <HorizontalView>
                <Text>hi1</Text>
                <Text id="second">hi2</Text>
              </HorizontalView>
            </View>
            <View direction="row" alignH="space-around" style={{ margin: 15 }}>
              <Button onClick={this.prevLevel} disabled={this.state.level <= 1}>
                Back
              </Button>
              <Button onClick={this.nextLevel} disabled={this.state.level >= 6}>
                Next
              </Button>
            </View>
          </View>
        </ThemeProvider>
      </ResourceProvider>
    )
  }
}
