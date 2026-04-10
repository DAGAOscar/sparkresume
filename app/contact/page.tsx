'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Header from '@/app/components/Header'
import { siteConfig } from '@/app/config/site'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // For now, just log the submission
      // Later you can integrate with an email service like Sendgrid or Resend
      console.log('Contact form submitted:', formData)
      
      setSubmitMessage('✓ Merci pour votre message ! Nous vous répondrons bientôt.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Erreur lors de l\'envoi du message. Essayez de nous contacter directement à support@sparkresume.work')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 text-lg">
              Des questions ? Nous sommes ici pour vous aider !
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
              
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href={`mailto:${siteConfig.email.support}`}
                    className="text-primary hover:underline"
                  >
                    {siteConfig.email.support}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Réponse dans les 24 heures</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Chat en direct</h3>
                  <p className="text-gray-600">Disponible du lundi au vendredi</p>
                  <p className="text-sm text-gray-600">9h00 - 18h00 CET</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Localisation</h3>
                  <p className="text-gray-600">France</p>
                </div>
              </div>

              {/* FAQ Links */}
              <div className="mt-8 p-4 bg-base-100 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Questions fréquentes</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/upgrade" className="text-primary hover:underline">
                      Comment passer à Premium ?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Comment télécharger mon CV ?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Limites d&apos;utilisation
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Nom</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Sujet</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ex: Question sur ma subscription"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre question ou problème..."
                    rows={5}
                    className="textarea textarea-bordered w-full"
                    required
                  />
                </div>

                {submitMessage && (
                  <div className={`alert ${submitMessage.includes('✓') ? 'alert-success' : 'alert-error'}`}>
                    <p>{submitMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Response Time Info */}
          <div className="bg-base-100 border border-gray-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">Nous répondons rapidement</h3>
            <p className="text-gray-600">
              La plupart des demandes reçoivent une réponse dans les 24 heures. Pour les urgences, écrivez directement à <strong>{siteConfig.email.support}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
