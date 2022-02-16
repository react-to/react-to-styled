[![License: MIT](https://img.shields.io/npm/l/@react-to-styled/icon)](https://github.com/react-to/react-to-styled/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/react-to/react-to-styled)](https://github.com/react-to/react-to-styled/graphs/contributors)
[![npm](https://img.shields.io/npm/v/@react-to-styled/icon)](https://www.npmjs.com/package/@react-to-styled/icon)
[![npm](https://img.shields.io/npm/dm/@react-to-styled/icon)](https://www.npmjs.com/package/@react-to-styled/icon)
[![First good issue](https://img.shields.io/github/labels/react-to/react-to-styled/good%20first%20issue?label=Contribute)](https://github.com/react-to/react-to-styled/labels/good%20first%20issue)
[![Package size](https://img.shields.io/bundlephobia/min/@react-to-styled/icon/latest)](https://www.npmjs.com/package/@react-to-styled/icon)

# React to styled icon

We are using `react-inlinesvg` library for our icon component.

## Installation

We suggest this package to be imported

Install with npm:

```sh
npm install @react-to-styled/icon
```

Install with yarn:

```sh
yarn add @react-to-styled/icon
```

## Import

```tsx
import { Icon, IconProps, IconNames } from '@react-to-styled/icon'
```

## Dependencies

All our components depend on these dependencies

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "styled-components": ">=5"
  }
}
```

## Usage

Here is a quick example how to add Icon:

```jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Icon } from '@react-to-styled/icon'

function App() {
  const [checked, setChecked] = useState()

  return <Icon name="arrow-down" />
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

You can also check our [storybook](https://react-to.github.io/react-to-styled) for more examples
