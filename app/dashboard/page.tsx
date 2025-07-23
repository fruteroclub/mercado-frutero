export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome to your Builder Dashboard! 🚀
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Your journey has started!
          </h2>
          <p className="text-gray-600 mb-4">
            Congratulations on creating your project profile. This is where you'll manage your weekly updates, track progress, and engage with your community.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Set up your database connection (DATABASE_URL in .env)</li>
              <li>• Run database migrations: <code className="bg-blue-100 px-1 rounded">bun run db:push</code></li>
              <li>• Seed with sample data: <code className="bg-blue-100 px-1 rounded">bun run db:seed</code></li>
              <li>• Start building your weekly update system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}