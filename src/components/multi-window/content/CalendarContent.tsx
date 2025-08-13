import { Box, Paper, Typography } from '@mui/material'

const events = [
  { time: '9:00 AM', event: 'Team Sync-Up' },
  { time: '11:30 AM', event: 'Project Alpha Review' },
  { time: '2:00 PM', event: 'Client Call - Acme Corp' },
  { time: '4:00 PM', event: 'Design Sprint Planning' },
]

export const CalendarContent = () => (
  <Box sx={{ p: 3 }}>
    {events.map((item, i) => (
      <Paper
        key={i}
        sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography variant='body2' fontWeight='medium'>
          {item.event}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {item.time}
        </Typography>
      </Paper>
    ))}
  </Box>
)
