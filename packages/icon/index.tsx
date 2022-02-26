import { Loader } from '@react-to-styled/loader'
import React from 'react'
import InlineSVG, { Props } from 'react-inlinesvg'
import styled from 'styled-components'

export const IconNames = ['arrow_down', 'close'] as const
type IconNamesType = typeof IconNames[number]

export interface IconProps extends Omit<Props, 'src'> {
  /**
   * Possible values for `name` prop of `Icon` component.
   */
  readonly name: IconNamesType
  /**
   * This number represents width and height of icon. Defaults to 16px
   * */
  readonly size?: number
  /**
   * This represents icon color you want to render
   * */
  readonly color?: string
}

export const Icon = styled(
  ({
    name,
    size = 16,
    color = 'gray',
    className,
    ...props
  }: IconProps): JSX.Element => {
    const icon = require(`./icons/${name}.svg`) as string
    return (
      <InlineSVG
        src={icon}
        loader={<Loader loaderSize={size} />}
        style={{ width: size, height: size, fill: color }}
        className={`rts-icon ${className}`}
        {...props}
      />
    )
  },
)`
  display: flex;
  align-items: center;
  justify-content: center;
`
