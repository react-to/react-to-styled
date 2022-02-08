import { useArgs } from '@storybook/client-api'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Toggle, ToggleProps } from '@react-to-styled/toggle'

export default {
  title: 'Toggle/Properties',
  component: Toggle,
  args: { checked: false, styleProps: { width: 32, padding: 4 } },
  argTypes: {
    checked: { control: { type: 'boolean' } },
  },
} as Meta<ToggleProps>

export const LoaderProperties: Story<ToggleProps> = args => {
  const [, updateArgs] = useArgs()
  return (
    <Toggle
      {...args}
      onChange={e => updateArgs({ ...args, checked: e.target.checked })}
    />
  )
}

LoaderProperties.storyName = 'Properties'
