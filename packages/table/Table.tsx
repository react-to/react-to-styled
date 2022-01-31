import { Colors } from '@react-to-styled/essentials'
import { Loader } from '@react-to-styled/loader'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Paginator } from './Paginator'

interface ColumnData {
  header: string
  Cell: (data: any) => React.ReactNode
  width?: number
  ExpandedCell?: (data: any) => React.ReactNode
}

interface TableProps {
  data: any[]
  columns: Record<string, ColumnData>
  action?: () => void
  currentPage?: number
  pageLimit?: number
  onPagination?: (page: string | number) => void
  totalRecords?: number
  header?: JSX.Element
  isLoading?: boolean
  expandable?: boolean
}

const Row = (
  props: Partial<TableProps> & {
    rowIndex: number
    rowData: Record<string, unknown>
  },
) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [expandedRowData, setExpandedRowData] = useState<
    Record<string, unknown>
  >({})
  const onRowExpand = (data: Record<string, unknown>) => {
    setExpandedRowData({ ...data })
    if (data) {
      setIsRowExpanded(true)
    } else {
      setIsRowExpanded(false)
    }
  }
  const Row = (
    <tr>
      {Object.values(props.columns).map(({ Cell }: any, index) => {
        return Cell ? (
          <Column
            isFirst={index === 0}
            isLast={--Object.keys(props.columns).length === index}
            key={index}
          >
            <Cell
              action={props.action}
              onRowExpand={onRowExpand}
              data={props.rowData}
              index={props.rowIndex}
            />
          </Column>
        ) : null
      })}
    </tr>
  )
  if (props.expandable) {
    return (
      <>
        {Row}
        {isRowExpanded && (
          <tr>
            {Object.values(props.columns).map(
              ({ ExpandedCell }: any, index) => {
                return ExpandedCell ? (
                  <ExpandedColumn
                    colSpan={Object.values(props.columns).length}
                    key={index}
                  >
                    <ExpandedCell
                      action={props.action}
                      data={{ ...expandedRowData, ...props.rowData }}
                      index={props.rowIndex}
                    />
                  </ExpandedColumn>
                ) : null
              },
            )}
          </tr>
        )}
      </>
    )
  } else {
    return Row
  }
}

export const Table = ({
  data,
  columns,
  action,
  totalRecords,
  pageLimit,
  currentPage = 1,
  onPagination,
  header,
  expandable,
  isLoading,
  ...props
}: TableProps) => {
  return (
    <Wrapper data-element="tableWrapper" {...props}>
      {/* TODO: do this better */}
      {header && (
        <table data-element="tableFilter">
          <tbody>
            <tr>
              <Column width="100%" isFirst isLast>
                {header}
              </Column>
            </tr>
          </tbody>
        </table>
      )}
      <TableWrapper data-element="table">
        <THead>
          <tr>
            {columns &&
              Object.values(columns).map(({ header, width }, index) => {
                return header && !isLoading ? (
                  <Column
                    width={index === 0 && isLoading ? '100%' : width}
                    isFirst={index === 0}
                    isLast={Object.keys(columns).length - 1 === index}
                    key={index}
                  >
                    <TableHeaderText>{header}</TableHeaderText>
                  </Column>
                ) : index === 0 && isLoading ? (
                  <Column width={'100%'} isFirst isLast key={index}>
                    <TableHeaderText> </TableHeaderText>
                  </Column>
                ) : null
              })}
          </tr>
        </THead>
        <tbody>
          {data &&
            !isLoading &&
            data.map((rowData: Record<string, unknown>, rowIndex) => (
              <Row
                key={rowIndex}
                expandable={expandable}
                columns={columns}
                rowIndex={rowIndex}
                action={action}
                rowData={rowData}
              />
            ))}
          {isLoading && (
            <tr>
              <LoadingColumn>
                <Loader />
              </LoadingColumn>
            </tr>
          )}
        </tbody>
      </TableWrapper>

      {/* Pagination */}
      <Paginator
        onPagination={onPagination}
        currentPage={currentPage}
        isFetching={isLoading}
        pageLimit={pageLimit}
        totalRecords={totalRecords}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.borderColor};
  background-color: #fff;
  border-bottom: 0;

  > table {
    width: 100%;
    border-collapse: collapse;
  }
`

const TableWrapper = styled.table`
  table-layout: fixed;
  border-spacing: 0;
`

export const TruncatedText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 100%;
`

const TableHeaderText = styled(TruncatedText)`
  color: ${Colors.textColor};
  font-weight: normal;
  text-transform: uppercase;
  vertical-align: middle;
`

export const Column = styled.td<{
  width?: number | string
  isFirst?: boolean
  isLast?: boolean
}>`
  ${({ width, isFirst, isLast }) => {
    return `
      border-bottom: 1px solid ${Colors.borderColor};
      padding: 1rem 0;
      ${
        typeof width === 'number'
          ? `width: ${width}px;`
          : `width: ${width || ''};`
      }
      ${isFirst ? 'padding-left: 1.4rem;' : 'padding-left: 0.7rem;'}
      ${isLast ? 'padding-right: 1.4rem;' : 'padding-right: 0.7rem;'}
    `
  }}
`

const ExpandedColumn = styled.td`
  padding: 0;
`

export const LoadingColumn = styled(Column)`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin: auto;
`

//TODO@all new color put it in variables
const THead = styled.thead`
  background-color: ${Colors.chartTitleBackground};
`
