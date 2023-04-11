import type { CSSProperties } from 'react'

export default (line: number = 1) => {
  if (line === 1)
    return {
      overflow: `hidden`,
      textOverflow: `ellipsis`,
      whiteSpace: `nowrap`,
    } as CSSProperties
  else
    return {
      display: `-webkit-box`,
      '-webkit-line-clamp': line,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    } as CSSProperties
}
