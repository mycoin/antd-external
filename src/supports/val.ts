const getNativeElement = (eventOrValue: any) => {
  const { nativeEvent, target } = eventOrValue || {}
  if (nativeEvent && nativeEvent.target) {
    return nativeEvent.target
  }
  return target
}

// 判断对象是否有值
export default <T = any>(eventOrValue: any): T => {
  const target = getNativeElement(eventOrValue)

  if (target && target.tagName) {
    const { type, checked, files, value } = target
    if (type === 'radio' || type === 'checkbox') {
      return checked
    } else if (type === 'file') {
      return files
    } else {
      return value
    }
  }
  return eventOrValue
}
