/**
 * Create a debounced of a promise returning function
 */
export default <T, A extends Array<unknown>>(method: (...args: A) => Promise<T>, ms = 0) => {
  let lastTimer: ReturnType<typeof setTimeout> | undefined = undefined
  let cancelled = false

  const debounced = (...args: A) => {
    cancelled = false
    if (lastTimer) {
      clearTimeout(lastTimer)
    }
    return new Promise<T>((resolve, reject) => {
      const curTimer = setTimeout(async () => {
        try {
          let res
          if (!cancelled && curTimer === lastTimer) {
            res = await method(...args)
          }
          if (!cancelled && curTimer === lastTimer) {
            resolve(res)
          }
        } catch (e) {
          reject(e)
        }
      }, ms)
      lastTimer = curTimer
    })
  }
  debounced.cancel = function () {
    cancelled = true
  }
  return debounced
}
