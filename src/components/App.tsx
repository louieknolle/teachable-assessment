import { useState } from 'react'
import { useTeachableCourses } from '../services/teachableApi'
import Layout from './Layout'
import CourseSidebar from './CourseSidebar'
import CourseDetails from './CourseDetails'

function App() {
  const { courses, loading, error } = useTeachableCourses()
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)

  // Find the currently selected course
  const selectedCourse = selectedCourseId
    ? courses.find((course) => course.id === selectedCourseId)
    : null

  // Select the first course by default when courses are loaded
  if (!loading && courses.length > 0 && !selectedCourseId) {
    setSelectedCourseId(courses[0].id)
  }

  return (
    <Layout
      sidebar={
        <CourseSidebar
          courses={courses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
          loading={loading}
        />
      }
    >
      {error ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error Loading Courses
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      ) : loading && courses.length === 0 ? (
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-y-2 border-indigo-600"></div>
          <span className="ml-2">Loading courses...</span>
        </div>
      ) : (
        <CourseDetails course={selectedCourse ?? null} />
      )}
    </Layout>
  )
}

export default App
