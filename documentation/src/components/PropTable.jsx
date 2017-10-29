import React from 'react'
import PropTypes from 'prop-types'

export default class PropTable extends React.Component {
  static propTypes = {
    props: PropTypes.object,
  }

  renderType = e => {
    return `${e.propType}`
  }

  renderValues = e => {
    switch (e.propType) {
      case 'bool':
        return 'true, false'
      case 'enum':
        return e.values.map ? e.values.map(({ value }) => value).join(', ') : ''
      default:
        return ''
    }
  }

  render() {
    const accumProps = {}
    const { props } = this.props
    if (props) {
      Object.keys(props).forEach(property => {
        const typeInfo = props[property]
        const required = typeInfo.required ? 'yes' : 'no'
        const description = typeInfo.description
        const defaultValue =
          typeInfo.defaultValue && typeInfo.defaultValue.value
        const propType = typeInfo.type.name

        let values = '-'
        if (propType === 'enum') {
        }

        accumProps[property] = {
          property,
          propType,
          defaultValue,
          required,
          description,
          values,
        }
      })
    }

    const array = Object.values(accumProps)

    if (!array.length) {
      return <small>No propTypes defined!</small>
    }

    array.sort((a, b) => a.property > b.property)

    return (
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {array.map(i => (
            <tr key={i.property}>
              <td>
                {i.property} {i.required === 'yes' && '(required)'}{' '}
              </td>
              <td>{this.renderType(i)}</td>
              <td>{i.description}</td>
              <td>{this.renderValues(i)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
