import { Loader } from '@react-to-styled/loader'
import React from 'react'
import InlineSVG, { Props } from 'react-inlinesvg'
import styled from 'styled-components'

export const IconNames = ['arrow-down'] as const
type IconNamesType = typeof IconNames[number]

export interface IconProps extends Omit<Props, 'src'> {
  /**
   * Possible values for `name` prop of `Icon` component.
   */
  name: IconNamesType
  /**
   * This number represents width and height of icon. Defaults to 16px
   * */
  size?: number
  /**
   * This represents icon color you want to render
   * */
  color?: string
}

export const Icon = styled(
  ({ name, size = 16, color = 'gray', ...props }: IconProps): JSX.Element => {
    const icon = require(`./icons/${name}.svg`) as string
    return (
      <InlineSVG
        src={icon}
        loader={<Loader loaderSize={size} />}
        style={{ width: size, height: size, fill: color }}
        {...props}
      />
    )
  },
)`
  display: flex;
  align-items: center;
  justify-content: center;
`
