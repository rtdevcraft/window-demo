import { WINDOW_CONFIGS } from './multi-window/config'

describe('Window Configs', () => {
  it('should have configuration for analytics', () => {
    expect(WINDOW_CONFIGS.analytics).toBeDefined()
    expect(WINDOW_CONFIGS.analytics.title).toBe('Analytics Dashboard')
  })
})
