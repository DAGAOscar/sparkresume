import React from 'react';
import { Link } from '@/app/utils/templates';

interface ContactLinksProps {
  links?: Link[];
  className?: string;
  inline?: boolean;
}

export const ContactLinks: React.FC<ContactLinksProps> = ({ links = [], className = '', inline = false }) => {
  if (!links || links.length === 0) return null;

  if (inline) {
    // Affiche les liens sur une même ligne avec • séparateur
    return (
      <span className={className}>
        {links.map((link, idx) => (
          <span key={idx}>
            {idx > 0 && <span className="mx-1">•</span>}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {link.icon && <span className="mr-1">{link.icon}</span>}
              {link.label}
            </a>
          </span>
        ))}
      </span>
    );
  }

  // Affiche les liens sous forme de bloc
  return (
    <div className={className}>
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline block"
        >
          {link.icon && <span className="mr-1">{link.icon}</span>}
          {link.label}
        </a>
      ))}
    </div>
  );
};
