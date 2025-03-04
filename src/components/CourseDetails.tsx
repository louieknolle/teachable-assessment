import React from 'react'
import { CourseWithStudents } from '../services/teachableApi'

interface CourseDetailsProps {
  course: CourseWithStudents | null
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  if (!course) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">Select a course to view details</p>
      </div>
    )
  }

  // Calculate course statistics
  const studentCount = course.students.length
  const avgProgress = studentCount
    ? Math.round(
        course.students.reduce(
          (sum, student) => sum + student.percentComplete,
          0
        ) / studentCount
      )
    : 0

  return (
    <div>
      <div className="mb-5 border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
        {course.heading && (
          <p className="mt-1 text-gray-500">{course.heading}</p>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Students
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {studentCount}
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Progress
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {avgProgress}%
          </dd>
        </div>

        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Completed Students
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {
              course.students.filter(
                (student) => student.percentComplete === 100
              ).length
            }
          </dd>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
          Enrolled Students
        </h3>
        {course.students.length === 0 ? (
          <p className="text-gray-500">No students enrolled in this course.</p>
        ) : (
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Enrolled On
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {course.students.map((student) => (
                  <tr key={student.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {student.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(student.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-2 w-16 text-right">
                          {student.percentComplete}%
                        </span>
                        <div className="relative h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="absolute h-full bg-indigo-600"
                            style={{ width: `${student.percentComplete}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseDetails
