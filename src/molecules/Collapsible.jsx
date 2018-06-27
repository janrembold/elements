import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import { View, Icon, Text } from '../'
import { ColorPalette, alpha } from '@allthings/colors'

/**
 *   A Collapsible is a simple container, that makes it possible to change between collapsed and extended states, and this way hiding and showing the children passed in.
 * ```example
 * <ThemeProvider>
 *   <ResourceProvider>
 *     <Card
 *       {...css({
 *         width: '300px',
 *         margin: '10px 10px 10px 10px',
 *       })}
 *     >
 *       <Collapsible
 *         title="Address"
 *         hasBottomBorder
 *         initiallyCollapsed={false}
 *         tabIndex={1}
 *       >
 *         <View
 *           direction="row"
 *           {...css({
 *             width: '300px',
 *             padding: '5px 10px 10px 10px',
 *           })}
 *         >
 *           <Icon
 *             name="house"
 *             color="grey"
 *             {...css({ margin: '0px 20px 0px 30px' })}
 *           />
 *           <View direction="column">
 *             <Text {...css({ width: '150px', margin: '2px 0px' })}>
 *               Kaiser Joseph Str. 260
 *             </Text>
 *             <Text {...css({ width: '150px', margin: '2px 0px' })}>
 *               Freiburg Im Breisgau
 *             </Text>
 *           </View>
 *         </View>
 *       </Collapsible>
 *       <Collapsible
 *         title="Contact"
 *         initiallyCollapsed={true}
 *         tabIndex={2}
 *       >
 *         <View
 *           direction="column"
 *           {...css({
 *             width: '300px',
 *             padding: '0px 10px 10px 10px',
 *           })}
 *         >
 *           <View direction="row" {...css({ margin: '5px 0px' })}>
 *             <Icon
 *               name="phone"
 *               color="grey"
 *               {...css({ margin: '0px 20px 0px 30px' })}
 *               size="s"
 *             />
 *             <Text {...css({ width: '150px', margin: '2px 0px' })}>
 *               1(23) 456-7890
 *             </Text>
 *           </View>
 *           <View direction="row" {...css({ margin: '5px 0px' })}>
 *             <Icon
 *               name="email"
 *               color="grey"
 *               {...css({ margin: '0px 20px 0px 30px' })}
 *               size="s"
 *             />
 *             <Text {...css({ width: '150px', margin: '2px 0px' })}>
 *               your@email.com
 *             </Text>
 *           </View>
 *         </View>
 *       </Collapsible>
 *     </Card>
 *   </ResourceProvider>
 * </ThemeProvider>
 *  ```
 **/

class Collapsible extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    initiallyCollapsed: PropTypes.bool,
    hasBottomBorder: PropTypes.bool,
    tabIndex: PropTypes.number,
    toggleCallback: PropTypes.func,
  }

  static defaultProps = {
    initiallyCollapsed: true,
    hasBottomBorder: false,
    tabindex: -1,
    toggleCallback: () => {},
  }

  state = { collapsed: this.props.initiallyCollapsed }

  componentDidMount() {
    if (this.childRef.current) {
      if (!this.props.initiallyCollapsed) {
        this.childRef.current.style.height = `${
          this.childRef.current.scrollHeight
        }px`
      } else {
        this.childRef.current.style.height = `0px`
      }
    }
  }

  childRef = React.createRef()

  toggleCollapse = () => {
    const { current } = this.childRef
    if (current.style.height !== '0px') {
      current.style.height = '0px'
      this.setState({ collapsed: true })
      // signal new state for the parent
      this.props.toggleCallback(true)
    } else {
      current.style.height = `${current.scrollHeight}px`
      this.setState({ collapsed: false })
      // signal new state for the parent
      this.props.toggleCallback(false)
    }
  }

  onKeyPress = e => e.key === 'Enter' && this.toggleCollapse()

  render() {
    const { title, children, hasBottomBorder, tabIndex } = this.props
    return (
      <View
        direction="column"
        {...css({
          borderBottom: hasBottomBorder
            ? `1px solid ${ColorPalette.lightGrey}`
            : '',
          width: '100%',
        })}
      >
        {/* Header bar */}
        <View
          direction="row"
          alignH="space-between"
          onClick={this.toggleCollapse}
          {...css({
            backgroundColor: 'white',
            cursor: 'pointer',
          })}
        >
          {/* Title */}
          <View
            direction="row"
            alignV="center"
            {...css({
              height: 50,
              padding: '0 20px',
              width: 'calc(100% - 50px)',
            })}
          >
            <Text
              strong
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Text>
          </View>
          {/* arrow */}
          <View
            direction="row"
            alignV="center"
            alignH="center"
            {...css({
              width: '50px',
              height: '50px',
            })}
          >
            <View
              {...css({
                padding: '3px 5px 8px 5px',
                borderRadius: '2px',
                ':focus': { border: `2px solid ${alpha('#59baf7', 0.5)}` },
                outline: 'none',
              })}
              onKeyPress={this.onKeyPress}
              tabIndex={tabIndex}
            >
              <Icon
                name={
                  this.state.collapsed ? 'arrow-down-filled' : 'arrow-up-filled'
                }
                size={10}
                color="lightGreyIntense"
              />
            </View>
          </View>
        </View>
        {/* Child */}
        <View
          onRef={this.childRef}
          {...css({
            transitionProperty: 'height',
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            overflow: 'hidden',
            transformOrigin: 'top',
          })}
        >
          {children}
        </View>
      </View>
    )
  }
}

export default Collapsible