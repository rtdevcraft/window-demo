import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MultiWindowPage from './page'

describe('MultiWindowPage Integration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should open and close a window', async () => {
    const user = userEvent.setup()
    render(<MultiWindowPage />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    const launcherCard = screen
      .getByText(/Analytics Dashboard/i)
      .closest('.MuiCard-root')
    await user.click(launcherCard!)

    const windowDialog = await screen.findByRole('dialog')
    expect(windowDialog).toBeInTheDocument()

    const closeButton = within(windowDialog).getByRole('button', {
      name: /Close/i,
    })
    await user.click(closeButton)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should drag a window to a new position', async () => {
    const user = userEvent.setup()
    render(<MultiWindowPage />)

    const launcherCard = screen
      .getByText(/Settings Panel/i)
      .closest('.MuiCard-root')
    await user.click(launcherCard!)

    const windowDialog = await screen.findByRole('dialog')
    const header = within(windowDialog).getByText(/Settings Panel/i)

    fireEvent.mouseDown(header, { clientX: 120, clientY: 120 })
    fireEvent.mouseMove(document, { clientX: 300, clientY: 250 })
    fireEvent.mouseUp(document)

    expect(windowDialog).toHaveStyle('left: 280px')
    expect(windowDialog).toHaveStyle('top: 230px')
  })

  it('should maximize and minimize the window', async () => {
    const user = userEvent.setup()
    render(<MultiWindowPage />)

    const launcherCard = screen
      .getByText(/Analytics Dashboard/i)
      .closest('.MuiCard-root')
    await user.click(launcherCard!)

    const windowDialog = await screen.findByRole('dialog')
    const maximizeButton = within(windowDialog).getByRole('button', {
      name: /Maximize/i,
    })
    await user.click(maximizeButton)

    const minimizeButton = await within(windowDialog).findByRole('button', {
      name: /Minimize/i,
    })
    expect(minimizeButton).toBeInTheDocument()

    await user.click(minimizeButton)
    expect(
      await within(windowDialog).findByRole('button', { name: /Maximize/i })
    ).toBeInTheDocument()
  })
})
