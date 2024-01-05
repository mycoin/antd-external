// 判断对象是否有值
export default <T = any>(eventOrValue: any): T => {
  const { target } = eventOrValue || {}

  if (target && target.tagName) {
    if (typeof target.checked === 'boolean') {
      return target.checked
    } else {
      return target.value
    }
  }
  return eventOrValue
}
