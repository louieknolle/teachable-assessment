import React, { useState } from 'react'
import { CourseWithStudents } from '../../services/teachableApi'
import {
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ChartBarIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import ResponsiveTable from '../ResponsiveTable'
import StatsCard from '../StatsCard'
import { getStudentColumns } from '../ResponsiveTable/studentColumns'
import { Student } from '../ResponsiveTable/types'
import { filterStudentsBySearch } from '../../utils/studentFilters'

interface CourseDetailsProps {
  course: CourseWithStudents | null
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const [searchQuery, setSearchQuery] = useState('')

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AcademicCapIcon className="size-16 text-gray-300" />
        <p className="mt-4 text-gray-500">Select a course to view details</p>
      </div>
    )
  }

  const studentCount = course.students.length
  const avgProgress = studentCount
    ? Math.round(
        course.students.reduce(
          (sum, student) => sum + student.percentComplete,
          0
        ) / studentCount
      )
    : 0

  const completedCount = course.students.filter(
    (student) => student.percentComplete === 100
  ).length

  const filteredStudents = filterStudentsBySearch(course.students, searchQuery)

  const studentColumns = getStudentColumns()

  return (
    <div>
      <div className="mb-5 border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
        {course.heading && (
          <p className="mt-1 text-gray-500">{course.heading}</p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatsCard
          icon={<UserGroupIcon className="size-5" />}
          title="Total Students"
          value={studentCount}
        />

        <StatsCard
          icon={<ChartBarIcon className="size-5" />}
          title="Average Progress"
          value={avgProgress}
          valueUnit="%"
        />

        <StatsCard
          icon={<CheckCircleIcon className="size-5" />}
          title="Completed Students"
          value={completedCount}
        />
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Enrolled Students
          </h3>
          <div className="relative flex max-w-xs items-center">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 p-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="size-5 text-gray-400" />
            </div>
          </div>
        </div>

        <ResponsiveTable
          data={filteredStudents as Student[]}
          keyExtractor={(student) => student.id}
          columns={studentColumns}
          emptyState={
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <UserGroupIcon className="size-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchQuery ? 'No matching students' : 'No students'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery
                  ? `No students found matching "${searchQuery}"`
                  : 'No students enrolled in this course yet.'}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  className="mt-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              )}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CourseDetails
