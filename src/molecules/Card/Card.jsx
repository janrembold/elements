import PropTypes from 'prop-types'
import React from 'react'
import View from '../../atoms/View'
import { css } from 'glamor'

const style = css({
  width: '100%',
  background: 'white',
  boxShadow: '2px 2px 2px rgba(230, 230, 230, 0.5)',
})

/**
 * Cards can be used to group related content
 *
 * ```example
 * <Card>
 *  <CardContent>
 *    <Text size="xl" strong>
 *      Cards
 *    </Text>
 *    <Text>
 *      Cards are the basic elements to fit content in. They can may
 *      contain any kind of content.
 *    </Text>
 *  </CardContent>
 * </Card>
 * ```
 */
const Card = ({ children, containerStyle, ...props }) => {
  return (
    <View {...css(style, containerStyle)} {...props}>
      {children}
    </View>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  containerStyle: PropTypes.object,
}

export default Card
