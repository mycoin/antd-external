import { ReactNode } from 'react'
import { utils } from 'rigel-base'
import { ArgsProps } from 'antd/lib/message'
import showMessage, { callMessageOpen } from './showMessage'

export default (content: ReactNode, params?: ArgsProps) => {
  const key = utils.getGuid(11)
  const hide = callMessageOpen({
    type: 'loading',
    key,
    content: content || '正在加载中',
    onClick: null,
    ...params,
  })

  return (success?: boolean, contentNode?: ReactNode) => {
    if (typeof success === 'boolean') {
      showMessage({
        key,
        type: success ? 'success' : 'warning',
        content: contentNode || (success ? '操作成功' : '操作失败，请稍后再试'),
      })
    } else {
      setTimeout(hide, 500)
    }
  }
}
