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
    storySort: (a, b) => {
      if (a.title.includes('All stories')) {
        return 1
      }
      if (b.title.includes('All stories')) {
        return -1
      }

      return a.title.localeCompare(b.title)
    },
  },
  controls: { expanded: true, hideNoControlsWarning: true },
}
