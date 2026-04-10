"use client"
import { CheckCircle, Download, Zap, Lock } from 'lucide-react'
import Link from 'next/link'
import Header from './components/Header'

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">
                Free Professional CV Builder
              </p>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-black mb-6">
                Create a professional CV in minutes
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
                Your first CV is <strong>100% free forever</strong>. Unlimited downloads. No hidden fees. No watermarks. Yes, really 🚀
              </p>
              
              <div className="flex gap-4 mb-12">
                <Link 
                  href="/signup"
                  className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:opacity-90 transition text-lg"
                >
                  Get started for free ✨
                </Link>
              </div>

              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>2 free PDF downloads, then upgrade</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>32+ ATS-friendly templates</span>
                </div>
              </div>
            </div>

            {/* Right: Image Placeholder */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-gray-600 font-semibold">Professional CV Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BADGES */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Download className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-black">Free forever</h3>
                <p className="text-gray-600">First CV always free with unlimited downloads</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-black">Professional templates</h3>
                <p className="text-gray-600">32+ ATS-friendly designs you can customize</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-black flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg text-black">Privacy first</h3>
                <p className="text-gray-600">Your data is secure and never shared</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-center text-black mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Build your professional CV in 4 simple steps
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col gap-4">
              <div className="text-5xl font-black text-gray-200">01</div>
              <h3 className="text-2xl font-bold text-black">Choose a template</h3>
              <p className="text-gray-600 text-lg">
                Select from 32+ professionally designed CV templates, all optimized for ATS systems
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-4">
              <div className="text-5xl font-black text-gray-200">02</div>
              <h3 className="text-2xl font-bold text-black">Add your details</h3>
              <p className="text-gray-600 text-lg">
                Fill in your information easily. You can also import from an existing CV
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-4">
              <div className="text-5xl font-black text-gray-200">03</div>
              <h3 className="text-2xl font-bold text-black">Customize design</h3>
              <p className="text-gray-600 text-lg">
                Adjust colors, fonts, layout and styling until it looks exactly how you want
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-4">
              <div className="text-5xl font-black text-gray-200">04</div>
              <h3 className="text-2xl font-bold text-black">Download & apply</h3>
              <p className="text-gray-600 text-lg">
                Download as PDF and start applying for jobs. Update anytime, download unlimited times
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES GALLERY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-center text-black mb-4">
            Choose from 32+ templates
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Professional, ATS-friendly designs to match your style
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { id: 1, icon: '📄', name: 'Classic' },
              { id: 2, icon: '🎨', name: 'Modern' },
              { id: 3, icon: '💼', name: 'Executive' },
              { id: 4, icon: '🚀', name: 'Startup' },
              { id: 5, icon: '✨', name: 'Elegant' },
              { id: 6, icon: '🎯', name: 'Target' },
              { id: 7, icon: '🌟', name: 'Premium' },
              { id: 8, icon: '🔥', name: 'Creative' },
            ].map((template, i) => (
              <Link 
                key={template.id} 
                href="/templates"
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in fill-mode-forwards"
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationDuration: '0.6s'
                  }}
                >
                  <div className="aspect-[210/297] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center group-hover:from-blue-100 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-300">
                    <div className="text-6xl transform group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">
                      {template.icon}
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 animate-bounce">
            <Link href="/templates" className="inline-block text-black font-bold text-lg hover:underline hover:text-blue-600 transition-colors duration-200 transform hover:translate-x-2">
              View all templates →
            </Link>
          </div>
        </div>
      </section>

      {/* FREE PLAN FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-center text-black mb-4">
            What's included in the free plan
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Everything you need to create a professional CV, no catch
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "First CV free forever", desc: "Create and edit one CV for free indefinitely" },
              { title: "2 free downloads", desc: "Download your CV 2 times free, then upgrade for unlimited" },
              { title: "32+ templates", desc: "Access all professional ATS-friendly designs" },
              { title: "Full customization", desc: "Adjust colors, fonts, layout & all design elements" },
              { title: "No watermarks", desc: "Clean PDFs with your name only, no branding" },
              { title: "Privacy focused", desc: "Your data is secure and never sold or shared" },
            ].map((feature, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition">
                <h3 className="font-bold text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
            First CV always free. Upgrade only if you need multiple CVs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free */}
            <div className="border border-gray-600 rounded-2xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-5xl font-black mb-2">$0</div>
              <p className="text-gray-400 mb-8">Forever</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>1 CV</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>2 free downloads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>32+ templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Full customization</span>
                </li>
              </ul>
              <Link href="/signup" className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200">
                Get Started
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white text-black rounded-2xl p-12 text-center border-2 border-white">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-5xl font-black mb-2">$1/mo</div>
              <p className="text-gray-600 mb-8">or $10/year (save 17%)</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Unlimited CVs</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Unlimited downloads</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>32+ templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Full customization</span>
                </li>
              </ul>
              <Link href="/upgrade" className="w-full py-3 bg-black text-white font-bold rounded-lg hover:opacity-90">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black tracking-tight text-center text-black mb-16">
            Frequently asked questions
          </h2>

          <div className="space-y-6">
            {[
              { q: "Is SparkResume really free?", a: "Yes! Your first CV is free forever with unlimited downloads. You only pay if you want to create multiple CVs." },
              { q: "Are the CVs ATS-friendly?", a: "Yes! All our templates are optimized for Applicant Tracking Systems. Each CV exports as a clean, text-based PDF." },
              { q: "Can I import my existing CV?", a: "Yes! You can upload a PDF, DOCX, or image and we'll import your content into a professional layout." },
              { q: "How many downloads do I get for free?", a: "You get 2 free downloads per month. After that, you can upgrade to Premium for unlimited downloads." },
              { q: "Can I customize the templates?", a: "Absolutely! Change colors, fonts, layout, spacing - full customization is included in the free plan." },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="font-bold text-lg text-black mb-3">{item.q}</h3>
                <p className="text-gray-600 text-lg">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black tracking-tight mb-8">
            Ready to create your CV?
          </h2>
          <p className="text-2xl text-gray-400 mb-12">
            Start free. No credit card required.
          </p>
          <Link 
            href="/signup"
            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:opacity-90 transition text-lg inline-block"
          >
            Get started free ✨
          </Link>
        </div>
      </section>

      {/* SIMPLE FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-white mb-4">Product</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/upgrade" className="hover:text-white">Premium</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Company</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-sm text-center">
            <p>© 2026 SparkResume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
