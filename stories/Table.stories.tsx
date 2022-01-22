import React from 'react'
import styled from 'styled-components'

import { Table } from '../packages/table'

export default {
  title: 'Table',
  component: Table,
}

const tableColumns = {
  title: {
    header: 'Title',
    Cell: ({ data: { title } }) => <span>{title}</span>,
  },
  price: {
    header: 'Price',
    Cell: ({ data: { price } }) => <span>{price}</span>,
  },
}

export const Default = () => {
  const data = [
    {
      title: 'One',
      price: 100,
    },
    {
      title: 'Two',
      price: 200,
    },
  ]

  return (
    <Wrapper>
      <Table data={data} columns={tableColumns} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  padding: 4rem;
`
