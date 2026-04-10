import React from 'react'

interface SubscriptionConfirmProps {
  name: string
  plan: 'monthly' | 'yearly'
  price: number
  renewalDate: string
}

export const SubscriptionConfirmEmail: React.FC<SubscriptionConfirmProps> = ({
  name,
  plan,
  price,
  renewalDate
}) => {
  const planName = plan === 'monthly' ? 'Mensuellement' : 'Annuellement'
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#10b981', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: '0' }}>
          ✓ Bienvenue Premium !
        </h1>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p>Bonjour {name},</p>
        
        <p>Merci pour votre souscription à <strong>SparkResume Premium</strong> ! 🎉</p>
        
        <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '5px', margin: '20px 0', border: '2px solid #10b981' }}>
          <p style={{ margin: '0 0 10px 0' }}><strong>Détails de votre abonnement :</strong></p>
          <p style={{ margin: '5px 0' }}>Plan : <strong>{planName}</strong></p>
          <p style={{ margin: '5px 0' }}>Prix : <strong>${price.toFixed(2)} USD</strong></p>
          <p style={{ margin: '5px 0' }}>Renouvellement : <strong>{renewalDate}</strong></p>
        </div>

        <p><strong>Vos avantages Premium :</strong></p>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✓ Téléchargements illimités de CV</li>
          <li>✓ Tous les modèles premium</li>
          <li>✓ Thèmes avancés</li>
          <li>✓ Support prioritaire</li>
          <li>✓ Historique de téléchargements</li>
        </ul>

        <p style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href="https://sparkresume.work/templates" 
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 30px',
              textDecoration: 'none',
              borderRadius: '5px',
              display: 'inline-block',
              fontWeight: 'bold'
            }}
          >
            Retour aux templates
          </a>
        </p>

        <hr style={{ borderColor: '#e5e5e5', margin: '30px 0' }} />

        <p style={{ fontSize: '12px', color: '#666' }}>
          <strong>Gestion de votre abonnement :</strong><br />
          Vous pouvez gérer ou annuler votre abonnement à tout moment dans les 
          <a href="https://sparkresume.work/settings" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            paramètres de votre compte
          </a>.
        </p>

        <p style={{ fontSize: '12px', color: '#666' }}>
          Des questions ? Contactez notre équipe :<br />
          <a href="mailto:support@sparkresume.work" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            support@sparkresume.work
          </a>
        </p>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        <p>© 2026 SparkResume. Tous droits réservés.</p>
      </div>
    </div>
  )
}
