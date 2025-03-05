import React from 'react'
import { CourseWithStudents } from '../services/teachableApi'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

interface CourseSidebarProps {
  courses: CourseWithStudents[]
  selectedCourseId: number | null
  onSelectCourse: (id: number) => void
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
          <div className="size-4 animate-spin rounded-full border-y-2 border-indigo-600"></div>
          <span className="text-sm text-gray-500">Loading courses...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center border-b border-gray-200 pb-2">
          <AcademicCapIcon className="mr-2 size-5 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-900">My Courses</h2>
        </div>
      </div>

      <nav className="flex-1 px-2" aria-label="Courses">
        <div className="space-y-1" role="list">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`${
                selectedCourseId === course.id
                  ? 'bg-gray-100 font-medium text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } group flex w-full items-center rounded-md p-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              aria-current={selectedCourseId === course.id ? 'page' : undefined}
              role="listitem"
              tabIndex={0}
              title={course.name}
            >
              <div className="mr-3 flex size-8 shrink-0 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
                {course.name.charAt(0).toUpperCase()}
              </div>
              <span className="flex-1 truncate">{course.name}</span>
              <span className="ml-auto inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                {course.students.length}
              </span>
            </button>
          ))}

          {courses.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center">
              <AcademicCapIcon className="size-8 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">No courses found</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Course
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default CourseSidebar
