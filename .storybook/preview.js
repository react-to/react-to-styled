import { EssentialStyle } from '@react-to-styled/essentials'
import { DocsPage, DocsContainer } from '@storybook/addon-docs'

export const decorators = [
  Story => (
    <div style={{ padding: '2rem' }}>
      {Story()}
      <EssentialStyle />
    </div>
  ),
]

export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    storySort: ([, { kind: a }], [, { kind: b }]) => {
      if (a.includes('All stories')) {
        return 1
      }
      if (b.includes('All stories')) {
        return -1
      }

      return a.localeCompare(b)
    },
  },
  controls: { expanded: true, hideNoControlsWarning: true },
}
