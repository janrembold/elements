import React from 'react'
import PropTypes from 'prop-types'

/**
 * The spinner is usefull to indicate a loading state
 *
 * ```example
 * <Spinner />
 * ```
 */
const Spinner = ({ size = 30 }) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <rect x="0" y="0" width="100" height="100" fill="none" />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#ffffff"
      fill="none"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#369980"
      fill="none"
      strokeWidth="8"
      strokeLinecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        repeatCount="indefinite"
        from="0"
        to="502"
      />
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        repeatCount="indefinite"
        values="125.5 125.5;1 250;125.5 125.5"
      />
    </circle>
  </svg>
)

Spinner.propTypes = {
  size: PropTypes.number,
}

export default Spinner
