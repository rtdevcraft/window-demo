import { BarChart3, Settings, Calendar } from 'lucide-react'
import { WindowConfig, WindowType } from './types'

export const WINDOW_CONFIGS: Record<WindowType, WindowConfig> = {
  analytics: {
    title: 'Analytics Dashboard',
    subtitle: 'Real-time insights',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #3B82F6, #6366F1)',
    defaultSize: { width: 500, height: 400 },
  },
  settings: {
    title: 'Settings Panel',
    subtitle: 'Configuration',
    icon: Settings,
    gradient: 'linear-gradient(135deg, #1D4ED8, #4F46E5)',
    defaultSize: { width: 450, height: 380 },
  },
  calendar: {
    title: 'Calendar View',
    subtitle: 'Schedule & events',
    icon: Calendar,
    gradient: 'linear-gradient(135deg, #60A5FA, #818CF8)',
    defaultSize: { width: 480, height: 420 },
  },
} as const
