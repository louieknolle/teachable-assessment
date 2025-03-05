import { render, screen, fireEvent } from '@testing-library/react'
import CourseSidebar from '../CourseSidebar'

const mockCourses = [
  {
    id: 1,
    name: 'React Fundamentals',
    heading: 'Learn React',
    description: 'A course about React',
    published: true,
    students: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        enrolledAt: '2023-01-01',
        percentComplete: 50
      }
    ]
  },
  {
    id: 2,
    name: 'Advanced JavaScript',
    heading: 'Master JS',
    description: 'Advanced topics in JS',
    published: false,
    students: []
  }
]

describe('<CourseSidebar />', () => {
  const mockSelectCourse = vi.fn()
  const mockCloseMobileMenu = vi.fn()

  it('should render published and unpublished courses correctly', () => {
    render(
      <CourseSidebar
        courses={mockCourses}
        selectedCourseId={null}
        onSelectCourse={mockSelectCourse}
        loading={false}
        closeMobileMenu={mockCloseMobileMenu}
      />
    )

    expect(screen.getByText('Published Courses')).toBeInTheDocument()
    expect(screen.getByText('Unpublished Courses')).toBeInTheDocument()

    expect(screen.getByText('React Fundamentals')).toBeInTheDocument()
    expect(screen.getByText('Advanced JavaScript')).toBeInTheDocument()
  })

  it('should call onSelectCourse and closeMobileMenu when course is clicked', () => {
    render(
      <CourseSidebar
        courses={mockCourses}
        selectedCourseId={null}
        onSelectCourse={mockSelectCourse}
        loading={false}
        closeMobileMenu={mockCloseMobileMenu}
      />
    )

    fireEvent.click(screen.getByText('React Fundamentals'))

    expect(mockSelectCourse).toHaveBeenCalledWith(1)
    expect(mockCloseMobileMenu).toHaveBeenCalled()
  })

  it('should show loading state correctly', () => {
    render(
      <CourseSidebar
        courses={[]}
        selectedCourseId={null}
        onSelectCourse={mockSelectCourse}
        loading={true}
      />
    )

    expect(screen.getByText('Loading courses...')).toBeInTheDocument()
  })
})
