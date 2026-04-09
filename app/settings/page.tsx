"use client"
import { Save, Bell, Lock, Eye, Palette, LogIn } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import { useAuth } from '@/app/hooks/useAuth'

export default function Settings() {
  const { isLoggedIn, loading } = useAuth()

  const [settings, setSettings] = useState({
    email: 'user@example.com',
    fullName: 'John Doe',
    language: 'en',
    theme: 'light',
    emailNotifications: true,
    twoFactorAuth: false,
    profilePrivacy: 'public'
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1500)
  }

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
              Vous devez être connecté pour accéder aux paramètres.
            </p>
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-base-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Settings</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Account Settings */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-2xl mb-4 sm:mb-6 flex items-center gap-2">
                  <Lock className="w-5 sm:w-6" />
                  Account Settings
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base font-semibold">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm sm:input-md w-full text-sm"
                      value={settings.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base font-semibold">Email Address</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered input-sm sm:input-md w-full text-sm"
                      value={settings.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>

                  {/* Language */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base font-semibold">Language</span>
                    </label>
                    <select
                      className="select select-bordered select-sm sm:select-md w-full text-sm"
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  {/* Two Factor Auth */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-sm sm:text-base font-semibold">Two-Factor Authentication</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-2xl mb-4 sm:mb-6 flex items-center gap-2">
                  <Palette className="w-5 sm:w-6" />
                  Display Settings
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Theme */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base font-semibold">Theme</span>
                    </label>
                    <select
                      className="select select-bordered select-sm sm:select-md w-full text-sm"
                      value={settings.theme}
                      onChange={(e) => handleChange('theme', e.target.value)}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-2xl mb-4 sm:mb-6 flex items-center gap-2">
                  <Bell className="w-5 sm:w-6" />
                  Notifications
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Email Notifications */}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-sm sm:text-base font-semibold">Email Notifications</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                      />
                    </label>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">Receive updates about your account and new features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-2xl mb-4 sm:mb-6 flex items-center gap-2">
                  <Eye className="w-5 sm:w-6" />
                  Privacy Settings
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {/* Profile Privacy */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm sm:text-base font-semibold">Profile Visibility</span>
                    </label>
                    <select
                      className="select select-bordered select-sm sm:select-md w-full text-sm"
                      value={settings.profilePrivacy}
                      onChange={(e) => handleChange('profilePrivacy', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="unlisted">Unlisted</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card bg-error/10 shadow-lg border-2 border-error">
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-2xl mb-4 text-error">Danger Zone</h2>

                <div className="space-y-2 sm:space-y-3">
                  <button className="btn btn-outline btn-error btn-block btn-sm sm:btn-md justify-start text-xs sm:text-sm">
                    Change Password
                  </button>
                  <button className="btn btn-outline btn-error btn-block btn-sm sm:btn-md justify-start text-xs sm:text-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-2 sm:gap-4">
              <button className="btn btn-ghost btn-sm sm:btn-md">Cancel</button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary btn-sm sm:btn-md gap-1 sm:gap-2"
              >
                {isSaving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 sm:w-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
