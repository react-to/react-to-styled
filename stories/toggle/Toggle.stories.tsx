import { Meta } from '@storybook/react'
import React from 'react'
import { Toggle } from '@react-to-styled/toggle'

export default {
  title: 'Toggle/All stories',
  component: Toggle,
  parameters: {
    controls: {
      exclude: /.*/s,
    },
  },
} as Meta

export const ToggleDefault = () => {
  return <Toggle />
}

ToggleDefault.storyName = 'Toggle unchecked'

export const ToggleChecked = () => {
  return <Toggle checked />
}

ToggleChecked.storyName = 'Toggle checked'

export const ToggleCustomSizes = () => {
  const sizes = [
    { width: 24, padding: 3 },
    { width: 32, padding: 4 },
    { width: 48, padding: 6 },
    { width: 72, padding: 10 },
    { width: 128, padding: 16 },
  ]

  return sizes.map(sizes => <Toggle key={sizes.width} styleProps={sizes} />)
}

ToggleCustomSizes.storyName = 'Custom size togglers'
