<!-- 
This is an auto-generated markdown. 
You can change it in "src/molecules/NotificationBubble.jsx" and run build:docs to update this file.
-->
# NotificationBubble
NotificationBubbles are used to inform users about important
information, when an action has failed or succeeded. They're a most
prominent ways to communicate to merchants. NotificationBubbles are
always visible and pop up at the bottom of a page.

## Best practises
- Do use them when you otherwise users won't have any feedback.
- Don't use them extensive.
- Don't use them when no feedback is required.

To use NotificationBubbles you need to wrap the **NotificationBubbleManager** around your app.
Use `sendSuccess()` exported by the NotificationBubbleManager to show a Notification.

```example
import NotificationBubbleManager, { sendSuccess } from '@allthings/elements/behaviour/NotificationBubbleManager'
import { Button } from '@allthings/elements'

const ShowNotification = () => (
  <NotificationBubbleManager>
    <View>
      <Button onClick={() => sendSuccess('Congratulations, you clicked the Button')}>
        Click me!
      </Button>
    </View>
  </NotificationBubbleManager>
)
```
## Usage
| Name        | Type           | Description  |
| ----------- |:--------------:| ------------:|
|color **(required)**|string|<br>Default: 'primary'
|children **(required)**|node|
|onTimeout **(required)**|func|<br>Default: _ => _
