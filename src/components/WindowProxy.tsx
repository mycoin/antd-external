import React, { Component, IframeHTMLAttributes } from 'react'
import { utils } from 'rigel-base'
import { MessageBody, WindowHandler, WindowMessageBase } from '../interfaces'
import { createWindowHandler } from '../utils'

type WindowProxyProps<T> = IframeHTMLAttributes<HTMLIFrameElement> & {
  messageId?: string
  // 窗口加载完成的回调方法
  onRender?: (handle: WindowHandler<T>) => void
  // 渲染完毕的回调钩子函数
  callbackHandler?: (handler: WindowHandler<T>) => void
}

export default class<T extends MessageBody> extends Component<WindowProxyProps<T> & WindowMessageBase<T>> {
  private handler: WindowHandler<T>

  componentWillMount() {
    const { src, messageId, onMessage } = this.props
    const handler: WindowHandler<T> = createWindowHandler(src, {
      onMessage: (handler, data) => {
        if (typeof onMessage === 'function') {
          // 这里过滤无效的消息事件
          // 如果消息里面不包含编号则屏蔽
          if (!messageId || data.messageId === messageId) {
            onMessage(handler, data)
          } else if (data.messageId) {
            utils.warning('invalid message id.')
          }
        }
      },
    })
    if (messageId) {
      const { postMessage } = handler
      handler.postMessage = (data) => {
        if (data && typeof data === 'object') {
          data.messageId = messageId
        }
        postMessage(data)
      }
    }
    this.handler = handler
  }

  componentWillUnmount() {
    this.handler.destroy()
  }

  render() {
    const { src, messageId, onRender, callbackHandler, ...otherProps } = this.props
    const urlSrc = utils.toUrl(src || 'about:blank', {
      messageId,
      targetOrigin: location.origin,
    })
    const handler = this.handler
    return (
      <iframe
        allowFullScreen={false}
        allowTransparency={false}
        {...otherProps}
        ref={(target) => {
          if (target && target.contentWindow) {
            handler.contentWindow = target.contentWindow
          }
          if (target && typeof callbackHandler === 'function') {
            callbackHandler(handler)
          }
        }}
        src={urlSrc}
        onLoad={() => {
          if (typeof onRender === 'function') {
            onRender(handler)
          }
        }}
      />
    )
  }
}

export { WindowProxyProps }
