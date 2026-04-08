"use client"
import { Sparkles, Download, Palette, Zap, Shield, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'

export default function Home() {
  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-primary/20 to-secondary/20 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="hero-content text-center w-full max-w-2xl mx-auto">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Create Your Professional CV
              <br />
              <span className="text-primary">In Minutes</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
              SparkResume makes it easy to build a stunning, ATS-friendly CV with beautiful templates and instant PDF export.
            </p>
            <div className="flex gap-2 sm:gap-4 justify-center flex-wrap">
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md md:btn-lg">
                Get Started Free
              </Link>
              <Link href="/templates" className="btn btn-outline btn-sm sm:btn-md md:btn-lg">
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">Why Choose SparkResume?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">Beautiful Templates</h3>
                </div>
                <p className="text-sm sm:text-base">Choose from 32+ professionally designed themes to make your CV stand out.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <Zap className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">Easy to Use</h3>
                </div>
                <p className="text-sm sm:text-base">Intuitive interface makes building your CV quick and effortless. No design skills needed.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <Download className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">Instant Export</h3>
                </div>
                <p className="text-sm sm:text-base">Download your CV as PDF instantly. Share with recruiters in seconds.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <Palette className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">Full Customization</h3>
                </div>
                <p className="text-sm sm:text-base">Customize colors, fonts, and layouts to match your personal brand perfectly.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">Secure & Private</h3>
                </div>
                <p className="text-sm sm:text-base">Your data is encrypted and never shared. Your privacy is our priority.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card bg-base-200 shadow-lg h-full">
              <div className="card-body">
                <div className="flex items-start gap-3 mb-4">
                  <BarChart3 className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary flex-shrink-0 mt-1" />
                  <h3 className="card-title text-base sm:text-lg md:text-xl">ATS Optimized</h3>
                </div>
                <p className="text-sm sm:text-base">CVs designed to pass Applicant Tracking Systems and impress hiring managers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="hero-content text-center w-full">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Build Your Dream CV?</h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90">
              Join thousands of job seekers who've landed their dream jobs with SparkResume.
            </p>
            <Link href="/signup" className="btn btn-secondary btn-sm sm:btn-md md:btn-lg">
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center bg-base-200 text-base-content p-6 sm:p-8 md:p-10 gap-4">
        <aside>
          <p className="text-base sm:text-lg font-bold">✨ <span className="text-primary">SparkResume</span></p>
          <p className="text-sm sm:text-base">© 2026 SparkResume. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  )
}
