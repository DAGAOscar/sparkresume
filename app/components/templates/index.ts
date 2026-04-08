'use client';

import { CVData } from '@/app/utils/templates';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { TwoColumnTemplate } from './TwoColumnTemplate';
import { MinimalistTemplate } from './MinimalistTemplate';
import { FunctionalTemplate } from './FunctionalTemplate';
import { CreativeDesignerTemplate } from './CreativeDesignerTemplate';
import { ExecutiveSummaryTemplate } from './ExecutiveSummaryTemplate';
import { TechFocusedTemplate } from './TechFocusedTemplate';
import { SoftwareEngineerTemplate } from './SoftwareEngineerTemplate';
import { HealthcareTemplate } from './HealthcareTemplate';
import { CreativePortfolioTemplate } from './CreativePortfolioTemplate';
import { FinanceCorporateTemplate } from './FinanceCorporateTemplate';

export interface ReactTemplate {
  id: number;
  name: string;
  description: string;
  component: React.FC<{ data: CVData }>;
}

export const REACT_TEMPLATES: ReactTemplate[] = [
  {
    id: 1,
    name: 'Classic Professional',
    description: 'Traditional serif design with elegant formatting',
    component: ClassicTemplate,
  },
  {
    id: 2,
    name: 'Modern Blue',
    description: 'Contemporary design with blue accents and clean typography',
    component: ModernTemplate,
  },
  {
    id: 3,
    name: 'Corporate',
    description: 'Professional dark header with bold sections',
    component: CorporateTemplate,
  },
  {
    id: 4,
    name: 'Two Column',
    description: 'Sidebar layout with blue accent and right-aligned content',
    component: TwoColumnTemplate,
  },
  {
    id: 5,
    name: 'Minimalist',
    description: 'Clean and simple design with light typography',
    component: MinimalistTemplate,
  },
  {
    id: 6,
    name: 'Functional',
    description: 'Skills-based layout emphasizing competencies over chronology',
    component: FunctionalTemplate,
  },
  {
    id: 7,
    name: 'Creative Designer',
    description: 'Artistic and creative presentation for designers and artists',
    component: CreativeDesignerTemplate,
  },
  {
    id: 8,
    name: 'Executive Summary',
    description: 'Highlights achievements and leadership experience',
    component: ExecutiveSummaryTemplate,
  },
  {
    id: 9,
    name: 'Tech-Focused',
    description: 'Perfect for technology and IT professionals',
    component: TechFocusedTemplate,
  },
  {
    id: 10,
    name: 'Software Engineer',
    description: 'Technical resume for software development roles',
    component: SoftwareEngineerTemplate,
  },
  {
    id: 11,
    name: 'Healthcare Professional',
    description: 'Specialized for medical and healthcare professionals',
    component: HealthcareTemplate,
  },
  {
    id: 12,
    name: 'Creative Portfolio',
    description: 'Portfolio-focused CV for creatives with project emphasis',
    component: CreativePortfolioTemplate,
  },
  {
    id: 13,
    name: 'Finance & Corporate',
    description: 'Professional format for finance and accounting roles',
    component: FinanceCorporateTemplate,
  },
];

export function getTemplateById(id: number): React.FC<{ data: CVData }> | null {
  const template = REACT_TEMPLATES.find(t => t.id === id);
  return template ? template.component : null;
}

export function getTemplateInfo(id: number): ReactTemplate | null {
  return REACT_TEMPLATES.find(t => t.id === id) || null;
}
