import { Promisable, PromisableFn } from '../interfaces'

/**
 * Reduce a list of values using promises into a promise for a value
 *
 * @param iterable
 * @param reducer
 * @param initialValue
 * @returns
 */
export default async function promiseReduce<T>(
  // Iterated over serially in the reducer function.
  iterable: PromisableFn<T>[],
  // Expected to return a value. If a Promise is returned, it's awaited before continuing with the next iteration.
  reducer: (prev: T, current: PromisableFn<T>, index: number) => Promisable<T>,
  // alue to use as previousValue in the first reducer invocation.
  initialValue: T,
) {
  return new Promise<T>((resolve, reject) => {
    const iterator = iterable[Symbol.iterator]()
    let index = 0
    const next = async (total: Promisable<T>) => {
      const element = iterator.next()
      if (element.done) {
        resolve(total)
        return
      }
      try {
        const [resolvedTotal, resolvedValue] = await Promise.all([total, element.value])
        next(reducer(resolvedTotal, resolvedValue, index++))
      } catch (error) {
        reject(error)
      }
    }
    next(initialValue)
  })
}
