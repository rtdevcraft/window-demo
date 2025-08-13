import { MultiWindowState, Action, WindowState } from './types'
import { WINDOW_CONFIGS } from './config'

export const initialState: MultiWindowState = {
  windows: [],

  interaction: {
    type: null,
    windowId: null,
    offsetX: 0,
    offsetY: 0,
    startWidth: 0,
    startHeight: 0,
    direction: null,
  },
}

const INITIAL_Z_INDEX = 1000

function bringToFront(windows: WindowState[], id: string): WindowState[] {
  if (windows.length === 0) return []
  const maxZ = Math.max(...windows.map((w) => w.zIndex))
  return windows.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
}

export function windowsReducer(
  state: MultiWindowState,
  action: Action
): MultiWindowState {
  switch (action.type) {
    case 'OPEN': {
      const { type } = action.payload
      const existing = state.windows.find((w) => w.type === type)

      if (existing) {
        return {
          ...state,
          windows: bringToFront(state.windows, existing.id),
        }
      }

      const config = WINDOW_CONFIGS[type]
      const newWindow: WindowState = {
        id: `${type}-${Date.now()}`,
        type,
        x: 100 + state.windows.length * 40,
        y: 100 + state.windows.length * 40,
        ...config.defaultSize,
        isMaximized: false,
        zIndex:
          Math.max(...state.windows.map((w) => w.zIndex), INITIAL_Z_INDEX) + 1,
      }

      return {
        ...state,
        windows: [...state.windows, newWindow],
      }
    }

    case 'CLOSE': {
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload.id),
      }
    }

    case 'TOGGLE_MAXIMIZE': {
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id === action.payload.id) {
            const isMaximized = !w.isMaximized
            return {
              ...w,
              isMaximized,
              x: isMaximized ? 0 : 100,
              y: isMaximized ? 0 : 100,
            }
          }
          return w
        }),
      }
    }

    case 'BRING_TO_FRONT': {
      return {
        ...state,
        windows: bringToFront(state.windows, action.payload.id),
      }
    }

    case 'START_INTERACTION': {
      const { type, id, event, direction } = action.payload
      const window = state.windows.find((w) => w.id === id)
      if (!window || window.isMaximized) return state

      return {
        ...state,
        windows: bringToFront(state.windows, id),
        interaction: {
          type,
          windowId: id,

          offsetX: type === 'drag' ? event.clientX - window.x : event.clientX,
          offsetY: type === 'drag' ? event.clientY - window.y : event.clientY,
          startWidth: window.width,
          startHeight: window.height,
          direction: direction || null,
        },
      }
    }

    case 'END_INTERACTION': {
      return {
        ...state,
        interaction: initialState.interaction,
      }
    }

    case 'UPDATE_INTERACTION': {
      const { interaction } = state
      if (!interaction.type || !interaction.windowId) return state

      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== interaction.windowId) return w

          if (interaction.type === 'drag') {
            const newX = action.payload.clientX - interaction.offsetX
            const newY = action.payload.clientY - interaction.offsetY
            return { ...w, x: newX, y: newY }
          }

          if (interaction.type === 'resize') {
            const deltaX = action.payload.clientX - interaction.offsetX
            const deltaY = action.payload.clientY - interaction.offsetY
            let newWidth = interaction.startWidth
            let newHeight = interaction.startHeight
            if (interaction.direction?.includes('e'))
              newWidth = Math.max(300, interaction.startWidth + deltaX)
            if (interaction.direction?.includes('s'))
              newHeight = Math.max(200, interaction.startHeight + deltaY)
            return { ...w, width: newWidth, height: newHeight }
          }
          return w
        }),
      }
    }

    default:
      return state
  }
}
