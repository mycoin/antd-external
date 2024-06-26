import React from 'react'
import { Popconfirm, ButtonProps, PopconfirmProps as C } from 'antd'

type PopconfirmProps = C & {
  okDanger?: boolean
  buttonSize?: ButtonProps['size']
}

const defaultProps: Partial<PopconfirmProps> = {
  okText: '确认',
  cancelText: '取消',
  okButtonProps: {},
  cancelButtonProps: {},
  buttonSize: 'middle',
  destroyTooltipOnHide: true,
}

export default (props: PopconfirmProps) => {
  const { okDanger, buttonSize, okButtonProps, cancelButtonProps, ...otherProps } = {
    ...defaultProps,
    ...props,
  }
  if (okButtonProps) {
    okButtonProps.danger = okDanger
    okButtonProps.size = 'middle'
  }
  if (cancelButtonProps) {
    cancelButtonProps.size = 'middle'
  }
  return (
    <Popconfirm
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      {...otherProps}
    />
  )
}

export { PopconfirmProps }
