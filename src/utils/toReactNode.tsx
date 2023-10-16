import React, { HTMLAttributes, ReactElement, ReactHTML, ReactNode, createElement } from 'react'

type ToReactNode = HTMLAttributes<Element> & {
  as?: keyof ReactHTML
}

export default (content: ReactNode, params?: ToReactNode): ReactElement => {
  const { as, ...otherAttrs } = params || {}
  const attrs: HTMLAttributes<Element> = {
    ...otherAttrs,
  }

  if (React.isValidElement(content)) {
    if (params && typeof params === 'object') {
      attrs.children = content
    } else {
      return content
    }
  } else if (typeof content === 'string' || typeof content === 'number') {
    attrs.dangerouslySetInnerHTML = {
      __html: content,
    }
  } else {
    return null
  }
  return createElement(as || 'div', attrs)
}

export { ToReactNode }
