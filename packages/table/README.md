[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub contributors](https://img.shields.io/github/contributors/react-to/react-to-styled)](https://github.com/react-to/react-to-styled/graphs/contributors)
[![npm](https://img.shields.io/npm/v/@react-to-styled/table)](https://www.npmjs.com/package/@react-to-styled/table)
[![npm](https://img.shields.io/npm/dm/@react-to-styled/table)](https://www.npmjs.com/package/@react-to-styled/table)
[![First good issue](https://img.shields.io/github/labels/react-to/react-to-styled/good%20first%20issue?label=Contribute)](https://github.com/mantinedev/mantine/labels/help%20wanted)

# React to styled table

Simple table easy to use, with minimal styling.

## Download

Our table components are available at npm, if you have an existing application run the following command to download it to your project.

```
npm install @react-to-styled/table
```

or

```
yarn add @react-to-styled/table
```

## Import

```jsx
import { Table, Paginator } from '@react-to-styled/table'
```

## Dependencies

All our components depend on these dependencies

```json
{
  "dependencies": {
    "react": "^16.8.0 || ^17.0.0",
    "react-dom": "^16.8.0 || ^17.0.0",
    "styled-components": "^5.1.1",
    "typescript": "^4"
  }
}
```

## Usage

Here is a quick example to get you started:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@react-to-styled/table'

function App() {
  const columns = {
    title: {
      header: 'Title',
      Cell: ({ data: { title } }) => <span>{title}</span>,
    },
    price: {
      header: 'Price',
      Cell: ({ data: { price } }) => <span>{price}</span>,
    },
  }

  const data = [
    { title: 'One', price: 100 },
    { title: 'Two', price: 200 },
  ]

  return <Table data={data} columns={columns} />
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

You can also check our [storybook](https://react-to.github.io/react-to-styled) for more examples
