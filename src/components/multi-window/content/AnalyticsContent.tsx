import { Box, Paper, Typography } from '@mui/material'

const metrics = [
  { label: 'Revenue', value: '$847K', change: '+12%' },
  { label: 'Users', value: '23,451', change: '+8%' },
  { label: 'Conversion', value: '3.2%', change: '-2%' },
  { label: 'AOV', value: '$124', change: '+5%' },
]

export const AnalyticsContent = () => (
  <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1 }}>
      {metrics.map((metric, i) => (
        <Box key={i} sx={{ width: '50%', p: 1 }}>
          <Paper
            sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.8)', height: '100%' }}
          >
            <Typography variant='caption' color='text.secondary'>
              {metric.label}
            </Typography>
            <Typography variant='h6' fontWeight='bold'>
              {metric.value}
            </Typography>
            <Typography
              variant='caption'
              color={
                metric.change.startsWith('+') ? 'success.main' : 'error.main'
              }
            >
              {metric.change}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  </Box>
)
