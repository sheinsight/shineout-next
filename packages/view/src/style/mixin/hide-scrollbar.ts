export default function hideScrollBar() {
  return {
    scrollbarWidth: `none`,
    '&::-webkit-scrollbar': {
      display: `none`,
    },
  }
}
