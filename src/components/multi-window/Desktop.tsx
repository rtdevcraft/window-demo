import { Box } from '@mui/material'
import { Window } from './Window'
import { MultiWindowState, Action } from '@/lib/multi-window/types'

interface DesktopProps {
  state: MultiWindowState
  dispatch: React.Dispatch<Action>
}

export const Desktop = ({ state, dispatch }: DesktopProps) => {
  const activeWindowId = (() => {
    if (state.windows.length === 0) {
      return null
    }

    const topWindow = [...state.windows].sort((a, b) => b.zIndex - a.zIndex)[0]
    return topWindow.id
  })()

  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {state.windows.map((window) => (
        <Window
          key={window.id}
          windowState={window}
          isActive={window.id === activeWindowId}
          dispatch={dispatch}
          isInteracting={state.interaction.windowId === window.id}
        />
      ))}
    </Box>
  )
}
