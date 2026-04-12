'use client'

import Header from '@/app/components/Header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
          >
            <ArrowLeft className="w-4" />
            Back to home
          </Link>

          {/* Title */}
          <h1 className="text-5xl font-black text-base-content mb-6">
            About <span className="text-primary">SparkResume</span>
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-base-content">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-4">
                At SparkResume, we believe that everyone deserves a professional CV that can compete in today&apos;s job market. 
                Our mission is to make CV creation simple, accessible, and powerful for everyone.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-lg leading-relaxed mb-4">
                SparkResume is a modern CV builder designed by developers, for professionals. We understand the challenges 
                of creating a great CV and the importance of making a strong first impression with recruiters.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>32+ Professional Templates</strong> - Carefully designed by design experts, optimized for ATS (Applicant Tracking Systems)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Full Customization</strong> - Change colors, fonts, layout, and all design elements to match your style</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Free Forever Option</strong> - Create your first CV completely free with 2 PDF downloads included</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Privacy First</strong> - Your data is yours. We never sell or share your information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>No Watermarks</strong> - Clean PDFs with your name only, no branding from us</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose SparkResume?</h2>
              <p className="text-lg leading-relaxed mb-4">
                Unlike other CV builders, SparkResume combines simplicity with power. We focus on what matters:
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Clean, modern interface that&apos;s easy to use</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Templates optimized for recruiters and ATS systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Affordable pricing - just $1/month for unlimited features</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Fast, reliable, and always available</span>
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
              <p className="text-lg leading-relaxed mb-6">
                Join thousands of professionals who have already created their perfect CV with SparkResume. 
                Your first CV is completely free - no credit card required.
              </p>
              <Link 
                href="/signup" 
                className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition"
              >
                Create Your Free CV
              </Link>
            </section>
          </div>

          {/* Support */}
          <div className="mt-16 pt-12 border-t border-base-300">
            <p className="text-base-content/70">
              Have questions? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> or email {' '}
              <a href="mailto:support@sparkresume.work" className="text-primary hover:underline">support@sparkresume.work</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
