// @ts-ignore
import InView from 'inview'

type InViewExpose = {
  target: Element
  onExpose?: (data: InViewContext) => boolean | void
  onChange?: (data: InViewContext) => void
}

type InViewContext = {
  inViewHeight: number
  isInView: boolean
  elementOffsetTop: number
  elementOffsetTopInViewHeight: number
  windowScrollTop: number
  destroy: () => void
}

export default (params: InViewExpose) => {
  const { target, onExpose, onChange } = params
  const inview = InView(target, (isInView: boolean, data: InViewContext) => {
    data.isInView = isInView
    data.destroy = () => {
      if (inview) {
        inview.destroy()
      }
    }
    if (typeof onChange === 'function') {
      onChange(data)
    }
    if (typeof onExpose === 'function' && isInView && inview) {
      if (onExpose(data) === true) {
        inview.destroy()
      }
    }
  })
  return () => {
    inview.destroy()
  }
}
export { InViewExpose, InViewContext }
