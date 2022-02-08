import { Colors } from '@react-to-styled/essentials'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useArgs, useEffect } from '@storybook/client-api'
import { CellProps, Table, TableProps } from '@react-to-styled/table'

const mockedData = Array(100)
  .fill(true)
  .map((_, index) => ({
    title: `Row ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
  }))

export default {
  title: 'Table/Properties',
  component: Table,
  args: {
    paginationProps: {
      currentPage: 1,
      pageLimit: 10,
      totalRecords: mockedData.length,
      onPagination: () => null,
    },
    isLoading: false,
    columns: {
      title: {
        header: 'Title',
        Cell: ({ data: { title } }: CellProps) => <span>{title}</span>,
      },
      price: {
        header: 'Price',
        Cell: ({ data: { price } }: CellProps) => <span>{price}</span>,
      },
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
    },
    data: mockedData.slice(0, 10),
  },
} as Meta<Partial<TableProps>>

export const TableProperties: Story<TableProps> = args => {
  const [_, updateArgs] = useArgs()
  const onPagination = (p: number) => {
    updateArgs({
      ...args,
      isLoading: true,
      data: mockedData.slice(
        p * args.paginationProps.pageLimit - args.paginationProps.pageLimit,
        p * args.paginationProps.pageLimit,
      ),
      paginationProps: { ...args.paginationProps, currentPage: p },
    })
  }

  useEffect(() => {
    if (args.isLoading) {
      setTimeout(() => updateArgs({ ...args, isLoading: false }), 1000)
    }
  }, [args.isLoading])

  return (
    <Table
      {...args}
      paginationProps={{
        ...args.paginationProps,
        onPagination,
      }}
    />
  )
}

TableProperties.storyName = 'Properties'

const ExpandedRow = styled.div`
  background: ${Colors.chartTitleBackground};
  display: flex;
  flex-direction: column;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid ${Colors.borderColor};
`
