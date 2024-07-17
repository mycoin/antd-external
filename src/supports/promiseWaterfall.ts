import promiseReduce from './promiseReduce'
import { PromisableFn } from '../interfaces'

/**
 * Run promise-returning & async functions in series, each passing its result to the next
 *
 * @param initialValue
 * @param iterable
 * @returns
 */
export default async function promiseWaterfall<T>(iterable: PromisableFn<T>[], initialValue?: T) {
  return promiseReduce(iterable, (previousValue, method) => method(previousValue), initialValue)
}
