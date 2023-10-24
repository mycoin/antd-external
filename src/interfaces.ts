import type { ReactNode } from 'react'
import type { ModalFuncProps } from 'antd'

// 消息对象
type MessageBody = Record<string, any> & {
  messageId?: string
  [fieldName: string]: any
}

// 窗口通信操作对象
type WindowHandler<T> = {
  contentWindow?: Window
  postMessage: (data: T) => void
  write: (html: string) => boolean
  destroy: () => void
}

type WindowMessageBase<T> = {
  // 接收到消息的方法
  onMessage: (handle: WindowHandler<T>, data: T, messageEvent: MessageEvent<T>) => void
}

type RenderHookHandler<T> = {
  current: Readonly<T>
  destroy: () => void
  onOk: () => void
  onCancel: () => void
}

type RenderHookProxyBase<T> = {
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

type ModalProps = ModalFuncProps & {
  modalSize?: string
  locale?: {
    ok: string
    cancel?: string
  }
}

export {
  /**/
  ModalProps,
  MessageBody,
  RenderHookHandler,
  RenderHookProxyBase,
  WindowHandler,
  WindowMessageBase,
}
