export default (result: boolean | Error | Promise<any>): Promise<true> => {
  if (result instanceof Promise) {
    return result
  } else if (result === false || result instanceof Error) {
    return Promise.reject(result)
  } else {
    return Promise.resolve(true)
  }
}
