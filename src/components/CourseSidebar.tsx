import React from 'react'
import { CourseWithStudents } from '../services/teachableApi'

interface CourseSidebarProps {
  courses: CourseWithStudents[]
  selectedCourseId: number | null
  onSelectCourse: (courseId: number) => void
  loading: boolean
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  loading
}) => {
  if (loading) {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
          <span className="text-sm text-gray-500">Loading courses...</span>
        </div>
      </div>
    )
  }

  return (
    <nav className="mt-5 flex-1 px-2" aria-label="Courses">
      <div className="space-y-1">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className={`${
              selectedCourseId === course.id
                ? 'bg-indigo-100 text-indigo-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-left text-sm font-medium`}
          >
            <span className="truncate">{course.name}</span>
            <span className="ml-auto inline-block rounded-full bg-gray-100 py-0.5 px-2 text-xs">
              {course.students.length}
            </span>
          </button>
        ))}

        {courses.length === 0 && (
          <p className="px-2 py-1 text-sm text-gray-500">No courses found</p>
        )}
      </div>
    </nav>
  )
}

export default CourseSidebar
