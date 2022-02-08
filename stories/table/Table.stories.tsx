import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CellProps, Table, TruncatedText } from '@react-to-styled/table'
import { Colors } from '@react-to-styled/essentials'

import TableDocsPage from './TableDocsPage.mdx'

export default {
  title: 'Table/All stories',
  component: Table,
  parameters: {
    docs: { page: TableDocsPage },
    controls: {
      exclude: /.*/s,
    },
  },
} as Meta

const defaultColumns = {
  title: {
    header: 'Title',
    Cell: ({ data: { title } }: CellProps) => <span>{title}</span>,
  },
  price: {
    header: 'Price',
    Cell: ({ data: { price } }: CellProps) => <span>{price}</span>,
  },
}

const defaultData = [
  { title: 'One', price: 100 },
  { title: 'Two', price: 200 },
]

export const LongDataTable = () => {
  const columns = {
    title: {
      header: 'Title',
      Cell: ({ data: { title } }: CellProps) => (
        <WrappedText>{title}</WrappedText>
      ),
    },
    price: {
      header: 'Price',
      Cell: ({ data: { price } }: CellProps) => <span>{price}</span>,
      width: 100,
    },
  }
  const data = [
    { title: 'One long text to be seen on mobile', price: 100 },
    { title: 'Onealsoverylongtextjustwithoutthespace', price: 200 },
  ]

  return (
    <MobileWrapper>
      <Table columns={columns} data={data} />
    </MobileWrapper>
  )
}

LongDataTable.storyName = 'Long data example'
LongDataTable.parameters = {
  viewport: { defaultViewport: 'mobile2' },
}

export const TruncatedTable = () => {
  const columns = {
    title: {
      header: 'Title',
      Cell: ({ data: { title } }: CellProps) => (
        <TruncatedText>{title}</TruncatedText>
      ),
    },
    price: {
      header: 'Price',
      Cell: ({ data: { price } }: CellProps) => <span>{price}</span>,
      width: 100,
    },
  }
  const data = [
    { title: 'One long text to be seen on mobile', price: 100 },
    { title: 'Onealsoverylongtextjustwithoutthespace', price: 200 },
  ]

  return (
    <MobileWrapper>
      <Table columns={columns} data={data} />
    </MobileWrapper>
  )
}

TruncatedTable.storyName = 'Truncated table'
TruncatedTable.parameters = {
  viewport: { defaultViewport: 'mobile2' },
}

export const ExpandableTable = () => {
  const columns = {
    ...defaultColumns,
    action: {
      header: 'Action',
      Cell: ({ onRowExpand }: CellProps) => {
        const [isExpanded, setIsExpanded] = useState<boolean>(false)
        const onExpand = () => {
          setIsExpanded(!isExpanded)
          onRowExpand(!isExpanded)
        }

        return (
          <button onClick={() => onExpand()}>
            {isExpanded ? 'Close' : 'Expand'}
          </button>
        )
      },
      ExpandedCell: ({ data: { title, price } }: CellProps) => {
        return (
          <ExpandedRow>
            Expanded row ({title} {price})
          </ExpandedRow>
        )
      },
      width: 100,
    },
  }

  return <Table columns={columns} data={defaultData} />
}

ExpandableTable.storyName = 'Expandable table'

export const LazyTable = () => {
  const mockedData = Array(100)
    .fill(true)
    .map((_, index) => ({
      title: `Row ${index + 1}`,
      price: (Math.random() * 100).toFixed(2),
    }))
  const PAGE_LIMIT = 10
  const [data, setData] = useState(mockedData.slice(0, PAGE_LIMIT))
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const onPagination = (p: number) => {
    setIsLoading(true)
    setData(mockedData.slice(p * PAGE_LIMIT - PAGE_LIMIT, p * PAGE_LIMIT))
    setCurrentPage(p)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <Table
      columns={defaultColumns}
      paginationProps={{
        currentPage,
        onPagination,
        pageLimit: PAGE_LIMIT,
        totalRecords: mockedData.length,
      }}
      isLoading={isLoading}
      data={data}
    />
  )
}

LazyTable.storyName = 'Lazy table'

const MobileWrapper = styled.div`
  max-width: 360px;
  margin: auto;
`

const WrappedText = styled.div`
  word-break: break-all;
`

const ExpandedRow = styled.div`
  background: ${Colors.chartTitleBackground};
  display: flex;
  flex-direction: column;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid ${Colors.borderColor};
`
