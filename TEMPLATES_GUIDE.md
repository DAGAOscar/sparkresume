# SparkResume Template System

## Overview

The SparkResume application now includes a comprehensive **20-template system** that allows users to choose different CV formats based on their professional needs.

## Available Templates

### 1. Classic Professional
Traditional CV with clear sections and professional formatting

### 2. Modern Minimalist  
Clean and minimal design focusing on content

### 3. Executive Summary
Highlights achievements and leadership experience

### 4. Chronological Detailed
In-depth chronological presentation with detailed descriptions

### 5. Tech-Focused
Perfect for technology and IT professionals

### 6. Creative Designer
Artistic and creative presentation for designers and artists

### 7. Functional Resume
Skills-based layout emphasizing competencies over chronology

### 8. Corporate Professional
Formal corporate style for business professionals

### 9. Academic Scholar
Academic-focused CV for researchers and educators

### 10. Startup Entrepreneur
Dynamic format for startups and entrepreneurs

### 11. Healthcare Professional
Specialized for medical and healthcare professionals

### 12. Software Engineer
Technical resume for software development roles

### 13. Sales Professional
Results-driven format for sales and business development

### 14. Project Manager
Leadership-focused format for project management professionals

### 15. Marketing Manager
Dynamic layout for marketing and brand professionals

### 16. Creative & Portfolio
Portfolio-focused CV for creatives with project emphasis

### 17. Human Resources
Professional format for HR and people management roles

### 18. Legal Professional
Formal legal CV for lawyers and legal professionals

### 19. Educational Instructor
Academic-focused for teachers and educational professionals

### 20. Financial Analyst
Professional format for finance and accounting roles

## How to Use

### Desktop View
1. In the left sidebar, click on the **CV Template** dropdown selector
2. Browse through all 20 available templates and select your preferred one
3. On the right panel, choose between:
   - **Visual** mode: See the styled CV preview (can adjust zoom and theme)
   - **Text** mode: See the plain text template output
4. Click "Preview" to see the full CV in a modal with download options

### Mobile/Tablet View
1. Go to the **Template** tab (first tab)
2. Select your preferred template from the dropdown
3. View it in the preview modal with visual or text mode options

## Features

### Template Selector Component
- Dropdown with all 20 templates
- Shows template name and description
- Easy selection interface

### Text Template Preview
- Copy button: Copy the rendered CV text to clipboard
- Download button: Download as plain text (.txt) file
- Full formatting preserved in the text output

### Dual Preview Modes
- **Visual Mode**: Beautiful HTML rendering with Tailwind CSS and DaisyUI theming
- **Text Mode**: Plain text output suitable for ATS (Applicant Tracking Systems)

## Technical Implementation

### Files Added/Modified

#### New Files:
1. **`/app/utils/templates.ts`**
   - 20 template classes (TemplateV1-TemplateV20)
   - CVData interface for template data structure
   - CVTemplate abstract base class
   - CVTemplates manager class with static methods

2. **`/app/components/TemplateSelector.tsx`**
   - Dropdown component for template selection
   - Shows all available templates with descriptions

3. **`/app/components/TextTemplatePreview.tsx`**
   - Displays text-based template output
   - Copy to clipboard functionality
   - Download as text file feature

#### Modified Files:
1. **`/app/builder/page.tsx`**
   - Added templateId and useTextTemplate states
   - Integrated TemplateSelector component
   - Added TextTemplatePreview in modal and right panel
   - Toggle between visual and text preview modes
   - Updated mobile/tablet tabs to include template selection

## Data Flow

```
Builder Component (page.tsx)
    ↓
Template Data Conversion (getTemplateData())
    ↓
CVData Structure
    ↓
Template Selection (templateId)
    ↓
Either:
  - CVPreview Component (Visual) → HTML Rendering
  - TextTemplatePreview Component (Text) → Plain Text Output
```

## CVData Structure

```typescript
interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages?: Language[];
  certifications?: string[];
  projects?: Project[];
}
```

## Rendering Methods

Each template extends `CVTemplate` and implements:
- `getName()`: Returns template name
- `getDescription()`: Returns template description  
- `render(data: CVData)`: Returns formatted text string

## Default Template

The application defaults to **Template 1: Classic Professional** for all new CVs.

## Future Enhancements

- Add PDF export for text templates
- Create custom template builder
- Allow users to save template preferences
- Add more industry-specific templates
- Template categorization and filtering
- Template preview gallery on landing page

## Browser Compatibility

All templates work on:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices
- Tablets
- All screen sizes (responsive design)

## Export Options

### Visual Templates
- Export as PDF (with confetti celebration effect)
- Customizable DaisyUI themes (32 available)
- Zoom control for preview

### Text Templates
- Copy to clipboard
- Download as .txt file
- ATS-friendly formatting
- No styling/formatting characters

## Theme Support

The visual preview supports all 32 DaisyUI themes:
light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, **business** (default), acid, lemonade, night, coffee, winter, dim, nord, sunset

---

**Version**: 1.0  
**Last Updated**: April 2026
