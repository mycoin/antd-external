import { Component, ReactNode } from 'react'
import { RenderHookHandler } from '../interfaces'

type RenderProxyState<T> = T | { [contextKeyName]: any }
type RenderProxyProps<T> = {
  handler: RenderHookHandler<T>
  value: T
  contentRender: (
    // 当前状态对象
    value: T,
    // 更新状态
    onChange: (nextValue: Partial<T>) => void,
    // 回调函数
    handler: RenderHookHandler<T>,
  ) => ReactNode
}

const contextKeyName = Symbol('context')

export default class<T = {}> extends Component<RenderProxyProps<T>, RenderProxyState<T>> {
  componentWillMount() {
    const { value } = this.props
    if (value && typeof value === 'object') {
      this.state = Object.assign({}, value)
    } else {
      this.state = {
        [contextKeyName]: value,
      }
    }
  }
  render() {
    const { handler, contentRender } = this.props
    const onChange = (nextState: unknown) => {
      if (contextKeyName in this.state) {
        this.setState({
          [contextKeyName]: nextState,
        })
      } else {
        this.setState(nextState)
      }
    }

    // 勾出去使用
    handler.current =
      contextKeyName in this.state
        ? this.state[contextKeyName] // 基本类型格式
        : this.state

    // 渲染窗口主体内容
    return contentRender(handler.current, onChange, handler)
  }
}

export { RenderProxyProps }
