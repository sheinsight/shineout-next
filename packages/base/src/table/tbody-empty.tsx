import React from 'react'

interface Props {
  columns: any;
  children: React.ReactNode
}

export default function TbodyEmpty({
  children,
  columns,
}: Props):JSX.Element {
  return (
    <tbody>
      <tr>
        <td style={{ border: 'none' }} colSpan={columns.length}>
          {children}
        </td>
      </tr>
    </tbody>
  )
}
