import React from 'react'
import { Column, Student } from './types'
import Avatar from '../Avatar'
import ProgressBar from '../ProgressBar'

export const getStudentColumns = (): Column<Student>[] => [
  {
    key: 'name',
    header: 'Name',
    className: 'py-3.5 pl-4 pr-3 sm:pl-6',
    render: (student) => (
      <div className="flex items-center">
        <div className="size-10 shrink-0">
          <Avatar
            size="small"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              student.name
            )}&background=random`}
            alt={student.name}
          />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{student.name}</div>
          <div className="text-gray-500">
            {student.percentComplete === 100 ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Completed
              </span>
            ) : student.percentComplete > 0 ? (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                In Progress
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                Not Started
              </span>
            )}
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'email',
    header: 'Email',
    render: (student) => student.email
  },
  {
    key: 'enrolledOn',
    header: 'Enrolled On',
    render: (student) =>
      new Date(student.enrolledAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
  },
  {
    key: 'progress',
    header: 'Progress',
    render: (student) => (
      <div className="flex items-center">
        <span className="mr-2 w-10 text-xs font-medium">
          {student.percentComplete}%
        </span>
        <ProgressBar
          value={student.percentComplete}
          size="small"
          showLabel={false}
        />
      </div>
    )
  }
]
