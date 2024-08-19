import React from 'react'
import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import toReactNode from './toReactNode'

const callNotification = (params: ArgsProps) => {
  if (!params.key) {
    notification.destroy()
  }

  const { message, ...otherProps } = params
  notification.open({
    className: 'ant-external-notification',
    placement: 'top',
    type: 'info',
    duration: 2.5,
    maxCount: 2,
    message: toReactNode(message, {
      isInline: true,
    }),
    ...otherProps,
  })

  // 返回隐藏销毁的方法
  return () => {
    notification.destroy()
  }
}

export default (content: ArgsProps) => {
  if (content instanceof Error) {
    return callNotification({
      type: 'warning',
      message: content.message,
    })
  } else if (React.isValidElement(content) || typeof content === 'string') {
    return callNotification({
      message: content,
    })
  } else if (content && typeof content === 'object') {
    return callNotification(content as ArgsProps)
  } else {
    return () => {}
  }
}
