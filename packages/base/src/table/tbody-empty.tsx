import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function TbodyEmpty({
  children,
}: Props):JSX.Element {
  return (
    <tbody>
      <tr>
        <td style={{ border: 'none' }} colSpan={Number.MAX_SAFE_INTEGER}>
          {children}
        </td>
      </tr>
    </tbody>
  )
}
