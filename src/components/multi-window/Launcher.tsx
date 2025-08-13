import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
} from '@mui/material'
// The Grid import has been removed entirely
import { WINDOW_CONFIGS } from '@/lib/multi-window/config'
import { Action } from '@/lib/multi-window/types'

interface LauncherProps {
  dispatch: React.Dispatch<Action>
}

export const Launcher = ({ dispatch }: LauncherProps) => (
  // Use a Box with Flexbox for the container. The negative margin works with
  // the item's padding to create consistent spacing.
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      mx: -1.5,
    }}
  >
    {(Object.keys(WINDOW_CONFIGS) as Array<keyof typeof WINDOW_CONFIGS>).map(
      (type) => {
        const config = WINDOW_CONFIGS[type]
        return (
          // Each Box item defines its own responsive width.
          // p: 1.5 creates the gutter spacing.
          <Box
            key={type}
            sx={{
              width: { xs: '100%', sm: '50%', md: '33.3333%' },
              p: 1.5,
            }}
          >
            <Card
              onClick={() => dispatch({ type: 'OPEN', payload: { type } })}
              sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardContent
                sx={{
                  p: 4,
                  textAlign: 'center',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    mb: 3,
                    mx: 'auto',
                    background: config.gradient,
                  }}
                >
                  <config.icon size={32} color='white' />
                </Avatar>
                <Typography variant='h6' fontWeight='bold' mb={1}>
                  {config.title}
                </Typography>
                <Button
                  variant='contained'
                  sx={{ background: config.gradient, mt: 2 }}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          </Box>
        )
      }
    )}
  </Box>
)
