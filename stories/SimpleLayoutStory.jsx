import React from 'react'
import {
  Text,
  ThemeProvider,
  ResourceProvider,
  SimpleLayout,
  Spinner,
  Hero,
  Inset,
} from '../src/'

class SimpleLayoutStory extends React.Component {
  state = {
    loading: true,
    text: '',
  }

  async componentDidMount() {
    this.fetchText()
  }

  fetchText = async () => {
    this.setState({ loading: true, text: '' })
    const response = await fetch(
      'https://baconipsum.com/api/?type=meat-and-filler'
    )
    const text = await response.json()
    setTimeout(() => {
      this.setState({
        text: text.reduce((prev, curr) => prev + curr),
        loading: false,
      })
    }, 1000)
  }

  render() {
    const { loading, text } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <SimpleLayout onPullDown={this.fetchText}>
            <Hero />
            <Inset vertical>
              {loading && <Spinner />}
              {text && <Text>{text}</Text>}
            </Inset>
          </SimpleLayout>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}

export default SimpleLayoutStory
