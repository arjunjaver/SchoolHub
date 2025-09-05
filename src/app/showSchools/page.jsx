"use client";
import { useState, useEffect } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Delete confirmation modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Success/Error popup states
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [resultType, setResultType] = useState(""); // "success" or "error"

  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/schools");
      const data = await res.json();
      if (data.success) setSchools(data.schools);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!schoolToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/schools?id=${schoolToDelete.id}`, { 
        method: "DELETE" 
      });
      const data = await res.json();

      if (data.success) {
        setResultMessage(`"${schoolToDelete.name}" has been deleted successfully!`);
        setResultType("success");
        fetchSchools(); // Refresh the list
      } else {
        setResultMessage(data.error || "Failed to delete school. Please try again.");
        setResultType("error");
      }
    } catch (error) {
      setResultMessage("Network error occurred. Please check your connection.");
      setResultType("error");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setSchoolToDelete(null);
      setShowResultModal(true);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSchoolToDelete(null);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setTimeout(() => {
      setResultMessage("");
      setResultType("");
    }, 300);
  };

  // Auto-close result modal after 3 seconds
  useEffect(() => {
    if (showResultModal) {
      const timer = setTimeout(() => {
        closeResultModal();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showResultModal]);

  const filteredSchools = schools.filter((school) => {
    const query = search.toLowerCase();
    return (
      school.name.toLowerCase().includes(query) ||
      school.address.toLowerCase().includes(query) ||
      school.city.toLowerCase().includes(query) ||
      school.state.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Schools Directory</h1>
          <p className="text-slate-300 text-lg">Discover and manage educational institutions</p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, address, city, or state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-white mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-white text-lg">Loading schools...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Schools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Image */}
                  {school.image && (
                    <div className="relative h-56 overflow-hidden bg-slate-800/50">
                      <img
                        src={school.image}
                        alt={school.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {school.name}
                    </h2>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-start space-x-2">
                        <svg className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {school.address}, {school.city}, {school.state}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-slate-300 text-sm">{school.contact}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-slate-300 text-sm">{school.email_id}</p>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(school)}
                      className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-400/20 focus:outline-none transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete School</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredSchools.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <div className="mb-6">
                  <svg className="w-20 h-20 text-slate-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No Schools Found</h3>
                <p className="text-slate-400 mb-6">
                  {search ? "Try adjusting your search terms" : "No schools have been added yet"}
                </p>
                <a 
                  href="/addSchool" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add First School</span>
                </a>
              </div>
            )}

            {/* Stats */}
            {filteredSchools.length > 0 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-white font-medium">
                    Showing {filteredSchools.length} of {schools.length} schools
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className={`relative max-w-md w-full transform transition-all duration-300 ease-out ${
              showDeleteModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Modal Content */}
            <div className="relative bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-500/30">
              
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-red-500/30 animate-pulse">
                  <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Delete School?</h3>
                <p className="text-red-100 mb-2">
                  Are you sure you want to delete
                </p>
                <p className="text-white font-semibold text-lg mb-6 bg-red-500/20 rounded-lg py-2 px-4">
                  "{schoolToDelete?.name}"
                </p>
                <p className="text-red-200 text-sm mb-8">
                  This action cannot be undone. All data associated with this school will be permanently removed.
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={cancelDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3 px-6 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isDeleting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 rounded-3xl blur-xl bg-red-400/20"></div>
          </div>
        </div>
      )}

      {/* Result Modal (Success/Error) */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className={`relative max-w-md w-full transform transition-all duration-500 ease-out ${
              showResultModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {/* Modal Content */}
            <div className={`relative bg-gradient-to-br ${
              resultType === "success" 
                ? "from-emerald-500/90 to-green-600/90" 
                : "from-red-500/90 to-red-600/90"
            } backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20`}>
              
              {/* Close Button */}
              <button
                onClick={closeResultModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${
                  resultType === "success" ? "bg-emerald-400/30" : "bg-red-400/30"
                }`}>
                  {resultType === "success" ? (
                    <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {resultType === "success" ? "Deleted Successfully!" : "Delete Failed!"}
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  {resultMessage}
                </p>

                {/* Action Button */}
                <button
                  onClick={closeResultModal}
                  className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl border border-white/30 transition-all duration-200 transform hover:scale-105"
                >
                  {resultType === "success" ? "Continue" : "Try Again"}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-3xl overflow-hidden">
                <div 
                  className="h-full bg-white/40 transition-all duration-3000 ease-linear"
                  style={{
                    width: showResultModal ? '0%' : '100%',
                    animation: showResultModal ? 'progressBar 3s linear forwards' : 'none'
                  }}
                ></div>
              </div>
            </div>

            {/* Background Glow */}
            <div className={`absolute inset-0 -z-10 rounded-3xl blur-xl ${
              resultType === "success" 
                ? "bg-emerald-400/20" 
                : "bg-red-400/20"
            }`}></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}