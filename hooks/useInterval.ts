import { useEffect, useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'


function useInterval(callback: () => void, delay: number | null,...rest:any) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }
    // console.log('useInterval',delay,...rest)
    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay,...rest])
}

export default useInterval
