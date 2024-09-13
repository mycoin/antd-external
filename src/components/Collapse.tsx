import React, { Component, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

type CollapseTriggerRender = (isExpand: boolean, toggleEvent: () => void) => ReactNode
type CollapseProps = HTMLAttributes<HTMLDivElement> & {
  wrapperClassName?: string
  defaultExpand?: boolean
  maxHeight?: number

  slideUp?: ReactNode | CollapseTriggerRender
  slideDown?: ReactNode | CollapseTriggerRender
  beforeChange?: (toggle: boolean) => void | false
}

type CollapseState = {
  currentHeight: number
  isExpand: boolean
  isEnough: boolean
}

class Collapse extends Component<CollapseProps, CollapseState> {
  declare observer: ResizeObserver

  constructor(props: CollapseProps) {
    const { defaultExpand } = props
    super(props)
    this.state = {
      // 是否高度足够（高度足够则无需显示展开按钮）
      isEnough: null,
      isExpand: !!defaultExpand,
      currentHeight: null,
    }
  }

  initObserver = (target: HTMLDivElement) => {
    if (this.observer) {
      return
    }
    // 判断是否有必要遮挡起来
    const onCallback = () => {
      const { maxHeight } = this.props
      const { currentHeight } = this.state
      if (currentHeight === target.scrollHeight) {
        return
      }
      this.setState({
        currentHeight: target.scrollHeight,
        isEnough: maxHeight > target.scrollHeight,
      })
    }

    this.observer = new ResizeObserver(onCallback)
    this.observer.observe(target)
    setTimeout(onCallback)
  }

  componentWillUnmount() {
    this.observer && this.observer.disconnect()
    this.observer = null
  }

  renderCollapse(triggerRender: ReactNode | CollapseTriggerRender) {
    const { beforeChange } = this.props
    const { isExpand, isEnough } = this.state
    const toggleEvent = () => {
      if (beforeChange && beforeChange(!isExpand) === false) {
        return
      }
      this.setState({
        isExpand: !isExpand,
      })
    }
    if (typeof triggerRender === 'function') {
      return <div className="collapse-expand">{triggerRender(isEnough, toggleEvent)}</div>
    } else if (!isEnough) {
      return (
        <div
          className="collapse-expand"
          onClick={toggleEvent}>
          {triggerRender}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const { children, className, slideUp, slideDown, wrapperClassName, style, maxHeight, ...otherProps } = this.props
    const { isEnough, isExpand, currentHeight } = this.state
    const clazzName = classNames('antd-external-collapse', className)
    const styleObject: CSSProperties = {
      ...style,
      overflowY: 'hidden',
    }
    // 如果没有获得高度则无需设置高度
    if (currentHeight) {
      if (isEnough || isExpand) {
        styleObject.height = currentHeight
      } else {
        styleObject.height = maxHeight
      }
    }
    return (
      <div
        {...otherProps}
        className={clazzName}
        style={styleObject}>
        <div
          className={wrapperClassName}
          ref={this.initObserver}>
          {children}
        </div>
        {currentHeight ? this.renderCollapse(isExpand ? slideUp : slideDown) : null}
      </div>
    )
  }
}

export default Collapse
export { CollapseProps }
