export default function customScrollBar(info: { background: string }) {
  return {
    'scrollbar-color': info.background,
    '&::-webkit-scrollbar': {
      background: info.background,
    },
  };
}
