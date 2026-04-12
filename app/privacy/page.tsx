'use client'

import Header from '@/app/components/Header'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
          <h1 className="text-5xl font-black text-base-content mb-2">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-base-content/70 mb-8">Last updated: April 2026</p>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-base-content space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
              <p className="text-lg leading-relaxed">
                SparkResume (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the sparkresume.work website (the &quot;Service&quot;). 
                This page informs you of our policies regarding the collection, use, and disclosure of personal data 
                when you use our Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">2. Information Collection and Use</h2>
              <p className="text-lg leading-relaxed mb-4">We collect several different types of information:</p>
              
              <h3 className="text-xl font-semibold mb-3">Personal Data:</h3>
              <ul className="space-y-2 text-lg ml-4">
                <li className="flex gap-3">
                  <span>•</span>
                  <span><strong>Email Address:</strong> Used for authentication, notifications, and account management</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span><strong>CV Information:</strong> Content you add to your CV (name, experience, education, skills, etc.)</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span><strong>Account Preferences:</strong> Theme choices, template selections, and customization settings</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Usage Data:</h3>
              <ul className="space-y-2 text-lg ml-4">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Pages visited, time spent, and features used</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Browser type, IP address (anonymized), and device information</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">3. Use of Data</h2>
              <p className="text-lg leading-relaxed mb-4">SparkResume uses the collected data for various purposes:</p>
              <ul className="space-y-2 text-lg ml-4">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To provide and maintain our Service</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To notify you about changes to our Service</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To allow you to participate in interactive features of our Service</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To provide customer support and respond to your requests</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To monitor the usage of our Service for improvement purposes</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>To process payments and send billing communications</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Data Security</h2>
              <p className="text-lg leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet 
                or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect 
                your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">5. Third-Party Services</h2>
              <p className="text-lg leading-relaxed mb-4">We use the following third-party services:</p>
              <ul className="space-y-3 text-lg ml-4">
                <li>
                  <strong>Supabase:</strong> For authentication and data storage. Their privacy policy applies: https://supabase.com/privacy
                </li>
                <li>
                  <strong>Stripe:</strong> For payment processing. Their privacy policy applies: https://stripe.com/privacy
                </li>
                <li>
                  <strong>Resend:</strong> For email communications. Their privacy policy applies: https://resend.com/privacy
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-lg leading-relaxed">
                We retain your personal data only for as long as necessary to provide our services and fulfill the purposes 
                outlined in this privacy policy. You can request deletion of your account and data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">7. Your Privacy Rights</h2>
              <p className="text-lg leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 text-lg ml-4">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Access your personal data</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Correct inaccurate data</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-lg leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">9. Contact Us</h2>
              <p className="text-lg leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-base-200 rounded-lg">
                <p className="text-lg">
                  Email: <a href="mailto:support@sparkresume.work" className="text-primary hover:underline">support@sparkresume.work</a>
                </p>
                <p className="text-lg">
                  Website: <a href="https://sparkresume.work" className="text-primary hover:underline">https://sparkresume.work</a>
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-12 border-t border-base-300">
            <p className="text-base-content/70">
              Questions? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
