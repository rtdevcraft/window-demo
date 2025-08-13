import { LucideIcon } from 'lucide-react'

export type Metric = {
  label: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
  color: 'success' | 'primary' | 'error'
  progress: number
}
