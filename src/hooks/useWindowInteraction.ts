import { useEffect, useCallback } from 'react'
import { Action } from '@/lib/multi-window/types'

export function useWindowInteraction(
  dispatch: React.Dispatch<Action>,
  isInteracting: boolean
) {
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      dispatch({
        type: 'UPDATE_INTERACTION',
        payload: { clientX: event.clientX, clientY: event.clientY },
      })
    },
    [dispatch]
  )

  const handleMouseUp = useCallback(() => {
    dispatch({ type: 'END_INTERACTION' })
  }, [dispatch])

  useEffect(() => {
    if (isInteracting) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.userSelect = 'auto'
      }
    }
  }, [isInteracting, handleMouseMove, handleMouseUp])
}
