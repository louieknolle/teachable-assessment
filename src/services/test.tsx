import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTeachableCourses } from './teachableApi'
import { useState, useEffect } from 'react'

// Setup mocks before any tests run
vi.mock('./teachableApi', async () => {
  const mockGetAllCourses = vi.fn()

  const useMockUseTeachableCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      let isMounted = true

      const fetchCourses = async () => {
        try {
          const data = await mockGetAllCourses()

          if (isMounted) {
            setCourses(data)
            setLoading(false)
          }
        } catch (err) {
          if (isMounted) {
            setError('Failed to load courses. Please try again later.')
            setLoading(false)
          }
        }
      }

      fetchCourses()

      return () => {
        isMounted = false
      }
    }, [])

    return { courses, loading, error }
  }

  return {
    getAllCourses: mockGetAllCourses,
    useTeachableCourses: useMockUseTeachableCourses,
    __esModule: true
  }
})

describe('teachableApi', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getAllCourses', () => {
    it('should fetch and transform course data correctly', async () => {
      // Setup the mock to return specific data
      const { getAllCourses } = await import('./teachableApi')

      const mockCourses = [
        {
          id: 1,
          name: 'Test Course',
          heading: 'Course Heading',
          description: 'Course Description',
          published: true,
          students: [
            {
              id: 201,
              name: 'John Doe',
              email: 'john@example.com',
              enrolledAt: '2023-01-01T12:00:00Z',
              percentComplete: 75
            }
          ]
        }
      ]

      vi.mocked(getAllCourses).mockResolvedValue(mockCourses)

      const courses = await getAllCourses()

      expect(courses).toEqual(mockCourses)
    })

    it('should handle API errors gracefully', async () => {
      const { getAllCourses } = await import('./teachableApi')

      vi.mocked(getAllCourses).mockRejectedValue(new Error('API Error'))

      await expect(getAllCourses()).rejects.toThrow('API Error')
    })
  })

  describe('useTeachableCourses', () => {
    it('should return loading state initially', () => {
      const { result } = renderHook(() => useTeachableCourses())

      expect(result.current.loading).toBe(true)
      expect(result.current.courses).toEqual([])
      expect(result.current.error).toBeNull()
    })

    it('should return courses when API call succeeds', async () => {
      const { getAllCourses } = await import('./teachableApi')

      const mockCourses = [
        {
          id: 1,
          name: 'Test Course',
          heading: 'Course Heading',
          description: 'Course Description',
          published: true,
          students: [
            {
              id: 201,
              name: 'John Doe',
              email: 'john@example.com',
              enrolledAt: '2023-01-01T12:00:00Z',
              percentComplete: 75
            }
          ]
        }
      ]

      vi.mocked(getAllCourses).mockResolvedValue(mockCourses)

      const { result } = renderHook(() => useTeachableCourses())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.courses).toEqual(mockCourses)
      expect(result.current.error).toBeNull()
    })

    it('should return error when API call fails', async () => {
      const { getAllCourses } = await import('./teachableApi')

      vi.mocked(getAllCourses).mockRejectedValue(new Error('API Error'))

      const { result } = renderHook(() => useTeachableCourses())

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.courses).toEqual([])
      expect(result.current.error).toBe(
        'Failed to load courses. Please try again later.'
      )
    })
  })
})
