import { renderHook } from '@testing-library/react'
import { useWindowInteraction } from './useWindowInteraction'

describe('useWindowInteraction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should add and remove event listeners when interaction starts and stops', () => {
    const addSpy = jest.spyOn(document, 'addEventListener')
    const removeSpy = jest.spyOn(document, 'removeEventListener')
    const dispatch = jest.fn()

    const { rerender } = renderHook(
      ({ isInteracting }) => useWindowInteraction(dispatch, isInteracting),
      {
        initialProps: { isInteracting: false },
      }
    )

    rerender({ isInteracting: true })

    expect(addSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(addSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))

    rerender({ isInteracting: false })

    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))
  })
})
