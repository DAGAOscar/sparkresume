'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/hooks/useAuth'
import { upgradeToPremium } from '@/app/lib/subscriptionService'
import Header from '@/app/components/Header'
import { Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UpgradePage() {
  const { isLoggedIn, loading, user } = useAuth()
  const router = useRouter()
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [upgradeMessage, setUpgradeMessage] = useState('')

  const features = [
    'Unlimited PDF downloads',
    'All CV templates',
    'Advanced themes',
    'Priority support',
    'Download history tracking',
    'Subscription management'
  ]

  const handleUpgrade = async (period: 'monthly' | 'yearly') => {
    if (!user?.id) return

    setIsUpgrading(true)
    setUpgradeMessage('')

    try {
      // Calculate expiration date based on period
      const expiresIn = period === 'monthly' ? 30 : 365
      
      // Update user subscription in database
      await upgradeToPremium(user.id, expiresIn)
      
      setUpgradeMessage(`✓ Upgrade successful! Premium activated for ${period === 'monthly' ? '30 days' : '1 year'}.`)
      
      // Redirect to builder after 2 seconds
      setTimeout(() => {
        router.push('/builder')
      }, 2000)
    } catch (error) {
      console.error('Error upgrading subscription:', error)
      setUpgradeMessage('Failed to upgrade subscription. Please try again.')
    } finally {
      setIsUpgrading(false)
    }
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
    )
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center max-w-md">
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder à cette page.
            </p>
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <Link 
              href="/builder" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
            >
              <ArrowLeft className="w-4" />
              Retour au builder
            </Link>
            <h1 className="text-4xl font-bold mb-4">
              Passez à <span className="text-primary">Premium</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Téléchargez autant de CV que vous le souhaitez et déverrouillez toutes les fonctionnalités premium
            </p>
          </div>

          {/* Billing Period Selector */}
          <div className="flex justify-center mb-12">
            <div className="join border-2 border-gray-200">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`join-item btn ${
                  billingPeriod === 'monthly'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`join-item btn ${
                  billingPeriod === 'yearly'
                    ? 'btn-primary'
                    : 'btn-ghost'
                }`}
              >
                Annuel
                {billingPeriod === 'yearly' && (
                  <span className="badge badge-success gap-2">
                    Économisez 33%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="card bg-base-100 border-2 border-gray-200">
              <div className="card-body">
                <h2 className="card-title text-2xl">Gratuit</h2>
                <p className="text-gray-600 mb-4">Commencez maintenant</p>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-600">/mois</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">2 téléchargements PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Templates de base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Support communautaire</span>
                  </li>
                </ul>
                <button className="btn btn-ghost w-full" disabled>
                  Plan actuel
                </button>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="card bg-primary text-primary-content border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 badge badge-success gap-2 m-4">
                Populaire
              </div>
              <div className="card-body">
                <h2 className="card-title text-2xl">Premium</h2>
                <p className="opacity-90 mb-4">Accès complet</p>
                <div className="text-4xl font-bold mb-6">
                  ${billingPeriod === 'monthly' ? '1.00' : '10.00'}
                  <span className="text-lg opacity-90">/{billingPeriod === 'monthly' ? 'mois' : 'an'}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(billingPeriod)}
                  disabled={isUpgrading}
                  className="btn bg-white text-primary hover:bg-gray-100 w-full"
                >
                  {isUpgrading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Upgrade en cours...
                    </>
                  ) : (
                    'Passer à Premium'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {upgradeMessage && (
            <div className={`alert mb-6 max-w-md mx-auto ${
              upgradeMessage.includes('✓') ? 'alert-success' : 'alert-error'
            }`}>
              <p>{upgradeMessage}</p>
            </div>
          )}

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto bg-base-100 rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6">Questions fréquentes</h3>
            
            <div className="space-y-4">
              <div className="collapse collapse-arrow border border-gray-200">
                <input type="radio" name="faq" defaultChecked />
                <div className="collapse-title font-semibold">
                  Puis-je annuler mon abonnement à tout moment ?
                </div>
                <div className="collapse-content text-gray-600">
                  <p>Oui, vous pouvez annuler votre abonnement à tout moment. Pas de frais d&apos;annulation.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow border border-gray-200">
                <input type="radio" name="faq" />
                <div className="collapse-title font-semibold">
                  Quel est le différence entre les forfaits mensuels et annuels ?
                </div>
                <div className="collapse-content text-gray-600">
                  <p>Les deux forfaits offrent les mêmes fonctionnalités. Le forfait annuel vous permet d&apos;économiser 33% par rapport au forfait mensuel.</p>
                </div>
              </div>

              <div className="collapse collapse-arrow border border-gray-200">
                <input type="radio" name="faq" />
                <div className="collapse-title font-semibold">
                  Que se passe-t-il après la période d&apos;essai gratuite ?
                </div>
                <div className="collapse-content text-gray-600">
                  <p>Après 2 téléchargements gratuits, vous serez invité à passer à Premium pour continuer à télécharger des CV.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
