"use client"
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import { supabase } from '@/app/lib/supabase'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!agreedToTerms) {
      setError('Vous devez accepter les conditions d\'utilisation')
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Fallback: manually create profile if trigger didn't work
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
              }
            ])
          
          if (profileError) {
            console.warn('Profile creation warning:', profileError)
            // Don't throw - let user continue even if profile insert fails
          }
        } catch (profileErr) {
          console.warn('Profile creation fallback error:', profileErr)
        }

        setSuccess(true)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAgreedToTerms(false)
        
        // Redirect to templates page after short delay
        setTimeout(() => {
          router.push('/templates')
        }, 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du compte')
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
                Create Account
              </h2>
              <p className="text-center text-xs sm:text-sm text-gray-600 mb-6">
                Join SparkResume and start building your CV
              </p>

              {/* Success Message */}
              {success && (
                <div className="alert alert-success mb-4">
                  <span>✓ Account created successfully! Redirecting...</span>
                </div>
              )}

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
                  disabled={isLoading}
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
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="btn btn-ghost btn-sm sm:btn-md"
                  >
                    {showPassword ? <EyeOff className="w-4" /> : <Eye className="w-4" />}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-xs">Minimum 6 characters</span>
                </label>
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm sm:text-base font-semibold">Confirm Password</span>
                </label>
                <div className="input-group input-group-sm sm:input-group-md">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="input input-bordered input-sm sm:input-md w-full text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="btn btn-ghost btn-sm sm:btn-md"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4" /> : <Eye className="w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="label cursor-pointer mt-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm sm:checkbox-md"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="label-text text-xs sm:text-sm ml-2">
                  I agree to the{' '}
                  <Link href="#" className="link link-primary">
                    Terms of Service
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary btn-sm sm:btn-md btn-block mt-6"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="divider my-4">OR</div>

              {/* Sign In Link */}
              <p className="text-center text-xs sm:text-sm">
                Already have an account?{' '}
                <Link href="/login" className="link link-primary font-semibold">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
            <p>🔒 Secure registration • Your data is encrypted</p>
          </div>
        </div>
      </div>
    </div>
  )
}
