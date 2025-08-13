'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Paper,
  Avatar,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { X, Sparkles, BarChart3 } from 'lucide-react'
import { METRICS_DATA } from '@/lib/constants'
import { Metric } from '@/lib/types'

const GlassBackdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `linear-gradient(135deg, 
    rgba(0, 0, 0, 0.75) 0%, 
    rgba(15, 23, 42, 0.8) 25%,
    rgba(30, 41, 59, 0.75) 50%,
    rgba(15, 23, 42, 0.8) 75%,
    rgba(0, 0, 0, 0.75) 100%)`,
  backdropFilter: 'blur(20px)',
  zIndex: 1300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
})

const GlassWindow = styled(Paper)<{ 'data-expanded'?: boolean }>(
  ({ theme, 'data-expanded': expanded }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(24px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3)
    `,
    outline: 'none',
    transformOrigin: 'center center',
    width: expanded ? '800px' : '128px',
    height: expanded ? '384px' : '48px',
    maxWidth: '90vw',
    transform: expanded ? 'scale(1)' : 'scale(0.95)',
    opacity: expanded ? 1 : 0,
    transition: theme.transitions.create(['all'], {
      duration: theme.transitions.duration.short, // 200ms
      easing: theme.transitions.easing.easeOut,
    }),
  })
)

const FloatingOrb = styled('div')<{ index: number }>(({ index }) => ({
  position: 'absolute',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)',
  opacity: 0.1,
  left: `${15 + (index % 3) * 30}%`,
  top: `${15 + Math.floor(index / 3) * 25}%`,
  animation: `float ${8 + index * 2}s infinite ease-in-out`,
  animationDelay: `${index * 0.5}s`,
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
    '33%': { transform: 'translateY(-15px) rotate(120deg)' },
    '66%': { transform: 'translateY(10px) rotate(240deg)' },
  },
}))

type MorphingWindowProps = {
  onClose: () => void
}

export const MorphingWindow = ({ onClose }: MorphingWindowProps) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsExpanded(true)
  }, [])

  const handleClose = () => {
    setIsExpanded(false)
    setTimeout(onClose, theme.transitions.duration.short)
  }

  return (
    <GlassBackdrop>
      {Array.from({ length: 8 }, (_, i) => (
        <FloatingOrb key={i} index={i} />
      ))}

      <GlassWindow data-expanded={isExpanded}>
        {isExpanded && (
          <Box
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background:
                      'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                    borderRadius: '12px',
                  }}
                >
                  <Sparkles size={24} color='white' />
                </Avatar>
                <Box>
                  <Typography
                    variant='h5'
                    component='h2'
                    fontWeight='bold'
                    color='text.primary'
                  >
                    Analytics Dashboard
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Real-time business insights
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  '&:hover': {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <X size={20} />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {METRICS_DATA.map((metric) => (
                <Card
                  key={metric.label}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '8px',
                        }}
                      >
                        <metric.icon
                          size={20}
                          color={theme.palette.text.secondary}
                        />
                      </Avatar>
                      <Typography
                        variant='body2'
                        fontWeight='medium'
                        color='text.secondary'
                      >
                        {metric.label}
                      </Typography>
                    </Box>

                    <Typography
                      variant='h4'
                      component='div'
                      fontWeight='bold'
                      sx={{ mb: 1 }}
                    >
                      {metric.value}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant='body2'
                        color={metric.positive ? 'success.main' : 'error.main'}
                        fontWeight='medium'
                      >
                        {metric.change}
                      </Typography>
                      <Chip
                        label={metric.positive ? 'Growth' : 'Decline'}
                        color={metric.positive ? 'success' : 'error'}
                        size='small'
                        variant='outlined'
                        sx={{
                          backgroundColor: metric.positive
                            ? 'rgba(22, 163, 74, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                          fontWeight: 'medium',
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>

                    <LinearProgress
                      variant='determinate'
                      value={metric.progress}
                      color={metric.color}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
              }}
            >
              <Button variant='text' color='primary'>
                View Details
              </Button>
              <Button
                variant='contained'
                startIcon={<BarChart3 size={16} />}
                sx={{
                  background:
                    'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
                  },
                }}
              >
                Export Report
              </Button>
            </Box>
          </Box>
        )}
      </GlassWindow>
    </GlassBackdrop>
  )
}
