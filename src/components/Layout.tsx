import React, { ReactNode, useState, useEffect } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

interface LayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
          <div className="absolute right-0 top-0 mr-4 pt-4">
            <button
              type="button"
              className="ml-1 flex size-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="size-6 text-black" aria-hidden="true" />
            </button>
          </div>

          <div className="flex shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">
              Course Dashboard
            </h1>
          </div>
          <div className="mt-5 h-0 flex-1 overflow-y-auto">{sidebar}</div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
              <div className="flex shrink-0 items-center px-4">
                <h1 className="text-lg font-bold text-gray-900">
                  Course Dashboard
                </h1>
              </div>
              <div className="mt-5 flex flex-1 flex-col">{sidebar}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex size-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>

          {/* Header in main content for mobile */}
          <h1 className="ml-2 text-xl font-bold text-gray-900 lg:hidden">
            Course Dashboard
          </h1>
        </div>

        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
