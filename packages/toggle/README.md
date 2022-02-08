[![License: MIT](https://img.shields.io/npm/l/@react-to-styled/toggle)](https://opensource.org/licenses/MIT)
[![GitHub contributors](https://img.shields.io/github/contributors/react-to/react-to-styled)](https://github.com/react-to/react-to-styled/graphs/contributors)
[![npm](https://img.shields.io/npm/v/@react-to-styled/toggle)](https://www.npmjs.com/package/@react-to-styled/toggle)
[![npm](https://img.shields.io/npm/dm/@react-to-styled/toggle)](https://www.npmjs.com/package/@react-to-styled/toggle)
[![First good issue](https://img.shields.io/github/labels/react-to/react-to-styled/good%20first%20issue?label=Contribute)](https://github.com/react-to/react-to-styled/labels/good%20first%20issue)
[![Package size](https://img.shields.io/bundlephobia/min/@react-to-styled/toggle/latest)](https://www.npmjs.com/package/@react-to-styled/toggle)

# React to styled toggle

Package for simple css-in-js toggler.

## Installation

We suggest this package to be imported

Install with npm:

```sh
npm install @react-to-styled/toggle
```

Install with yarn:

```sh
yarn add @react-to-styled/toggle
```

## Usage

Here is a quick example how to add Loader:

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Toggle } from '@react-to-styled/toggle'

function App() {
  const [checked, setChecked] = useState()

  return (
    <Toggle checked={checked} onChange={e => setChecked(e.target.checked)} />
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

## License

MIT
