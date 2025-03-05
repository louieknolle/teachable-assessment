import React, { ReactNode } from 'react'

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string | number
  valueUnit?: string
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  valueUnit = ''
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow transition hover:shadow-md sm:p-6">
      <dt className="flex items-center space-x-2 text-sm font-medium text-gray-500">
        <div className="text-gray-400">{icon}</div>
        <span>{title}</span>
      </dt>
      <dd className="mt-2 text-3xl font-semibold text-gray-900">
        {value}
        {valueUnit}
      </dd>
    </div>
  )
}

export default StatsCard
