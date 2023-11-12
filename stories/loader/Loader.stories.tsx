import { Meta } from '@storybook/react'
import React from 'react'

import { Loader } from '@react-to-styled/loader'

export default {
  title: 'Loader/All stories',
  component: Loader,
  parameters: {
    controls: {
      exclude: /.*/s,
    },
  },
} as Meta

export const LoaderWrapper = () => {
  return <Loader wrapperHeight="100%" />
}

LoaderWrapper.storyName = 'Loader 100% wrapper'

export const LoaderFixedWrapper = () => {
  return <Loader wrapperHeight={300} />
}

LoaderFixedWrapper.storyName = 'Loader 300px wrapper'

export const LoaderCustomSizes = () => {
  const sizes = [16, 32, 48, 72, 128]

  return sizes.map(size => <Loader key={size} loaderSize={size} />)
}

LoaderCustomSizes.storyName = 'Custom size loaders'
