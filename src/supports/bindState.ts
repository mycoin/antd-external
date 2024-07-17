import { Component } from 'react'

type KV<V = any> = Record<string, V>

export default <T extends KV>(instance: Component, state: T): T => {
  if (instance.state === null) {
    instance.state = state
  } else {
    instance.setState(state)
  }
  return new Proxy(state, {
    get: (target, p: string) => (instance.state as any)[p],
    set: (target, p: string, value: any) => {
      instance.setState({
        [p]: value,
      })
      return true
    },
  })
}
