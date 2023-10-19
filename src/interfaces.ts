import { ModalFuncProps } from 'antd'

type MessageData = {
  [fieldName: string]: any
}

type RenderHookHandler<T> = {
  current: Readonly<T>
  onOk?: () => void
  onCancel?: () => void
}

type WindowHandler = {
  target?: Window
  postMessage: (data: MessageData) => void
  write: (html: string) => boolean
  destroy: () => void
  hideModal: () => void
}

type BaseEmbedWindowParam<T extends WindowHandler = WindowHandler> = {
  messageId?: string
  // 接收到消息的方法
  onMessage?: (handle: T, data: MessageData) => void
  // 窗口加载完成的回调方法
  onRender?: (handle: T) => void
  // 窗口彻底关闭回调方法
  afterClose?: () => void
}

type SimpleModalProps = ModalFuncProps & {
  modalSize?: 'small' | 'medium' | 'large'
  locale?: {
    ok: string
    cancel?: string
  }
}
export { MessageData, SimpleModalProps, RenderHookHandler, WindowHandler, BaseEmbedWindowParam }
