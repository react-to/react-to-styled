import { Colors, Fonts } from '@react-to-styled/essentials'
import { Loader } from '@react-to-styled/loader'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Paginator, PaginatorProps } from './Paginator'

/**
 * Table data.
 */
type TableData = Record<string, unknown>

/**
 * Cell props representing `<td>` element.
 */
export interface CellProps {
  /**
   * Function that if triggered with some data, it will show {@link ColumnData.ExpandedCell}
   */
  onRowExpand: (data?: TableData | boolean) => void
  /**
   * Row data passed in Cell.
   */
  data: TableData
  /**
   * Row index.
   */
  index: number
}

/**
 * Column props representing `<th>` element.
 */
interface ColumnData {
  /**
   * Header content
   */
  header: string
  /**
   * A Cell component that will be placed in this Column in every row.
   */
  Cell: (props: CellProps) => JSX.Element
  /**
   * Optional width prop, used to limit the column width
   */
  width?: number
  /**
   * Optional component that will render if {@link CellProps.onRowExpand} is triggered in Cell with some data.
   */
  ExpandedCell?: (props: Omit<CellProps, 'onRowExpand'>) => JSX.Element
}

/**
 * Table props.
 */
export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  /**
   * Required data prop, should be array of objects.
   */
  data: TableData[]
  /**
   * Required columns prop, used to layout the content in cells and columns
   */
  columns: Record<string, ColumnData>
  /**
   * Use it if you need pagination in Table footer.
   */
  paginationProps?: Omit<PaginatorProps, 'isFetching'>
  /**
   * Renders Loader instead of table content.
   */
  isLoading?: boolean
}

/**
 * Row props.
 */
interface RowProps
  extends Pick<TableProps, 'columns'>,
    React.ComponentPropsWithoutRef<'tr'> {
  /**
   * Row index.
   */
  rowIndex: number
  /**
   * Renders Loader instead of table content.
   */
  rowData: TableData
}

const Row = ({ columns, rowData, rowIndex, ...props }: RowProps) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false)
  const [expandedRowData, setExpandedRowData] = useState<TableData>({})

  const onRowExpand = (data: TableData) => {
    setExpandedRowData({ ...data })

    if (data) {
      setIsRowExpanded(true)
    } else {
      setIsRowExpanded(false)
    }
  }

  const Row = (
    <tr {...props}>
      {Object.values(columns).map(({ Cell }, index) => {
        if (!Cell) {
          return null
        }

        return (
          <Column
            isFirst={index === 0}
            isLast={--Object.keys(columns).length === index}
            key={index}
          >
            <Cell onRowExpand={onRowExpand} data={rowData} index={rowIndex} />
          </Column>
        )
      })}
    </tr>
  )

  return (
    <>
      {Row}
      {isRowExpanded && (
        <tr>
          {Object.values(columns).map(({ ExpandedCell }, index) => {
            if (!ExpandedCell) {
              return null
            }

            return (
              <ExpandedColumn
                colSpan={Object.values(columns).length}
                key={index}
              >
                <ExpandedCell
                  data={{ ...expandedRowData, ...rowData }}
                  index={rowIndex}
                />
              </ExpandedColumn>
            )
          })}
        </tr>
      )}
    </>
  )
}

export const Table = ({
  data,
  columns,
  paginationProps,
  isLoading,
  ...props
}: TableProps) => {
  return (
    <Wrapper data-element="tableWrapper" className="rts-table__container">
      <TableWrapper data-element="table" {...props}>
        <THead className="rts-table__header">
          <tr>
            {columns &&
              Object.values(columns).map(({ header, width }, index) => {
                if (header && !isLoading) {
                  return (
                    <Column
                      width={width}
                      isFirst={index === 0}
                      isLast={Object.keys(columns).length - 1 === index}
                      key={index}
                      className="rts-table__column"
                    >
                      <TableHeaderText>{header}</TableHeaderText>
                    </Column>
                  )
                }

                if (index === 0 && isLoading) {
                  return (
                    <Column
                      width="100%"
                      isFirst
                      isLast
                      key={index}
                      className="rts-table__column"
                    >
                      <TableHeaderText> </TableHeaderText>
                    </Column>
                  )
                }

                return null
              })}
          </tr>
        </THead>
        <tbody>
          {isLoading ? (
            <tr>
              <LoadingColumn className="rts-table__column--loading">
                <Loader />
              </LoadingColumn>
            </tr>
          ) : (
            data?.map((rowData, rowIndex) => (
              <Row
                key={rowIndex}
                columns={columns}
                rowIndex={rowIndex}
                rowData={rowData}
                className="rts-table__row"
              />
            ))
          )}
        </tbody>
      </TableWrapper>

      {paginationProps && (
        <Paginator {...paginationProps} isFetching={isLoading} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.borderColor};
  background-color: ${Colors.background};
  border-bottom: 0;
  font-family: ${Fonts.OpenSans}, serif;

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
  background-color: ${Colors.grayBackground};
`
