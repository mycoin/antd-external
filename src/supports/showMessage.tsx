import { message } from 'antd'
import React, { ReactElement } from 'react'
import { ArgsProps } from 'antd/lib/message'
import toReactNode from './toReactNode'

const callMessageOpen = (params: ArgsProps) => {
  if (!params.key) {
    message.destroy()
  }

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
    return callMessageOpen({
      type: 'warning',
      content: content.message,
    })
  } else if (React.isValidElement(content) || typeof content === 'string') {
    return callMessageOpen({
      content,
    })
  } else if (content && typeof content === 'object') {
    return callMessageOpen(content as ArgsProps)
  } else {
    return () => {}
  }
}

export { callMessageOpen }
