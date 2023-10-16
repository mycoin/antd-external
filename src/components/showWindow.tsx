import React, { BaseSyntheticEvent, Fragment, IframeHTMLAttributes, ReactNode } from 'react'
import { utils } from 'rigel-base'
import showModal from './showModal'
import { toReactNode } from '../utils'

type MessageData = {
  messageId?: string
  [prop: string]: any
}

type WindowHandler = {
  target?: HTMLIFrameElement
  postMessage: (message: any, targetOrigin?: string) => void
  write: (html: string) => boolean
  hideModal: () => void
}

type ShowWindowParam = {
  title?: ReactNode
  messageId?: string
  iframeProps?: Omit<IframeHTMLAttributes<Element>, 'src'>

  onRender?: (handle: WindowHandler) => void
  onMessage?: (handle: WindowHandler, data: MessageData) => void
  afterClose?: () => void
}

// 用于处理窗体里面抛出来消息
const initMessageEvent = (handler: WindowHandler, params: ShowWindowParam) => {
  const { messageId, afterClose, onMessage } = params
  const listener = (event: MessageEvent<MessageData>) => {
    if (typeof onMessage === 'function') {
      const data: MessageData = event.data || {}
      // 这里过滤无效的消息事件
      // 如果消息里面不包含编号则屏蔽
      if (!messageId || data.messageId == messageId) {
        onMessage(handler, data)
      }
    }
  }
  // 添加事件绑定
  addEventListener('message', listener)
  // 返回事件销毁函数
  return () => {
    // 取消事件绑定
    removeEventListener('message', listener)
    // 回调执行钩子
    if (typeof afterClose === 'function') {
      afterClose()
    }
    // 销毁对象引用关系
    handler.target = null
    handler.postMessage = null
  }
}

export default (iframeUrl: string, params: ShowWindowParam) => {
  const { title, messageId, iframeProps, onRender } = params
  const url = utils.toUrl(iframeUrl || 'about:blank', {
    messageId,
    targetOrigin: location.origin,
  })

  const handler: WindowHandler = {
    postMessage: (message, targetOrigin) => {
      const { contentWindow } = handler.target
      if (contentWindow) {
        contentWindow.postMessage(message, targetOrigin || '*')
      }
    },
    write: (html) => {
      if (handler.target) {
        const { contentWindow } = handler.target
        contentWindow.document.open()
        contentWindow.document.write(html)
        contentWindow.document.close()
        return true
      } else {
        return false
      }
    },
    hideModal: () => {
      hook.destroy()
    },
  }

  // 用于处理窗体里面抛出来消息
  const onDestroy = initMessageEvent(handler, params)
  const hook = showModal(null, {
    className: 'ant-external-modal-window',
    closable: true,
    centered: true,
    style: {
      maxHeight: null,
      maxWidth: null,
    },
    contentRender: () => (
      <Fragment>
        {toReactNode(title, {
          className: 'modal-window-title',
        })}
        <iframe
          {...iframeProps}
          ref={(target) => {
            handler.target = target
          }}
          allowFullScreen
          allowTransparency={false}
          src={url}
          onLoad={(event: BaseSyntheticEvent) => {
            if (typeof onRender === 'function') {
              onRender(handler)
            }
          }}
        />
      </Fragment>
    ),
    onOk: () => null,
    // 窗体关闭必须销毁事件绑定关系
    afterClose: onDestroy,
  })

  // 返回销毁
  return hook
}
export { WindowHandler, ShowWindowParam }
