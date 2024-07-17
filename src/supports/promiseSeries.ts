import { PromisableFn } from '../interfaces'

/**
 * Run promise-returning & async functions in series
 *
 * @param tasks
 * @returns
 */
export default async function promiseSeries(tasks: PromisableFn[]) {
  const results = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}
