import React from 'react'

export interface Column<T> {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  className?: string
}

export interface Student {
  id: number | string
  name: string
  email: string
  enrolledAt: string | Date
  percentComplete: number
}
