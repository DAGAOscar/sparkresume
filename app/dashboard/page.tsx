"use client"
import { Plus, Download, Share2, Trash2, Eye, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import Header from '@/app/components/Header'
import { useAuth } from '@/app/hooks/useAuth'
import { useCVs } from '@/app/hooks/useCVs'

export default function Dashboard() {
  const { isLoggedIn, loading } = useAuth()
  const { cvs, loading: cvLoading, addCV, removeCVItem } = useCVs()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Check authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l&apos;authentification...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center max-w-md">
            <LogIn size={48} className="mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Connexion requise</h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder au tableau de bord.
            </p>
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle create new CV
  const handleCreateCV = async () => {
    const name = prompt('Enter CV name:', 'My CV');
    if (name) {
      const newCV = await addCV(name);
      if (newCV) {
        // Redirect to builder with the new CV ID
        window.location.href = `/builder?id=${newCV.id}`;
      }
    }
  }

  // Handle delete CV
  const handleDeleteCV = async (cvId: string) => {
    if (confirm('Are you sure you want to delete this CV?')) {
      setDeletingId(cvId);
      await removeCVItem(cvId);
      setDeletingId(null);
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-base-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">My CVs</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage and organize your CVs in one place</p>
          </div>

          {/* Create New CV Button */}
          <div className="mb-6 sm:mb-8">
            <button 
              onClick={handleCreateCV}
              disabled={cvLoading}
              className="btn btn-primary btn-sm sm:btn-md md:btn-lg gap-2"
            >
              {cvLoading ? <span className="loading loading-spinner loading-sm"></span> : <Plus className="w-4" />}
              Create New CV
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="card bg-base-100 shadow">
              <div className="card-body p-4 sm:p-6">
                <h3 className="card-title text-sm sm:text-base">Total CVs</h3>
                <p className="text-3xl sm:text-4xl font-bold text-primary">{cvs.length}</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body p-4 sm:p-6">
                <h3 className="card-title text-sm sm:text-base">Downloads</h3>
                <p className="text-3xl sm:text-4xl font-bold text-secondary">0</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body p-4 sm:p-6">
                <h3 className="card-title text-sm sm:text-base">Last Updated</h3>
                <p className="text-lg sm:text-xl font-semibold">
                  {cvs.length > 0 && cvs[0].updated_at 
                    ? new Date(cvs[0].updated_at).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* CVs List */}
          <div className="grid gap-4 sm:gap-6">
            <h2 className="text-xl sm:text-2xl font-bold">Your CVs</h2>
            {cvs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {cvs.map((cv) => (
                  <div key={cv.id} className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4 sm:p-6">
                      <div className="flex items-start justify-between gap-2 flex-col sm:flex-row">
                        <div className="flex-1">
                          <h3 className="card-title text-base sm:text-lg">{cv.name}</h3>
                          <div className="mt-2 space-y-1 text-xs sm:text-sm text-gray-600">
                            <p>Created: {new Date(cv.created_at).toLocaleDateString()}</p>
                            <p>Modified: {new Date(cv.updated_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="badge badge-primary text-xs sm:text-sm">
                          {cv.is_active ? 'Active' : 'Draft'}
                        </div>
                      </div>

                      {/* CV Actions */}
                      <div className="card-actions justify-end mt-4 gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                        <Link 
                          href={`/builder?id=${cv.id}`}
                          className="btn btn-xs sm:btn-sm btn-ghost gap-1 sm:gap-2"
                        >
                          <Eye className="w-3 sm:w-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <a href="#" className="btn btn-xs sm:btn-sm btn-ghost gap-1 sm:gap-2">
                          <Download className="w-3 sm:w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                        <a href="#" className="btn btn-xs sm:btn-sm btn-ghost gap-1 sm:gap-2">
                          <Share2 className="w-3 sm:w-4" />
                          <span className="hidden sm:inline">Share</span>
                        </a>
                        <button 
                          onClick={() => handleDeleteCV(cv.id)}
                          disabled={deletingId === cv.id}
                          className="btn btn-xs sm:btn-sm btn-ghost text-error gap-1 sm:gap-2"
                        >
                          {deletingId === cv.id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <Trash2 className="w-3 sm:w-4" />
                          )}
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card bg-base-100 shadow text-center py-8 sm:py-12">
                <p className="text-gray-600 mb-4 text-sm sm:text-base">You haven&apos;t created any CVs yet</p>
                <button 
                  onClick={handleCreateCV}
                  className="btn btn-primary btn-sm sm:btn-md"
                >
                  Create Your First CV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
