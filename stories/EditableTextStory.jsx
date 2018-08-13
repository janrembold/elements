import React from 'react'
import {
  EditableText,
  ResourceProvider,
  Text,
  ThemeProvider,
  View,
} from '../src/'
import { css } from 'glamor'

const DEFAULT_TEXT = 'Edit me!'
const MARGIN = 15 // px
const STATUSES = {
  DEFAULT: 'edit',
  PROGRESS: 'sand-glass',
  DONE: 'check',
}

const STYLES = {
  editable: css({ minWidth: '3rem' }),
  title: (first = false) =>
    css({
      margin: `${MARGIN * (first ? 1 : 2)}px 0 ${MARGIN}px 0`,
    }),
}

class EditableTextStory extends React.Component {
  state = {
    status: STATUSES.DEFAULT,
    text: DEFAULT_TEXT,
  }

  handleBlur = ({ currentTarget: { innerText } }) => {
    this.setState({ status: STATUSES.PROGRESS })
    setTimeout(() => this.setState({ status: STATUSES.DONE }), 500)
  }

  render() {
    const { status, text } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column" {...css({ padding: '10px 20px' })}>
            <Text strong {...STYLES.title(true)}>
              Default editable text
            </Text>
            <EditableText {...STYLES.editable}>{DEFAULT_TEXT}</EditableText>

            <Text strong {...STYLES.title()}>
              Editable text with a custom icon and icon color
            </Text>
            <EditableText
              icon="chat"
              iconColor="purpleIntense"
              {...STYLES.editable}
            >
              {DEFAULT_TEXT}
            </EditableText>

            <Text strong {...STYLES.title()}>
              Editable text with a custom decoration color
            </Text>
            <EditableText decorationColor="purpleIntense" {...STYLES.editable}>
              {DEFAULT_TEXT}
            </EditableText>

            <Text strong {...STYLES.title()}>
              Editable text reacting on the onBlur event (fake request)
            </Text>
            <EditableText
              decorationColor="purpleIntense"
              icon={status}
              onBlur={this.handleBlur}
              {...STYLES.editable}
            >
              {text}
            </EditableText>
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default EditableTextStory
