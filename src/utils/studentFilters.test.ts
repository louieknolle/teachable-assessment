import { describe, it, expect } from 'vitest'
import { filterStudentsBySearch } from './studentFilters'

describe('studentFilters', () => {
  const testStudents = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      enrolledAt: '2023-01-01',
      percentComplete: 50
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      enrolledAt: '2023-02-15',
      percentComplete: 75
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@test.org',
      enrolledAt: '2023-03-10',
      percentComplete: 25
    }
  ]

  it('should return all students when search query is empty', () => {
    const result = filterStudentsBySearch(testStudents, '')
    expect(result).toHaveLength(3)
    expect(result).toEqual(testStudents)
  })

  it('should filter students by name', () => {
    const result = filterStudentsBySearch(testStudents, 'John')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('John Doe')
  })

  it('should filter students by email', () => {
    const result = filterStudentsBySearch(testStudents, 'test.org')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Robert Johnson')
  })

  it('should be case insensitive', () => {
    const result = filterStudentsBySearch(testStudents, 'JANE')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Jane Smith')
  })

  it('should return multiple matches', () => {
    const result = filterStudentsBySearch(testStudents, 'j')
    expect(result).toHaveLength(2) // John and Jane
  })

  it('should return empty array when no matches found', () => {
    const result = filterStudentsBySearch(testStudents, 'xyz')
    expect(result).toHaveLength(0)
  })
})
