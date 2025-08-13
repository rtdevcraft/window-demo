'use client'

import React, { useReducer } from 'react'
import { Box, Typography } from '@mui/material'
import { windowsReducer, initialState } from '@/lib/multi-window/reducer'
import { useWindowInteraction } from '@/hooks/useWindowInteraction'
import { Launcher } from '@/components/multi-window/Launcher'
import { Desktop } from '@/components/multi-window/Desktop'

export default function MultiWindowPage() {
  const [state, dispatch] = useReducer(windowsReducer, initialState)

  // Attach the interaction hook
  useWindowInteraction(dispatch, !!state.interaction.type)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 50%, #F8FAFC 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center', mb: 6 }}>
          <Typography variant='h3' fontWeight='bold' mb={2}>
            Multi-Window Interface
          </Typography>
          <Typography variant='body1' color='text.secondary' mb={4}>
            Launch and interact with multiple windows.
          </Typography>
          <Launcher dispatch={dispatch} />
        </Box>
      </Box>

      <Desktop state={state} dispatch={dispatch} />
    </Box>
  )
}
