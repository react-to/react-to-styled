import { Loader } from '@react-to-styled/loader'
import { Meta } from '@storybook/react'
import React from 'react'
import { Icon, IconNames } from '@react-to-styled/icon'
import styled from 'styled-components'

export default {
  title: 'Icon/All stories',
  component: Icon,
  parameters: {
    controls: {
      exclude: /.*/s,
    },
  },
} as Meta

export const IconPreLoader = () => {
  return <Icon name="arrow_down" loader={<Loader loaderSize={16} />} />
}

IconPreLoader.storyName = 'Icon loading'

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
