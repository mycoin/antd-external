type InViewportParam = {
  threshold: number
  offset: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

export default (element: HTMLElement, options: InViewportParam) => {
  const { top, right, bottom, left, width, height } = element.getBoundingClientRect()
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right,
  }
  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height,
  }

  return (
    intersection.t > options.offset.top + threshold.y &&
    intersection.r > options.offset.right + threshold.x &&
    intersection.b > options.offset.bottom + threshold.y &&
    intersection.l > options.offset.left + threshold.x
  )
}
