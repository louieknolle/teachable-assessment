import { CourseWithStudents } from '../services/teachableApi'

type Student = CourseWithStudents['students'][0]

/**
 * Filter students by name or email that matches the search query
 */
export const filterStudentsBySearch = (
  students: Student[],
  searchQuery: string
): Student[] => {
  if (!searchQuery) return students

  const query = searchQuery.toLowerCase()
  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
  )
}
