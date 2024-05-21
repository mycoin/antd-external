import React, { Component } from 'react'
import { Drawer, DrawerProps } from 'antd'
import { render, unmountComponentAtNode } from 'react-dom'
import classNames from 'classnames'
import { RenderProxy } from '../components'
import { RenderProxyProps } from '../components/RenderProxy'
import { PromiseActions, RenderHookHandler } from '../interfaces'
import { createHandlerHook } from './internal'

class InternalComponent<T = number> extends Component<any, any> {
  declare handler: RenderHookHandler<T>
  componentWillMount(): void {
    const { onOk, onCancel, value } = this.props
    this.handler = createHandlerHook<T>({
      value,
      onOk,
      onCancel,
      destroy: () => {
        this.onCloseEvent()
      },
    })
    this.state = {
      isOpen: true,
    }
  }

  onCloseEvent = () => {
    const { destroy } = this.props
    this.setState({
      isOpen: false,
    })
    setTimeout(destroy, 1000)
  }

  render(): React.ReactNode {
    const { contentRender, destroy, value, className, ...otherProps } = this.props
    const { isOpen } = this.state
    return (
      <Drawer
        maskClosable={false}
        {...otherProps}
        className={classNames(className, 'ant-external-drawer-panel')}
        open={isOpen}
        onClose={this.onCloseEvent}>
        <RenderProxy
          contentRender={contentRender}
          value={value}
          handler={this.handler}
        />
      </Drawer>
    )
  }
}

type RenderProxyType<T> = Omit<RenderProxyProps<T>, 'handler'>
type DrawerType = Omit<DrawerProps, 'children' | 'content'>

function showDrawerPanel<T = any>(params: RenderProxyType<T> & DrawerType & PromiseActions<T>) {
  const element = document.createDocumentFragment()
  const destroy = () => {
    unmountComponentAtNode(element)
  }

  render(
    <InternalComponent
      destroy={destroy}
      {...params}
    />,
    element,
  )
}

export default showDrawerPanel
