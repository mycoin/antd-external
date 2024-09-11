import React, { Component, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

type CollapseTriggerRender = (isEnough: boolean, showAll: () => void) => ReactNode
type CollapseProps = HTMLAttributes<HTMLDivElement> & {
  defaultExpand?: boolean
  maxHeight?: number

  slideUp?: ReactNode | CollapseTriggerRender
  slideDown?: ReactNode | CollapseTriggerRender
  beforeChange?: (showAll: boolean) => void | false
}

type CollapseState = {
  currentHeight: number
  isExpand: boolean
  isEnough: boolean
}

class Collapse extends Component<CollapseProps, CollapseState> {
  declare observer: MutationObserver

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

    this.observer = new MutationObserver(onCallback)
    this.observer.observe(target, {
      attributes: true,
      childList: true,
      subtree: true,
    })
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
    const { children, className, slideUp, slideDown, style, maxHeight, ...otherProps } = this.props
    const { isEnough, isExpand, currentHeight } = this.state
    const clazzName = classNames('antd-external-collapse', className)
    const styleObject: CSSProperties = {
      ...style,
      overflowY: 'hidden',
    }
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
        style={styleObject}
        ref={this.initObserver}>
        {children}
        {currentHeight ? this.renderCollapse(isExpand ? slideUp : slideDown) : null}
      </div>
    )
  }
}

export default Collapse
export { CollapseProps }
