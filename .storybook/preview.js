import { EssentialStyle } from '@react-to-styled/essentials'

export const decorators = [
  Story => (
    <div style={{ padding: '2rem' }}>
      {Story()}
      <EssentialStyle />
    </div>
  ),
]

export const parameters = {
  options: {
    storySort: ([, { kind: a }], [, { kind: b }]) => {
      if (b.includes('Overview')) {
        return +1
      }

      return (a > b) - (a < b)
    },
  },
  controls: { expanded: true, hideNoControlsWarning: true },
}
