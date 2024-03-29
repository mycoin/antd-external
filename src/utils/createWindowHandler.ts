import { WindowMessageBase, WindowHandler } from '../interfaces'

type CreateWindowHandlerParam<T> = WindowMessageBase<T> & {
  urlSrc: string
  getContentWindow: () => Window
}

const getTargetOrigin = (urlSrc: string, defaultValue: string) => {
  try {
    const { origin, hostname } = new URL(urlSrc)
    return hostname ? origin : defaultValue
  } catch (e) {
    return defaultValue
  }
}

/**
 * 绑定消息事件并且返回必要的快捷操作工具
 *
 * @param urlSrc
 * @param params
 * @returns
 */
export default <T>(params: CreateWindowHandlerParam<T>) => {
  const { urlSrc, onMessage, getContentWindow } = params
  const listener = (event: MessageEvent<T>) => {
    // 只监听来着窗口的消息
    if (event.source === handler.contentWindow) {
      // 如果消息里面不包含编号则屏蔽
      onMessage(handler, event.data, event)
    }
  }

  const targetOrigin = getTargetOrigin(urlSrc, '*')
  const handler: WindowHandler<T> = {
    // 读取当前对象的方法
    get contentWindow() {
      return getContentWindow()
    },
    // 发送给内嵌页面容器
    postMessage: (data) => {
      const { contentWindow } = handler
      if (contentWindow) {
        contentWindow.postMessage(data, targetOrigin)
      }
    },
    write: (html) => {
      const { contentWindow } = handler
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
      const { contentWindow } = handler
      // 防止重复回调（该函数必然重复执行）
      if (contentWindow) {
        removeEventListener('message', listener)
      }
    },
  }

  // 添加事件绑定
  addEventListener('message', listener)
  // 返回句柄
  return handler
}
