import { windowsReducer, initialState } from './reducer'
import { Action } from './types'

describe('windowsReducer', () => {
  it('should return the initial state for an unknown action', () => {
    const dummyAction = { type: 'UNKNOWN_ACTION' } as unknown as Action
    expect(windowsReducer(initialState, dummyAction)).toEqual(initialState)
  })

  it('should handle the OPEN action for a new window', () => {
    const action: Action = { type: 'OPEN', payload: { type: 'analytics' } }
    const newState = windowsReducer(initialState, action)

    expect(newState.windows).toHaveLength(1)
    expect(newState.windows[0].type).toBe('analytics')
    expect(newState.windows[0].zIndex).toBe(1001)
  })

  it('should bring an existing window to the front if opened again', () => {
    let state = windowsReducer(initialState, {
      type: 'OPEN',
      payload: { type: 'analytics' },
    })
    state = windowsReducer(state, {
      type: 'OPEN',
      payload: { type: 'settings' },
    })

    const settingsZIndex = state.windows.find(
      (w) => w.type === 'settings'
    )?.zIndex

    state = windowsReducer(state, {
      type: 'OPEN',
      payload: { type: 'analytics' },
    })

    const analyticsZIndex = state.windows.find(
      (w) => w.type === 'analytics'
    )?.zIndex
    expect(analyticsZIndex).toBeGreaterThan(settingsZIndex!)
  })

  it('should handle the CLOSE action', () => {
    let state = windowsReducer(initialState, {
      type: 'OPEN',
      payload: { type: 'analytics' },
    })
    const windowId = state.windows[0].id

    state = windowsReducer(state, { type: 'CLOSE', payload: { id: windowId } })
    expect(state.windows).toHaveLength(0)
  })

  it('should handle the TOGGLE_MAXIMIZE action', () => {
    let state = windowsReducer(initialState, {
      type: 'OPEN',
      payload: { type: 'analytics' },
    })
    const windowId = state.windows[0].id

    state = windowsReducer(state, {
      type: 'TOGGLE_MAXIMIZE',
      payload: { id: windowId },
    })
    expect(state.windows[0].isMaximized).toBe(true)

    state = windowsReducer(state, {
      type: 'TOGGLE_MAXIMIZE',
      payload: { id: windowId },
    })
    expect(state.windows[0].isMaximized).toBe(false)
  })
  describe('Interaction actions', () => {
    it('should update a window position on UPDATE_INTERACTION for drag', () => {
      const state = windowsReducer(initialState, {
        type: 'OPEN',
        payload: { type: 'analytics' },
      })
      const windowId = state.windows[0].id

      state.interaction = {
        type: 'drag',
        windowId,
        offsetX: 50,
        offsetY: 20,
        startWidth: 0,
        startHeight: 0,
        direction: null,
      }

      const action: Action = {
        type: 'UPDATE_INTERACTION',
        payload: { clientX: 200, clientY: 150 },
      }
      const newState = windowsReducer(state, action)

      //
      expect(newState.windows[0].x).toBe(150)
      expect(newState.windows[0].y).toBe(130)
    })
  })
  it('should update a window size on UPDATE_INTERACTION for resize', () => {
    const state = windowsReducer(initialState, {
      type: 'OPEN',
      payload: { type: 'analytics' },
    })
    const windowId = state.windows[0].id
    const initialSize = state.windows[0]

    state.interaction = {
      type: 'resize',
      windowId,
      offsetX: initialSize.x + initialSize.width,
      offsetY: initialSize.y + initialSize.height,
      startWidth: initialSize.width,
      startHeight: initialSize.height,
      direction: 'se',
    }

    const action: Action = {
      type: 'UPDATE_INTERACTION',
      payload: { clientX: 800, clientY: 600 },
    }
    const newState = windowsReducer(state, action)

    // Assert that the window is now wider and taller
    expect(newState.windows[0].width).toBeGreaterThan(initialSize.width)
    expect(newState.windows[0].height).toBeGreaterThan(initialSize.height)
  })
})
