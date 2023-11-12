import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Loader, LoaderProps } from '@react-to-styled/loader'

export default {
  title: 'Loader/Properties',
  component: Loader,
  args: {
    wrapperHeight: 300,
    loaderSize: 100,
  },
  argTypes: {
    wrapperHeight: {
      control: {
        type: 'range',
        min: 0,
        max: 1000,
        step: 100,
      },
    },
    loaderSize: {
      control: {
        type: 'range',
        min: 0,
        max: 150,
        step: 10,
      },
    },
  },
} as Meta<LoaderProps>

export const LoaderProperties: Story<LoaderProps> = args => {
  return <Loader {...args} />
}

LoaderProperties.storyName = 'Properties'
