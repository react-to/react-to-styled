import { Meta } from '@storybook/react'
import React from 'react'
import { styled } from 'styled-components'

import { Icon, IconNames } from '@react-to-styled/icon'

export default {
  title: 'Icon/All stories',
  component: Icon,
  parameters: {
    controls: {
      exclude: /.*/s,
    },
  },
} as Meta

export const AllIcons = () => {
  return (
    <Wrapper>
      {IconNames.map(iconName => (
        <div key={iconName}>
          <Icon name={iconName} />
          <div>{iconName}</div>
        </div>
      ))}
    </Wrapper>
  )
}

AllIcons.storyName = 'All icons'

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 1rem;

  svg {
    margin: auto;
  }
`
