import React, { useState, useEffect, useRef, ReactNode, CSSProperties, HTMLAttributes } from 'react'

type SimpleAffixProps = HTMLAttributes<HTMLElement> & {
  // element to follow/base floating points
  watchElement?: HTMLElement | string
  wrapperAttributes?: HTMLAttributes<HTMLElement>
  offsetTop?: number
  offsetBottom?: number
  // maintain width by inheriting parent width
  inheritParentWidth?: boolean
  // content
  children?: ReactNode
}

const queryElement = (selector: string | HTMLElement): HTMLElement | null => {
  if (selector instanceof HTMLElement) {
    return selector
  } else if (selector) {
    return document.querySelector(selector)
  }
  return null
}

export default (props: SimpleAffixProps) => {
  const {
    watchElement = '',
    wrapperAttributes = {},
    offsetTop = 15,
    offsetBottom = 15,
    inheritParentWidth = true,
    children,
    ...otherProps
  } = props

  const [affixStyle, setAffixStyle] = useState<CSSProperties>({})
  const rootRef = useRef<HTMLDivElement>(null)
  const affixRef = useRef<HTMLDivElement>(null)
  const prevWindowScrollYRef = useRef<number>(window?.scrollY ?? 0)
  const rootElement = rootRef.current

  const isElementVisible = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return rect.width > 0 || rect.height > 0
  }

  const computeStyle = (): CSSProperties => {
    const styleCss: CSSProperties = {}
    const relative = queryElement(watchElement) || rootRef.current?.parentElement

    if (!rootRef.current || !affixRef.current || !relative) return styleCss

    if (!isElementVisible(relative)) return styleCss
    if (!isElementVisible(rootRef.current)) return styleCss
    if (!isElementVisible(affixRef.current)) return styleCss

    const relativeRect = relative.getBoundingClientRect()
    const rootRect = rootRef.current.getBoundingClientRect()
    const affixRect = affixRef.current.getBoundingClientRect()

    const scrollY = window.scrollY
    const prevScrollY = prevWindowScrollYRef.current

    const contentHeight = affixRef.current.clientHeight
    const affixHeight = offsetTop + contentHeight + offsetBottom

    const floatStartPoint = scrollY + rootRect.top
    const floatEndPoint = scrollY + relativeRect.bottom
    const floatSpace = floatEndPoint - floatStartPoint
    const canFloat = floatSpace > affixHeight

    const scrollingUp = prevScrollY > scrollY
    const scrollingDown = prevScrollY < scrollY
    const scrollDistance = Math.abs(scrollY - prevScrollY)

    const bottomPosition = Math.ceil(floatEndPoint - (scrollY + contentHeight))

    if (scrollY + offsetTop > floatStartPoint && canFloat) {
      styleCss.position = 'fixed'
      styleCss.top = offsetTop

      if (inheritParentWidth) {
        styleCss.width = rootRef.current.clientWidth + 'px'
      }
      if (scrollY + offsetTop + contentHeight >= floatEndPoint) {
        styleCss.top = bottomPosition + 'px'
      }
      if (affixHeight > window.innerHeight) {
        if (scrollY + affixRect.bottom >= floatEndPoint) {
          styleCss.top = bottomPosition + 'px'
        } else if (scrollingDown) {
          styleCss.top = Math.max(affixRect.top - scrollDistance, window.innerHeight - contentHeight - offsetBottom) + 'px'
        } else if (scrollingUp) {
          styleCss.top = Math.min(affixRect.top + scrollDistance) + 'px'
        }
      }
    }
    return styleCss
  }

  useEffect(() => {
    const scrollHandler = () => {
      setAffixStyle(computeStyle())
      prevWindowScrollYRef.current = window.scrollY
    }

    setAffixStyle(computeStyle())
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('resize', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', scrollHandler)
    }
  }, [watchElement, offsetTop, offsetBottom, inheritParentWidth])

  useEffect(() => {
    if (rootElement && ResizeObserver && inheritParentWidth) {
      let width: number | null = null

      const observer = new ResizeObserver(() => {
        if (width !== null && width !== rootElement.clientWidth) {
          setAffixStyle(computeStyle())
          prevWindowScrollYRef.current = window.scrollY
        }
        width = rootElement.clientWidth
      })

      observer.observe(rootElement)
      return () => observer.disconnect()
    }

    return () => {}
  }, [rootElement])

  return (
    <div
      {...otherProps}
      ref={rootRef}>
      <div
        {...wrapperAttributes}
        ref={affixRef}
        style={affixStyle}>
        {children}
      </div>
    </div>
  )
}

export { SimpleAffixProps }
