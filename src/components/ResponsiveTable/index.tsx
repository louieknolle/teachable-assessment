import React from 'react'
import { Column } from './types'

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => string | number
  emptyState?: React.ReactNode
}

function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  emptyState
}: ResponsiveTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <>
      {/* Regular table for medium screens and up */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 ${
                    column.className || ''
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={`${keyExtractor(item)}-${column.key}`}
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${
                      column.className || ''
                    }`}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="space-y-4 md:hidden">
        {data.map((item) => (
          <div
            key={keyExtractor(item)}
            className="rounded-lg bg-white p-4 shadow"
          >
            {columns.map((column) => (
              <div key={`${keyExtractor(item)}-${column.key}`} className="mb-3">
                <div className="text-xs font-medium text-gray-500">
                  {column.header}
                </div>
                <div>{column.render(item)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default ResponsiveTable
