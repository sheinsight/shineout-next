import type { CSSProperties } from 'react'

export default (
  color: string,
  {
    margin,
  }: {
    dir?: 'bottom' | 'left' | 'right' | 'top'
    margin?: number
  } = {},
) => ({
  '&:after': {
    position: 'absolute',
    boxSizing: 'border-box',
    content: '" "',
    bottom: 0,
    left: margin || 0,
    right: margin || 0,
    borderBottom: `1px solid ${color}`,
    transform: `scaleY(0.5)`,
    transition: `all .2s`,
  } as CSSProperties,
})
