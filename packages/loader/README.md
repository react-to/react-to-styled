[![License: MIT](https://img.shields.io/npm/l/@react-to-styled/loader)](https://opensource.org/licenses/MIT)
[![GitHub contributors](https://img.shields.io/github/contributors/react-to/react-to-styled)](https://github.com/react-to/react-to-styled/graphs/contributors)
[![npm](https://img.shields.io/npm/v/@react-to-styled/loader)](https://www.npmjs.com/package/@react-to-styled/loader)
[![npm](https://img.shields.io/npm/dm/@react-to-styled/loader)](https://www.npmjs.com/package/@react-to-styled/loader)
[![First good issue](https://img.shields.io/github/labels/react-to/react-to-styled/good%20first%20issue?label=Contribute)](https://github.com/react-to/react-to-styled/labels/good%20first%20issue)
[![Package size](https://img.shields.io/bundlephobia/min/@react-to-styled/loader/latest)](https://www.npmjs.com/package/@react-to-styled/loader)

# React to styled loader

Package for simple css-in-js loader.

## Installation

We suggest this package to be imported

Install with npm:

```sh
npm install @react-to-styled/loader
```

Install with yarn:

```sh
yarn add @react-to-styled/loader
```

## Usage

Here is a quick example how to add Loader:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Loader } from '@react-to-styled/loader'

function App() {
  return (
    <div>
      <Loader loaderSize={40} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

## License

MIT
