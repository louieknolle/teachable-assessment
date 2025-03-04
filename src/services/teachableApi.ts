import { useState, useEffect } from 'react'
import axios from 'axios'

// Instead of the direct API URL, use the proxy to avoid CORS issues for local development
const API_BASE_URL = '/api'
const API_KEY = '7JbSA3ep6XOMV3t8t7QXuXq9HS79Dwnr'

export interface Enrollment {
  user_id: number
  enrolled_at: string
  expires_at: string | null
  completed_at: string | null
  percent_complete: number
}

export interface Course {
  id: number
  name: string
  heading: string | null
  description: string | null
  is_published: boolean
  image_url: string | null
}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
}

export interface CourseWithStudents {
  id: number
  name: string
  heading: string | null
  students: {
    id: number
    name: string
    email: string
    enrolledAt: string
    percentComplete: number
  }[]
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Apikey: API_KEY
  }
})

export const getAllCourses = async (): Promise<CourseWithStudents[]> => {
  try {
    const response = await apiClient.get('/v1/courses')

    if (!response.data.courses || !Array.isArray(response.data.courses)) {
      throw new Error('Invalid API response structure')
    }

    const courses = response.data.courses

    const coursesWithStudents = await Promise.all(
      courses.map(async (course: Course) => {
        try {
          const enrollmentsResponse = await apiClient.get(
            `/v1/courses/${course.id}/enrollments`
          )

          if (
            !enrollmentsResponse.data.enrollments ||
            !Array.isArray(enrollmentsResponse.data.enrollments)
          ) {
            return {
              id: course.id,
              name: course.name,
              heading: course.heading,
              description: course.description,
              students: []
            }
          }

          const enrollments = enrollmentsResponse.data.enrollments

          const studentDetails = await Promise.all(
            enrollments.map(async (enrollment: Enrollment) => {
              try {
                const userResponse = await apiClient.get(
                  `/v1/users/${enrollment.user_id}`
                )

                const user = userResponse.data

                return {
                  id: enrollment.user_id,
                  name: user.name,
                  email: user.email,
                  enrolledAt: enrollment.enrolled_at,
                  percentComplete: enrollment.percent_complete
                }
              } catch (error) {
                console.error(
                  `Error fetching user ${enrollment.user_id} details:`,
                  error
                )
                return {
                  id: enrollment.user_id,
                  name: 'Unknown User',
                  email: 'unknown@example.com',
                  enrolledAt: enrollment.enrolled_at,
                  percentComplete: enrollment.percent_complete
                }
              }
            })
          )

          return {
            id: course.id,
            name: course.name,
            heading: course.heading,
            students: studentDetails
          }
        } catch (error) {
          console.error(`Error processing course ${course.id}:`, error)
          return {
            id: course.id,
            name: course.name,
            heading: course.heading,
            students: []
          }
        }
      })
    )

    return coursesWithStudents
  } catch (error) {
    console.error('Error fetching courses:', error)
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          params: error.config?.params
        }
      })
    }
    throw error
  }
}

export const useTeachableCourses = () => {
  const [courses, setCourses] = useState<CourseWithStudents[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await getAllCourses()
        setCourses(data)
        setError(null)
      } catch (err) {
        console.error('Error in useTeachableCourses:', err)
        setError('Failed to load courses. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const refreshCourses = async () => {
    try {
      setLoading(true)
      const data = await getAllCourses()
      setCourses(data)
      setError(null)
    } catch (err) {
      console.error('Error refreshing courses:', err)
      setError('Failed to refresh courses. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return { courses, loading, error, refreshCourses }
}
