import React from 'react'

interface DownloadConfirmProps {
  name: string
  downloadCount: number
  remainingDownloads: number
  maxFreeDownloads: number
}

export const DownloadConfirmEmail: React.FC<DownloadConfirmProps> = ({
  name,
  remainingDownloads,
  maxFreeDownloads
}) => {
  const isNearLimit = remainingDownloads <= 0
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#3b82f6', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: '0' }}>
          ✓ CV Téléchargé avec succès
        </h1>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <p>Bonjour {name},</p>
        
        <p>Votre CV a été téléchargé avec succès ! 🎉</p>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
          <p style={{ margin: '0' }}><strong>Votre quota :</strong></p>
          <p style={{ margin: '10px 0 0 0' }}>
            {maxFreeDownloads - remainingDownloads} / {maxFreeDownloads} téléchargements utilisés
          </p>
          {isNearLimit && (
            <p style={{ margin: '10px 0 0 0', color: '#dc2626', fontWeight: 'bold' }}>
              ⚠️ Vous avez atteint votre limite de téléchargements gratuits !
            </p>
          )}
        </div>

        {isNearLimit && (
          <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '5px', margin: '20px 0', border: '2px solid #f59e0b' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
              💡 Passez à Premium pour des téléchargements illimités !
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
              Obtenez un accès complet à tous les modèles premium et des téléchargements illimités.
            </p>
          </div>
        )}

        <p style={{ textAlign: 'center', margin: '30px 0' }}>
          {isNearLimit ? (
            <a 
              href="https://sparkresume.work/upgrade" 
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '5px',
                display: 'inline-block',
                fontWeight: 'bold'
              }}
            >
              Passer à Premium
            </a>
          ) : (
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
          )}
        </p>

        <hr style={{ borderColor: '#e5e5e5', margin: '30px 0' }} />

        <p style={{ fontSize: '12px', color: '#666' }}>
          Des questions ? Contactez-nous :<br />
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
