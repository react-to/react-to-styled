[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub contributors](https://img.shields.io/github/contributors/react-to/react-to-styled)](https://github.com/react-to/react-to-styled/graphs/contributors)
[![npm](https://img.shields.io/npm/v/@react-to-styled/essentials)](https://www.npmjs.com/package/@react-to-styled/essentials)
[![npm](https://img.shields.io/npm/dm/@react-to-styled/essentials)](https://www.npmjs.com/package/@react-to-styled/essentials)
[![First good issue](https://img.shields.io/github/labels/react-to/react-to-styled/good%20first%20issue?label=Contribute)](https://github.com/react-to/react-to-styled/labels/good%20first%20issue)

# React to styled essentials

This package contains essentials like suggested fonts, colors, etc.

## Installation

We suggest this package to be imported

Install with npm:

```sh
npm install @react-to-styled/essentials
```

Install with yarn:

```sh
yarn add @react-to-styled/essentials
```

## Usage

Here is a quick example how to import essential styles:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { EssentialStyle } from '@react-to-styled/essentials'

function App() {
  return (
    <div>
      <EssentialStyle />
      ...the rest of the app
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

## License

MIT
