import React from 'react'
import { css } from 'glamor'

import Form from '../src/molecules/Form/Form'
import ThemeProvider from '../src/behaviour/ThemeProvider'
import Card from '../src/molecules/Card/Card'
import Text from '../src/atoms/Text'
import CardButton from '../src/molecules/Card/CardButton'
import CardFooter from '../src/molecules/Card/CardFooter'
import View from '../src/atoms/View'
import FileSelector from '../src/molecules/FileSelector'
import Relative from '../src/atoms/Relative'
import { action } from '@storybook/addon-actions'

const imageOverlayStyle = css({
  margin: 5,
  cursor: 'pointer',
  ':hover:after': {
    content: `'X'`,
    color: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontFamily: `'Open Sans'`,
  },
})

const imageStyle = css({
  objectFit: 'cover',
  width: 60,
  height: 60,
  cursor: 'pointer',
})

const FileSelectorStory = () => (
  <ThemeProvider>
    <Form onSubmit={action('submit')}>
      <FileSelector name="myImages" multiple accept="image/*">
        {({ files, openDialog, getPreview, removeFile, clear }) => (
          <Card>
            <Text strong size="xl" align="center" {...css({ padding: 15 })}>
              Image uploader 🖼
            </Text>
            <View direction="row" wrap="wrap">
              {files.map(file => (
                <Relative
                  key={file.name + file.lastModified + file.size}
                  onClick={() => removeFile(file)}
                  {...imageOverlayStyle}
                >
                  <img
                    title={file.name}
                    src={getPreview(file)}
                    {...imageStyle}
                  />
                </Relative>
              ))}
            </View>

            <CardFooter>
              <CardButton onClick={openDialog}>
                <Text size="m">Add images</Text>
              </CardButton>
              <CardButton onClick={clear} type="submit">
                <Text size="m">Send</Text>
              </CardButton>
            </CardFooter>
          </Card>
        )}
      </FileSelector>
    </Form>
  </ThemeProvider>
)

export default FileSelectorStory
