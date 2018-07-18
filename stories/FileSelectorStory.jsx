import React from 'react'
import { css } from 'glamor'

import {
  Form,
  ThemeProvider,
  Card,
  Text,
  CardButton,
  CardFooter,
  View,
  FileSelector,
  Relative,
  Input,
} from '../src'

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
    <FileSelector multiple accept="image/*">
      {({ files, openFileDialog, getFilePreview, removeFile, resetFiles }) => (
        <Form
          onSubmit={(e, data) => {
            // Example:
            // const formData = new FormData()
            // files.forEach(file => formData.append('images[]', file))
            console.log(data, files)
            resetFiles()
          }}
        >
          <Card>
            <Text strong size="xl" align="center" {...css({ padding: 15 })}>
              Image uploader 🖼
            </Text>
            <Input
              name="description"
              placeholder="Describe your pictures here."
            />
            <View direction="row" wrap="wrap">
              {files.map(file => (
                <Relative
                  key={file.name + file.lastModified + file.size}
                  onClick={() => removeFile(file)}
                  {...imageOverlayStyle}
                >
                  <img
                    title={file.name}
                    src={getFilePreview(file)}
                    {...imageStyle}
                  />
                </Relative>
              ))}
            </View>

            <CardFooter>
              <CardButton onClick={openFileDialog}>
                <Text size="m">Add images</Text>
              </CardButton>
              <CardButton type="submit">
                <Text size="m">Send</Text>
              </CardButton>
            </CardFooter>
          </Card>
        </Form>
      )}
    </FileSelector>
  </ThemeProvider>
)

export default FileSelectorStory
