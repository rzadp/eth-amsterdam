import { useState, useLayoutEffect } from 'react'

const INITIAL_STATE: [any, any] = [undefined, undefined]

export function useAsync<T> (execute: () => Promise<T>, deps: readonly any[]) {
  const [state, setState] = useState<[T | undefined, any]>(INITIAL_STATE)

  useLayoutEffect(() => {
    setState(INITIAL_STATE)

    let cancelled = false

    execute().then(
      result => cancelled === false && setState([result, undefined]),
      err => cancelled === false && setState([undefined, err]),
    )

    return () => { cancelled = true }
  }, deps)

  return state
}
