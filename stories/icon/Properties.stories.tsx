import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Icon, IconProps } from '@react-to-styled/icon'

export default {
  title: 'Icon/Properties',
  component: Icon,
  args: { name: 'arrow_down', size: 16, color: 'black' },
} as Meta<IconProps>

export const LoaderProperties: Story<IconProps> = args => {
  return <Icon {...args} />
}

LoaderProperties.storyName = 'Properties'
