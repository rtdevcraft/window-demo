/**
 * Throttles a function, ensuring it's called at most once per limit in milliseconds.
 *
 * @param func The function to throttle.
 * @param limit The time limit in milliseconds.
 */

export function throttle<A extends unknown[]>(
  func: (...args: A) => void,
  limit: number
): (...args: A) => void {
  let inThrottle: boolean
  let lastFunc: NodeJS.Timeout
  let lastRan: number

  return function (this: unknown, ...args: A) {
    if (!inThrottle) {
      func.apply(this, args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
