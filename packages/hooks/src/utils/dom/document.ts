
let cachedZoom = 0
export const getCurrentCSSZoom = (): number => {
  if (cachedZoom) return cachedZoom

  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !document.body) {
    return 1
  }

  const currentCSSZoom = Math.round(document.body.getBoundingClientRect().width) / document.body.clientWidth

  if (window.ResizeObserver) {
    // 监听document.body的变化，更新缓存的zoom
    const resizeObserver = new ResizeObserver(() => {
      cachedZoom = Math.round(document.body.getBoundingClientRect().width) / document.body.clientWidth
    })

    resizeObserver.observe(document.body)
  }

  cachedZoom = currentCSSZoom

  return currentCSSZoom
}


// export const getZoomBoundingClientRect = (element: HTMLElement) => {
//   const currentCSSZoom = getCurrentCSSZoom()
//   if (currentCSSZoom === 1 || !currentCSSZoom) {
//     return element.getBoundingClientRect()
//   }
//   const isNotZoom = currentCSSZoom === 1 || !currentCSSZoom

//   if (isNotZoom) {
//     return element.getBoundingClientRect()
//   }

//   const zoomRatio = 1 / currentCSSZoom
//   const rect = element.getBoundingClientRect()

//   return {
//     x: rect.x * zoomRatio,
//     y: rect.y * zoomRatio,
//     top: rect.top * zoomRatio,
//     right: rect.right * zoomRatio,
//     bottom: rect.bottom * zoomRatio,
//     left: rect.left * zoomRatio,
//     width: rect.width * zoomRatio,
//     height: rect.height * zoomRatio,
//   }
// }

