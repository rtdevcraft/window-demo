import { DollarSign, Users, Target } from 'lucide-react'
import { Metric } from './types'

export const METRICS_DATA: Metric[] = [
  {
    label: 'Revenue',
    value: '$847K',
    change: '+12%',
    positive: true,
    icon: DollarSign,
    color: 'success',
    progress: 75,
  },
  {
    label: 'Users',
    value: '23,451',
    change: '+8%',
    positive: true,
    icon: Users,
    color: 'primary',
    progress: 82,
  },
  {
    label: 'Conversion',
    value: '3.2%',
    change: '-2%',
    positive: false,
    icon: Target,
    color: 'error',
    progress: 65,
  },
]
