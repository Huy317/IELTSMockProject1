# IELTS Mock Project - React Components

This project has been converted from HTML templates to React components using Vite.

## Component Structure

### Layout Components
- **Layout.tsx** - Main layout wrapper that includes TopBar, Header, and Footer
- **TopBar.tsx** - Top navigation bar with contact info and language selector
- **Header.tsx** - Main navigation header with menu items
- **Footer.tsx** - Footer component with links and contact information

## Usage

### Basic Layout Usage
```tsx
import { Layout } from './components';

function MyPage() {
  return (
    <Layout title="My Page Title" description="Page description for SEO">
      <div className="container">
        <h1>Your page content here</h1>
      </div>
    </Layout>
  );
}
```

### Custom Page Example
```tsx
import React from 'react';
import { Layout } from '../components';

const AboutPage: React.FC = () => {
  return (
    <Layout 
      title="About Us - IELTS Mock Project"
      description="Learn more about our IELTS preparation platform"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>About Us</h1>
            <p>Your content here...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
```

## Assets

All assets (CSS, JS, images, etc.) are located in the `public/assets/` directory and are referenced with paths starting with `/assets/`.

### CSS Files
- Bootstrap CSS is loaded from `/assets/css/bootstrap.min.css`
- Custom styles are in `src/assets/css/custom.css`
- All icon fonts and plugins are in `/assets/plugins/`

### JavaScript Files
- Bootstrap JS and other scripts are loaded from `/assets/js/`
- Theme toggle functionality is included in the Layout component

## Features

- **Responsive Design** - Bootstrap-based responsive layout
- **Dark/Light Mode Toggle** - Theme switching functionality
- **SEO-Friendly** - Dynamic title and meta description support
- **Component-Based** - Modular React components for easy maintenance
- **TypeScript Support** - Full TypeScript integration

## Development

To run the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## Navigation

The header component includes navigation for:
- Home
- Courses (with dropdown)
- Dashboard (Instructor and Student dashboards)
- Pages (About Us, Contact, Authentication, FAQ)

All links are set up for React Router (you may need to install and configure React Router for client-side routing).

## Customization

You can customize the layout by:
1. Modifying the CSS in `src/assets/css/custom.css`
2. Updating component props in the Layout component
3. Adding new components to the `src/components/` directory
4. Creating new pages in the `src/pages/` directory
