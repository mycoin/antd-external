import React from 'react'
import { ConfigProvider } from 'antd'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import zhCN from 'antd/es/locale/zh_CN'

export default (props: ConfigProviderProps) => (
  <ConfigProvider
    locale={zhCN}
    {...props}
  />
)
