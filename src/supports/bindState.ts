import { Component } from 'react'

type KV<V = any> = Record<string, V>

/**
 * 创建草台班子
 */
export default <T extends KV>(that: Component, state: T): T => {
  if (that.state === null) {
    that.state = state
  } else {
    that.setState(state)
  }
  return new Proxy(state, {
    get: (target, p: string) => (that.state as any)[p],
    set: (target, p: string, value: any) => {
      that.setState({
        [p]: value,
      })
      return true
    },
  })
}
