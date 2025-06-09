import styled from 'styled-components'
import { pxToRem } from '@/utils'
import type { CustomTableProps } from '@/types'

declare module 'styled-components' {
  export interface DefaultTheme {
    appColor: string
    appDefaultStroke: string
  }
}

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      height: ${pxToRem(48)};
      padding: 0 ${pxToRem(8)} 0 0;
      text-align: left;
      &:last-child {
        text-align: right;
        padding-right: 0;
      }
    }
    th {
      color: ${(props) => props.theme.appColor};
      border-bottom: ${pxToRem(1)} solid
        ${(props) => props.theme.appDefaultStroke};
      &:last-child {
        border-bottom: none;
      }
    }
  }
`

function CustomTable(props: CustomTableProps) {
  const { header, rows } = props
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  )
}

export default CustomTable
