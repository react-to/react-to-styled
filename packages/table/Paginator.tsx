import { Colors } from '@react-to-styled/essentials'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'
const BLANK_PAGE = '...'

const range = (from: number, to, step = 1) => {
  let i = from
  const range: (string | number)[] = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

interface Props {
  onPagination: (page: number | string) => void
  currentPage: number
  totalRecords: number
  pageLimit: number
  isFetching: boolean
}

export const Paginator = ({
  onPagination,
  currentPage,
  totalRecords,
  pageLimit,
  isFetching,
}: Props) => {
  const pageNeighbours = 2
  const [totalPages, setTotalPages] = useState(1)
  const [pages, setPages] = useState<(string | number)[]>([1])

  const handleClick = (page: number | string) => (evt: Event) => {
    evt.preventDefault()
    onPagination(page)
  }

  const handleMoveLeft = (evt: Event) => {
    evt.preventDefault()
    onPagination(currentPage - pageNeighbours * 2 - 1)
  }

  const handleMoveRight = (evt: Event) => {
    evt.preventDefault()
    onPagination(currentPage + pageNeighbours * 2 + 1)
  }

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pagesI = range(startPage, endPage)

      const hasLeftSpill = startPage > 2 && currentPage > 5
      const hasRightSpill =
        totalPages - endPage > 1 && totalPages - currentPage > 4
      const spillOffset = totalNumbers - (pagesI.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pagesI = [
            LEFT_PAGE,
            1,
            BLANK_PAGE,
            ...extraPages,
            ...pagesI,
            totalPages,
          ]
          break
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pagesI = [
            1,
            ...pagesI,
            ...extraPages,
            BLANK_PAGE,
            totalPages,
            RIGHT_PAGE,
          ]
          break
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pagesI = [
            LEFT_PAGE,
            1,
            BLANK_PAGE,
            ...pagesI,
            BLANK_PAGE,
            totalPages,
            RIGHT_PAGE,
          ]
          break
        }
      }

      return [...pagesI]
    }

    return range(1, totalPages)
  }

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit))
    setPages(fetchPageNumbers())
  }, [totalRecords, totalPages, currentPage, pageLimit])

  return (
    <>
      {pages.length > 1 && !isFetching && (
        <PaginatorWrapper data-element="pagination">
          <StyledPaginator>
            {pages.length &&
              pages.map((page, index) => {
                if (page === LEFT_PAGE) {
                  return (
                    <PaginatorItem key={index}>
                      <PaginatorAction
                        onClick={(event: never) => handleMoveLeft(event)}
                      >
                        {'<<'}
                      </PaginatorAction>
                    </PaginatorItem>
                  )
                }

                if (page === BLANK_PAGE) {
                  return <span key={index}>...</span>
                }

                if (page === RIGHT_PAGE) {
                  return (
                    <PaginatorItem key={index}>
                      <PaginatorAction
                        onClick={(event: never) => handleMoveRight(event)}
                      >
                        {'>>'}
                      </PaginatorAction>
                    </PaginatorItem>
                  )
                }

                return (
                  <PaginatorItem key={index}>
                    <PaginatorAction
                      active={currentPage === page}
                      disabled={currentPage === page}
                      onClick={(event: never) => handleClick(page)(event)}
                    >
                      {page}
                    </PaginatorAction>
                  </PaginatorItem>
                )
              })}
          </StyledPaginator>
        </PaginatorWrapper>
      )}
    </>
  )
}

const PaginatorWrapper = styled.nav`
  text-align: center;
  border-bottom: 1px solid ${Colors.borderColor};
`

const StyledPaginator = styled.ul`
  display: inline-block;
`

const PaginatorItem = styled.li`
  display: inline-block;
  vertical-align: middle;
`

const PaginatorAction = styled.a<{
  active?: boolean
  onClick?: (evt: never) => void
  disabled?: boolean
}>`
  font-size: 1rem;
  color: ${Colors.textColor};
  cursor: pointer;
  display: flex;
  padding: 0 5px;
  border: 1px solid transparent;
  ${props => props.disabled && 'pointer-events: none;'};
  ${props =>
    props.active &&
    `
      color: ${Colors.redBtn};
      cursor: default;
      border: 1px solid ${Colors.redBtn};
      border-radius: 5px;
    `};
`
