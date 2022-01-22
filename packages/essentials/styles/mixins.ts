import { metrics } from '@react-to-styled/essentials'
import { css } from 'styled-components'

type ClassNameProp = { className: string }
/**
 * Check if an element contains className 'u-full-width' and set its width and max-width to 100%
 */
export const FullWidth = ({ className = '' }: ClassNameProp) => css`
  ${className.split(' ').includes('u-full-width') && 'width: 100%'}
`

/**
 * Set column referse for flex element
 * Check if an element contains className 'u-column-reverse'
 */
export const ColumnReverse = ({ className = '' }: ClassNameProp) => css`
  ${className.split(' ').includes('u-column-reverse') &&
  'flex-direction: column-reverse'}
`

/**
 * Set font size based on className prop
 * Possible values: 'u-text-xsmall' and 'u-text--small
 * Default : 'u-text--regular'
 */
export const Size = ({ className = '' }: ClassNameProp) => {
  const classes = className.split(' ')
  const getFontSize = () => {
    if (classes.includes('u-text--xsmall')) {
      return 0.875
    } else if (classes.includes('u-text--small')) {
      return 1
    } else if (classes.includes('u-text--medium')) {
      return 1.25
    } else if (classes.includes('u-text--large')) {
      return 1.5
    }
    return 1.25
  }
  return css`
    font-size: ${getFontSize()}rem;
  `
}

/**
 * Utility classs that removes something from the screen on some breakpoint.
 */
/** */
export const Hidden = ({ className = '' }: ClassNameProp) => {
  const classes = className.split(' ')

  if (classes.includes('u-hidden--desktop-up')) {
    return css`
      @media (min-width: ${metrics.desktop}px) {
        display: none;
      }
    `
  } else if (classes.includes('u-hidden--tablet-up')) {
    return css`
      @media (min-width: ${metrics.tablet}px) {
        display: none;
      }
    `
  } else if (classes.includes('u-hidden--tablet-down')) {
    return css`
      @media (max-width: ${metrics.tablet}px) {
        display: none !important;
      }
    `
  }
}
