import { ModalFuncProps } from 'antd'

type MessageData = {
  messageId?: string
  [prop: string]: any
}

type RenderHookHandler<T> = {
  current: Readonly<T>
  onOk?: () => void
  onCancel?: () => void
}

type WindowHandler = {
  target?: HTMLIFrameElement
  postMessage: (message: any, targetOrigin?: string) => void
  write: (html: string) => boolean
  hideModal: () => void
}

type BaseEmbedWindowParam<T extends WindowHandler = WindowHandler> = {
  messageId?: string
  onMessage?: (handle: T, data: MessageData) => void
  onRender?: (handle: T) => void
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
