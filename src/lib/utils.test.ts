import { throttle } from './utils'

jest.useFakeTimers()

describe('throttle', () => {
  it('should call the function immediately on the first call', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 100)
    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should not call the function again within the time limit', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 100)
    throttledFunc()
    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)
  })

  it('should call the function again after the time limit has passed', () => {
    const func = jest.fn()
    const throttledFunc = throttle(func, 100)

    throttledFunc()
    expect(func).toHaveBeenCalledTimes(1)

    throttledFunc()

    jest.advanceTimersByTime(100)

    expect(func).toHaveBeenCalledTimes(2)
  })
})
