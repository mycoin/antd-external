import { BaseEmbedWindowParam, MessageData, WindowHandler } from '../interfaces'

/**
 * 绑定消息事件并且返回必要的快捷操作工具
 *
 * @param urlSrc
 * @param params
 * @returns
 */
export default (urlSrc: string, params: BaseEmbedWindowParam<WindowHandler>) => {
  const { messageId, onMessage, afterClose } = params
  const { hostname, origin } = new URL(urlSrc)
  const eventListener = (event: MessageEvent<MessageData>) => {
    // 只监听来着窗口的消息
    if (event.source !== handler.target) {
      return
    }
    if (typeof onMessage === 'function') {
      const data = event.data || {}
      // 这里过滤无效的消息事件
      // 如果消息里面不包含编号则屏蔽
      if (!messageId || data.messageId == messageId) {
        onMessage(handler, data)
      }
    }
  }
  const handler: WindowHandler = {
    postMessage: (data) => {
      const contentWindow = handler.target
      if (contentWindow) {
        if (messageId && data && typeof data === 'object') {
          data.messageId = messageId
        }
        // 发送给内嵌页面容器
        contentWindow.postMessage(data, hostname ? origin : '*')
      }
    },
    write: (html) => {
      const contentWindow = handler.target
      if (contentWindow) {
        contentWindow.document.open()
        contentWindow.document.write(html)
        contentWindow.document.close()
        return true
      } else {
        return false
      }
    },
    destroy: () => {
      const contentWindow = handler.target
      // 防止重复回调
      if (contentWindow) {
        removeEventListener('message', eventListener)
        if (typeof afterClose === 'function') {
          afterClose()
        }
        // 销毁对象引用关系
        delete handler.target
      }
    },
    hideModal: () => {},
  }
  // 添加事件绑定
  addEventListener('message', eventListener)
  // 返回句柄
  return handler
}
