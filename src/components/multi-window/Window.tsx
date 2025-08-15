import React from 'react'
import { Box, Paper, Typography, Avatar, IconButton } from '@mui/material'
import { X, Maximize2, Minimize2 } from 'lucide-react'
import { WindowState, Action } from '@/lib/multi-window/types'
import { WINDOW_CONFIGS } from '@/lib/multi-window/config'
import { AnalyticsContent } from './content/AnalyticsContent'
import { SettingsContent } from './content/SettingsContent'
import { CalendarContent } from './content/CalendarContent'

const contentMapping = {
  analytics: AnalyticsContent,
  settings: SettingsContent,
  calendar: CalendarContent,
}

interface WindowProps {
  windowState: WindowState
  isActive: boolean
  isInteracting?: boolean
  dispatch: React.Dispatch<Action>
}

const HEADER_HEIGHT = 60
const BORDER_WIDTH = 2

export const Window = React.memo(
  ({ windowState, isActive, dispatch, isInteracting }: WindowProps) => {
    const config = WINDOW_CONFIGS[windowState.type]
    const ContentComponent = contentMapping[windowState.type]
    const MaximizeIcon = windowState.isMaximized ? Minimize2 : Maximize2

    const handleMouseDown =
      (type: 'drag' | 'resize', direction?: string) =>
      (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        dispatch({
          type: 'START_INTERACTION',
          payload: { type, id: windowState.id, event, direction },
        })
      }

    return (
      <Paper
        role='dialog'
        aria-labelledby={`window-title-${windowState.id}`}
        onMouseDown={() =>
          dispatch({ type: 'BRING_TO_FRONT', payload: { id: windowState.id } })
        }
        elevation={isActive ? 12 : 5}
        sx={{
          position: 'fixed',
          left: windowState.x,
          top: windowState.y,
          width: windowState.isMaximized ? '100vw' : windowState.width,
          height: windowState.isMaximized ? '100vh' : windowState.height,
          zIndex: windowState.zIndex,
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(24px)',
          borderRadius: windowState.isMaximized ? 0 : 2,
          border: isActive
            ? `${BORDER_WIDTH}px solid rgba(59,130,246,0.6)`
            : `${BORDER_WIDTH}px solid rgba(59,130,246,0.2)`,
          boxShadow: isInteracting
            ? '0 15px 35px rgba(59,130,246,0.20)'
            : isActive
            ? '0 25px 50px rgba(59,130,246,0.25)'
            : '0 15px 35px rgba(59,130,246,0.15)',
          transition: isInteracting ? 'none' : 'all 0.3s ease',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          onMouseDown={handleMouseDown('drag')}
          sx={{
            p: 2,
            height: HEADER_HEIGHT,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'move',
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 32, height: 32, background: config.gradient }}>
              <config.icon size={16} color='white' />
            </Avatar>
            <Box>
              <Typography
                id={`window-title-${windowState.id}`}
                variant='subtitle2'
                fontWeight='bold'
              >
                {config.title}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {config.subtitle}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size='small'
              aria-label={windowState.isMaximized ? 'Minimize' : 'Maximize'}
              onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: 'TOGGLE_MAXIMIZE',
                  payload: { id: windowState.id },
                })
              }}
            >
              <MaximizeIcon size={16} />
            </IconButton>
            <IconButton
              size='small'
              aria-label='Close'
              onClick={(e) => {
                e.stopPropagation()
                dispatch({ type: 'CLOSE', payload: { id: windowState.id } })
              }}
            >
              <X size={16} />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <ContentComponent />
        </Box>

        {/* Resize Handles */}
        {!windowState.isMaximized && (
          <>
            <Box
              onMouseDown={handleMouseDown('resize', 'e')}
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 8,
                cursor: 'e-resize',
              }}
            />
            <Box
              onMouseDown={handleMouseDown('resize', 's')}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 8,
                cursor: 's-resize',
              }}
            />
            <Box
              onMouseDown={handleMouseDown('resize', 'se')}
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 12,
                height: 12,
                cursor: 'se-resize',
              }}
            />
          </>
        )}
      </Paper>
    )
  }
)

Window.displayName = 'Window'
