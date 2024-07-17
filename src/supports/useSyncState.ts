import { useCallback, useReducer, useRef } from 'react'

function useEvent<T extends Function>(callback: T): T {
  const fnRef = useRef<any>()
  fnRef.current = callback

  const memoFn = useCallback(((...args: any) => fnRef.current?.(...args)) as any, [])
  return memoFn
}

type Updater<T> = T | ((prevValue: T) => T)

export type SetState<T> = (nextValue: Updater<T>) => void

/**
 * Same as React.useState but will always get latest state.
 * This is useful when React merge multiple state updates into one.
 * e.g. onTransitionEnd trigger multiple event at once will be merged state update in React.
 */
export default function <T>(defaultValue?: T): [get: () => T, set: SetState<T>] {
  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const currentValueRef = useRef(defaultValue)
  const getValue = useEvent(() => {
    return currentValueRef.current
  })
  const setValue = useEvent((updater: Updater<T>) => {
    currentValueRef.current =
      typeof updater === 'function'
        ? (updater as (prevValue: T) => T)(currentValueRef.current) //
        : updater

    forceUpdate()
  })
  return [getValue, setValue]
}
