import { Colors } from '@react-to-styled/essentials'
import React, { FunctionComponent } from 'react'
import styled, { keyframes } from 'styled-components'

/**
 * Loader props.
 */
interface LoaderProps {
  /**
   * Sets loader in the center of the page.
   */
  isFullScreen?: boolean
  /**
   * Instead of `isFullScreen` this can set minHeight of the wrapper and loder will be in the center.
   */
  wrapperHeight?: number | string
  /**
   * Sets the loader radius.
   */
  loaderSize?: number
}

export const Loader: FunctionComponent<LoaderProps> = ({
  isFullScreen,
  wrapperHeight = 300,
  loaderSize = 72,
}) => {
  if (isFullScreen) {
    return (
      <Wrapper wrapperHeight={wrapperHeight}>
        <Element data-element="loader" loaderSize={loaderSize} />
      </Wrapper>
    )
  }
  return <Element data-element="loader" loaderSize={loaderSize} />
}

const loaderKeyframe = keyframes`
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div<Pick<LoaderProps, 'wrapperHeight'>>`
  width: 100%;
  ${({ wrapperHeight }) =>
    `height: ${
      typeof wrapperHeight === 'number' ? `${wrapperHeight}px` : wrapperHeight
    }`};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Element = styled.div<Pick<LoaderProps, 'loaderSize'>>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  font-size: 10px;
  position: relative;
  border: 4px solid transparent;
  border-left-color: ${Colors.darkBlue};
  transform: translateZ(0);
  animation: ${loaderKeyframe} 1.1s infinite linear;
  ${({ loaderSize }) => `
    width: ${loaderSize}px;
    height: ${loaderSize}px;
    
    ::after {
      width: ${loaderSize}px;
      height: ${loaderSize}px;
      border-radius: 50%;
    }
  `};
`
