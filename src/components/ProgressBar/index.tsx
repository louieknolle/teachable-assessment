import React from 'react'
import { classNames } from '../../utils'

interface ProgressBarProps {
  value: number
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
  labelPosition?: 'left' | 'right'
}

const sizes = {
  small: 'h-1.5',
  medium: 'h-2.5',
  large: 'h-4'
}

const getProgressColorClass = (progress: number) => {
  if (progress >= 75) return 'bg-green-600'
  if (progress >= 25) return 'bg-yellow-500'
  return 'bg-red-500'
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'medium',
  showLabel = true,
  labelPosition = 'left'
}) => {
  return (
    <div className="flex items-center">
      {showLabel && labelPosition === 'left' && (
        <span className="mr-2 w-12 text-sm font-medium">{value}%</span>
      )}
      <div
        className={classNames(
          'flex-grow overflow-hidden rounded-full bg-gray-200',
          sizes[size]
        )}
      >
        <div
          className={classNames(
            'h-full transition-all duration-300',
            getProgressColorClass(value)
          )}
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      {showLabel && labelPosition === 'right' && (
        <span className="ml-2 text-sm font-medium">{value}%</span>
      )}
    </div>
  )
}

export default ProgressBar
