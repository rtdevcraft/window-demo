import { useEffect, useCallback, useMemo } from 'react'
import { Action } from '@/lib/multi-window/types'
import { throttle } from '@/lib/utils'

const DRAG_THROTTLE_LIMIT = 16

export function useWindowInteraction(
  dispatch: React.Dispatch<Action>,
  isInteracting: boolean
) {
  const throttledMouseMove = useMemo(
    () =>
      throttle((event: MouseEvent) => {
        dispatch({
          type: 'UPDATE_INTERACTION',
          payload: { clientX: event.clientX, clientY: event.clientY },
        })
      }, DRAG_THROTTLE_LIMIT),
    [dispatch]
  )

  const handleMouseUp = useCallback(() => {
    dispatch({ type: 'END_INTERACTION' })
  }, [dispatch])

  useEffect(() => {
    if (isInteracting) {
      document.addEventListener('mousemove', throttledMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', throttledMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = 'auto'
      }
    }
  }, [isInteracting, throttledMouseMove, handleMouseUp])
}
