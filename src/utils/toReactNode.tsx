import React, { HTMLAttributes, ReactElement, ReactHTML, ReactNode, createElement } from 'react'

type ToReactNode = HTMLAttributes<Element> & {
  as?: keyof ReactHTML
  isInline?: boolean
}

export default (content: ReactNode, params?: ToReactNode): ReactElement => {
  const { as, isInline, ...otherAttrs } = params || {}
  const attrs: HTMLAttributes<Element> = {
    ...otherAttrs,
  }
  if (isInline === true) {
    if (attrs.style) {
      attrs.style.display = 'inline'
    } else {
      attrs.style = {
        display: 'inline',
      }
    }
  }
  if (React.isValidElement(content)) {
    // 如果没有提供第二个参数则直接返回
    if (params && typeof params === 'object') {
      attrs.children = content
    } else {
      return content
    }
  } else if (typeof content === 'string' || typeof content === 'number') {
    // 字符串类型返回HTML渲染
    attrs.dangerouslySetInnerHTML = {
      __html: content,
    }
  } else {
    return null
  }
  return createElement(as || 'div', attrs)
}

export { ToReactNode }
