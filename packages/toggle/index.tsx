import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-components'
import { Colors } from '@react-to-styled/essentials'

/**
 * Props for styling the toggler
 */
type ToggleStyle = {
  /**
   * Width of the toggler
   */
  width: number
  /**
   * Padding for the circle
   */
  padding: number
  /**
   * Height of the toggler is calculated from width
   */
  height: number
  /**
   * Circle radius is calculated from height and padding
   */
  circleSize: number
}

/**
 * Table props.
 */
export interface ToggleProps extends ComponentPropsWithoutRef<'input'> {
  /**
   * Setting custom size for the Toggle
   */
  styleProps?: Pick<ToggleStyle, 'width' | 'padding'>
}

export const Toggle: FunctionComponent<ToggleProps> = ({
  styleProps = {} as ToggleStyle,
  ...props
}: ToggleProps) => {
  const { width = 32, padding = 4 } = styleProps
  const height = width * 0.625
  const circleSize = height - 2 * padding

  return (
    <Wrapper
      width={width}
      height={height}
      data-element="toggle"
      className={`rts-toggle__container ${props.className}`}
    >
      <ToggleInput
        type="checkbox"
        className="rts-toggle__toggle"
        data-element="toggle-input"
        styleProps={{ width, padding, circleSize }}
        {...props}
      />
      <ToggleBackground
        height={height}
        padding={padding}
        circleSize={circleSize}
        className="rts-toggle__background"
        data-element="toggle-background"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<ToggleStyle, 'width' | 'height'>>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 0 auto;
  display: inline-flex;
  border-radius: ${({ height }) => height * 2}px;
`

const ToggleBackground = styled.span<Omit<ToggleStyle, 'width'>>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${Colors.toggleBackground} 0% 0% no-repeat padding-box;
  border-radius: ${({ height }) => height * 2}px;
  transition: 0.2s ease background;

  &::after {
    content: '';
    position: absolute;
    top: ${({ padding }) => padding}px;
    left: ${({ padding }) => padding}px;
    width: ${({ circleSize }) => circleSize}px;
    height: ${({ circleSize }) => circleSize}px;
    border-radius: 50%;
    transition:
      0.5s ease transform,
      0.2s ease background;
    background: ${Colors.background};
    z-index: 0;
    box-shadow: 0 3px 6px #00000080;
  }
`

const ToggleInput = styled.input<{
  styleProps: Omit<ToggleStyle, 'height'>
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;

  &:checked + ${ToggleBackground} {
    background: ${Colors.toggleActive};

    &::after {
      transform: translate(
        ${({ styleProps: { width, circleSize, padding } }): number =>
          width - circleSize - 2 * padding}px,
        0
      );
    }
  }
`
