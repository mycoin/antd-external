import { message } from 'antd'
import React, { ReactElement } from 'react'
import { ArgsProps } from 'antd/lib/message'
import toReactNode from './toReactNode'

const showMessage = (params: ArgsProps) => {
  message.destroy()

  const { content, ...otherProps } = params
  const unsafeHide = message.open({
    type: 'info',
    duration: 1.5,
    content: toReactNode(content, {
      isInline: true,
    }),
    onClick: () => {
      unsafeHide()
    },
    ...otherProps,
  })
  // 返回隐藏销毁的方法
  return () => {
    unsafeHide()
  }
}

export default (content: string | Error | ReactElement | ArgsProps) => {
  if (content instanceof Error) {
    return showMessage({
      type: 'warning',
      content: content.message,
    })
  } else if (React.isValidElement(content) || typeof content === 'string') {
    return showMessage({
      content,
    })
  } else if (content && typeof content === 'object') {
    return showMessage(content as ArgsProps)
  } else {
    return () => {}
  }
}
