import { LucideIcon } from 'lucide-react'

// 1. Define the window types explicitly.
export type WindowType = 'analytics' | 'settings' | 'calendar'

// Describes the state of a single window
export interface WindowState {
  id: string
  // 2. Use the new WindowType here.
  type: WindowType
  x: number
  y: number
  width: number
  height: number
  isMaximized: boolean
  zIndex: number
}

// Describes the user's current interaction (dragging/resizing)
export interface InteractionState {
  type: 'drag' | 'resize' | null
  windowId: string | null
  offsetX: number
  offsetY: number
  startWidth: number
  startHeight: number
  direction: string | null
}

// The complete state for the window manager
export interface MultiWindowState {
  windows: WindowState[]
  interaction: InteractionState
}

// All possible actions that can be dispatched to the reducer
export type Action =
  | { type: 'OPEN'; payload: { type: WindowType } }
  | { type: 'CLOSE'; payload: { id: string } }
  | { type: 'TOGGLE_MAXIMIZE'; payload: { id: string } }
  | { type: 'BRING_TO_FRONT'; payload: { id: string } }
  | {
      type: 'START_INTERACTION'
      payload: {
        type: 'drag' | 'resize'
        id: string
        event: React.MouseEvent
        direction?: string
      }
    }
  | {
      type: 'UPDATE_INTERACTION'
      payload: { clientX: number; clientY: number }
    }
  | { type: 'END_INTERACTION' }

// Describes the structure of the window configuration object
export interface WindowConfig {
  title: string
  subtitle: string
  icon: LucideIcon
  gradient: string
  defaultSize: { width: number; height: number }
}
