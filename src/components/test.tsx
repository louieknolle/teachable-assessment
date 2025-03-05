import { render, screen } from '@testing-library/react'
import App from './App'
import { vi } from 'vitest'

vi.mock('../services/teachableApi', () => ({
  useTeachableCourses: () => ({
    courses: [],
    loading: true,
    error: null
  })
}))

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    const dashboardHeadings = screen.getAllByText(/Course Dashboard/i)

    expect(dashboardHeadings.length).toBeGreaterThan(0)

    expect(screen.getAllByText(/Loading courses.../i).length).toBeGreaterThan(0)

    expect(container.firstChild).toBeInTheDocument()
  })
})
