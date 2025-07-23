export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Project Details
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <p className="text-gray-600 mb-4">
            Project ID: <code className="bg-gray-100 px-2 py-1 rounded">{params.id}</code>
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Coming Soon:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Full project details and timeline</li>
              <li>• Weekly updates feed</li>
              <li>• Community comments and reactions</li>
              <li>• Builder profile integration</li>
              <li>• Follow and engagement features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}