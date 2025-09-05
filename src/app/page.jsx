export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            School
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
          <p className="text-indigo-200 text-lg">Manage your educational institutions</p>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-6">
          <a 
            href="/addSchool" 
            className="group block w-full p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Add School</h3>
                <p className="text-indigo-200 text-sm">Register a new educational institution</p>
              </div>
            </div>
          </a>

          <a 
            href="/showSchools" 
            className="group block w-full p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">View Schools</h3>
                <p className="text-indigo-200 text-sm">Browse and manage existing schools</p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-indigo-300 text-sm">Educational Management System</p>
        </div>
      </div>
    </div>
  );
}