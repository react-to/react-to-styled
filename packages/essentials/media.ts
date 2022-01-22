/**
 * All breakpoints that can be used in UI
 */
export const Breakpoint = [
  'mobile',
  'mobile-large',
  'tablet',
  'desktop',
  'large-desktop',
] as const
export type Breakpoint = typeof Breakpoint[number]

/**
 * All values in pixel for {@link Breakpoint}
 */
export const metrics: { [K in Breakpoint]: number } = {
  mobile: 320,
  'mobile-large': 376,
  tablet: 624,
  desktop: 776,
  'large-desktop': 1096,
}

/**
 * Tests if a given media query matches.
 *
 * @param mediaQuery The media query to test.
 *
 * @example
 *  if (matchesMedia('(min-width: 768px)')) {
 *     console.log('on a 768px or wider screen');
 *  }
 */
export function matchesMedia(mediaQuery: string) {
  if (typeof window === 'object' && typeof window.matchMedia === 'function') {
    return window.matchMedia(mediaQuery).matches
  }
  return false
}

/**
 * Returns a media query matching the given breakpoint constraint.
 *
 * @param type          The constraint type. At least (`'>='`) or smaller than (`'<'`).
 * @param breakpoint    The breakpoint name.
 */
export function getBreakpointMediaQuery(
  type: '>=' | '<',
  breakpoint: Breakpoint,
) {
  const width = metrics[breakpoint]
  if (type === '>=') {
    return `(min-width: ${width}px)`
  }
  return `(max-width: ${width - 0.1}px)`
}

/**
 * Tests if the screen is wide enough to match the given breakpoint.
 *
 * @param breakpoint The breakpoint to test (inclusive).
 *
 * @example
 *  if (isScreenAtLeast('tablet')) {
 *      console.log('on a tablet or larger screen');
 *  }
 */
export function isScreenAtLeast(breakpoint: Breakpoint) {
  return matchesMedia(getBreakpointMediaQuery('>=', breakpoint))
}

/**
 * Tests if the screen is narrower than the given breakpoint.
 *
 * @param breakpoint The breakpoint to test (exclusive).
 *
 * @example
 *  if (isScreenSmallerThan('tablet')) {
 *      console.log('on a mobile screen');
 *  }
 */
export function isScreenSmallerThan(breakpoint: Breakpoint) {
  return matchesMedia(getBreakpointMediaQuery('<', breakpoint))
}
