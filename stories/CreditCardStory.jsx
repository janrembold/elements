import React from 'react'
import {
  ThemeProvider,
  TitleBar,
  SquareIconButton,
  Text,
  CreditCardInput,
  View,
  CardList,
  ListItem,
  ResourceProvider,
} from '../src'
import HorizontalView from '../src/behaviour/HorizontalView'

export default class HorizontalViewStory extends React.Component {
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
              <CreditCardInput />
            </View>
          </View>
        </ThemeProvider>
      </ResourceProvider>
    )
  }
}
