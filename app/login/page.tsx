"use client"
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import { supabase } from '@/app/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Redirect to templates page
        router.push('/templates')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4 sm:px-6 py-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body p-4 sm:p-6 md:p-8">
              <h2 className="card-title text-2xl sm:text-3xl font-bold justify-center mb-2">
                Welcome Back
              </h2>
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-6">
                Sign in to your SparkResume account
              </p>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered input-sm sm:input-md w-full text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base font-semibold">Password</span>
                </label>
                <div className="input-group input-group-sm sm:input-group-md">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input input-bordered input-sm sm:input-md w-full text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost btn-sm sm:btn-md"
                  >
                    {showPassword ? <EyeOff className="w-4" /> : <Eye className="w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center mt-4 flex-col sm:flex-row gap-2">
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm sm:checkbox-md" />
                  <span className="label-text text-xs sm:text-sm ml-2">Remember me</span>
                </label>
                <Link href="#" className="link link-primary text-xs sm:text-sm">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-sm sm:btn-md btn-block mt-6"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="divider my-4">OR</div>

              {/* Sign Up Link */}
              <p className="text-center text-xs sm:text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="link link-primary font-semibold">
                  Sign up now
                </Link>
              </p>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
            <p>🔒 Secure login • Your data is encrypted</p>
          </div>
        </div>
      </div>
    </div>
  )
}
