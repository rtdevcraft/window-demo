import { Box, Paper, Typography } from '@mui/material'

const settingsItems = [
  'Notifications',
  'Privacy',
  'Display',
  'Account',
  'Integrations',
]

export const SettingsContent = () => (
  <Box sx={{ p: 3 }}>
    {settingsItems.map((item, i) => (
      <Paper
        key={i}
        sx={{
          p: 2,
          mb: 1,
          cursor: 'pointer',
          bgcolor: 'rgba(255,255,255,0.7)',
        }}
      >
        <Typography variant='body2'>{item}</Typography>
      </Paper>
    ))}
  </Box>
)
