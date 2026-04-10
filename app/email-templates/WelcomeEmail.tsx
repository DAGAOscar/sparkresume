import React from 'react'

interface WelcomeEmailProps {
  name: string
  email: string
  confirmUrl?: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  name,
  confirmUrl
}) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#3b82f6', margin: '0' }}>
          ✨ Bienvenue à SparkResume !
        </h1>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p>Bonjour {name},</p>
        
        <p>Merci de vous être inscrit à <strong>SparkResume</strong> ! 🎉</p>
        
        <p>Vous pouvez maintenant :</p>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✓ Créer des CV professionnels avec nos modèles</li>
          <li>✓ Télécharger 2 CV gratuitement par mois</li>
          <li>✓ Passer à Premium pour des téléchargements illimités</li>
        </ul>

        <p style={{ textAlign: 'center', margin: '30px 0' }}>
          <a 
            href={confirmUrl || 'https://sparkresume.work/templates'} 
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
            Commencer à créer
          </a>
        </p>

        <hr style={{ borderColor: '#e5e5e5', margin: '30px 0' }} />

        <p style={{ fontSize: '12px', color: '#666' }}>
          Si vous avez des questions, contactez-nous :</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          <a href="mailto:support@sparkresume.work" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            support@sparkresume.work
          </a>
        </p>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        <p>© 2026 SparkResume. Tous droits réservés.</p>
        <p>
          <a href="https://sparkresume.work" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            sparkresume.work
          </a>
        </p>
      </div>
    </div>
  )
}
