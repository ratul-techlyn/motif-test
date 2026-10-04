# SEO & Accessibility Implementation Guidelines

## Overview

This document provides comprehensive guidelines for implementing SEO and accessibility improvements in the MOTIF® Next.js application. All components and patterns are designed to be modular, reusable, and audit-friendly.

## 🔧 Architecture

### SEO Components Location
```
src/
├── components/
│   └── seo/
│       ├── CanonicalTag.tsx     # Modular canonical URL injection
│       ├── RelatedPages.tsx     # Internal linking component
│       └── index.ts             # Component exports
├── app/
│   └── datas/
│       ├── seo/
│       │   ├── SEO_MAP.ts       # Centralized SEO metadata
│       │   └── pages/           # Page-specific SEO data
│       └── internal-links.ts    # Internal linking configuration
└── lib/
    └── seo-utils.ts            # SEO utility functions
```

## 📋 Implementation Checklist

### For Every New Page:

- [ ] Create SEO metadata file in `src/app/datas/seo/pages/[page-name].seo.ts`
- [ ] Add page path to `SEO_MAP.ts`
- [ ] Configure internal links in `internal-links.ts`
- [ ] Add `RelatedPages` component with `visuallyHidden={true}`
- [ ] Test canonical URL is correctly set
- [ ] Verify internal links improve link density

### For Navigation Components:

- [ ] Add proper ARIA roles (`role="navigation"`, `role="button"`)
- [ ] Include keyboard navigation support (`onKeyDown` handlers)
- [ ] Add focus management for screen readers
- [ ] Use semantic HTML elements (`<nav>`, `<button>` vs `<div>`)
- [ ] Include proper `aria-label` and `aria-expanded` attributes

## 🎯 SEO Best Practices

### 1. Canonical URLs

**Use the CanonicalTag component:**
```tsx
import { CanonicalTag } from "@/components/seo";

// In page head or layout
<CanonicalTag url="https://wemotif.com/your-page" />
```

**Or use metadata approach:**
```tsx
export const pageSEO: Metadata = {
  alternates: { 
    canonical: "https://wemotif.com/your-page" 
  },
  // ... other metadata
};
```

### 2. Internal Linking

**Add to every page for improved link density:**
```tsx
import { RelatedPages } from "@/components/seo";
import { getRelatedPages } from "@/app/datas/internal-links";

const YourPage = () => {
  const relatedPages = getRelatedPages("/your-page");
  
  return (
    <div>
      {/* SEO Internal Links - Hidden from users, visible to search engines */}
      <RelatedPages 
        pages={relatedPages}
        heading="Related Information"
        visuallyHidden={true}
        ariaLabel="Related page navigation"
      />
      {/* Your page content */}
    </div>
  );
};
```

**Configure internal links:**
```tsx
// In src/app/datas/internal-links.ts
export const INTERNAL_LINKS_MAP = {
  "/your-page": [
    {
      title: "Related Page",
      href: "/related-page",
      description: "Description for accessibility"
    }
  ]
};
```

### 3. SEO Metadata

**Create structured SEO data:**
```tsx
// src/app/datas/seo/pages/your-page.seo.ts
import type { Metadata } from "next";

export const yourPageSEO: Metadata = {
  title: "Page Title — MOTIF®",
  description: "Compelling meta description under 160 characters",
  openGraph: {
    type: "website",
    url: "https://wemotif.com/your-page",
    siteName: "MOTIF®",
    title: "Page Title — MOTIF®",
    description: "Description for social sharing",
    images: [
      { 
        url: "https://wemotif.com/your-image.jpg", 
        width: 1200, 
        height: 630,
        alt: "Descriptive alt text"
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title — MOTIF®",
    description: "Twitter-specific description",
    images: ["https://wemotif.com/your-image.jpg"],
  },
  alternates: { 
    canonical: "https://wemotif.com/your-page" 
  },
  other: { 
    "pinterest-rich-pin": "true",
    "robots": "index, follow",
    "revisit-after": "7 days"
  },
};
```

## ♿ Accessibility Best Practices

### 1. Keyboard Navigation

**Always support keyboard interaction:**
```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  aria-label="Descriptive button label"
>
  Button Text
</button>
```

### 2. ARIA Attributes

**Essential ARIA patterns:**
```tsx
// Navigation
<nav role="navigation" aria-label="Main navigation">
  
// Menu button
<button 
  aria-expanded={isOpen}
  aria-controls="menu-id"
  aria-label="Toggle navigation menu"
>

// Hidden content for screen readers
<span className="sr-only">Screen reader only text</span>

// Lists
<ul role="list">
  <li role="listitem">Item</li>
</ul>
```

### 3. Focus Management

**Guide focus for screen readers:**
```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
const firstItemRef = useRef<HTMLAnchorElement>(null);

// Return focus when closing menu
const closeMenu = () => {
  setIsOpen(false);
  buttonRef.current?.focus();
};

// Focus first item when opening menu
useEffect(() => {
  if (isOpen) {
    firstItemRef.current?.focus();
  }
}, [isOpen]);
```

## 🔧 TypeScript Best Practices

### 1. Strict Typing

**Replace `any` types with proper interfaces:**
```tsx
// ❌ Avoid
const data: any = {};

// ✅ Better
interface PageData {
  title: string;
  description: string;
  url?: string;
}
const data: PageData = {};
```

### 2. Component Props

**Always type component props:**
```tsx
interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, description, onAction }) => {
  // Component logic
};
```

## 🚀 Performance Considerations

### 1. Hidden SEO Content

**Use `visuallyHidden={true}` for SEO-only content:**
```tsx
// This content is hidden visually but accessible to:
// - Search engine crawlers
// - Screen readers (when focused)
// - SEO audit tools
<RelatedPages 
  pages={relatedPages}
  visuallyHidden={true}
  ariaLabel="SEO internal links"
/>
```

### 2. Dynamic Imports for SEO Components

**Use dynamic imports when appropriate:**
```tsx
const SEOHead = dynamic(() => import("@/components/SEOHead"), { ssr: true });
```

## 🧪 Testing Guidelines

### 1. SEO Testing

- [ ] Verify canonical URLs in page source
- [ ] Check internal links are crawlable
- [ ] Validate metadata in browser dev tools
- [ ] Test with SEO audit tools (Lighthouse, SEMrush)

### 2. Accessibility Testing

- [ ] Test keyboard-only navigation
- [ ] Verify screen reader compatibility
- [ ] Check color contrast ratios
- [ ] Validate with accessibility auditing tools

### 3. Browser Testing

- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Verify mobile responsiveness
- [ ] Check performance impact

## 📊 Monitoring & Maintenance

### 1. Regular Audits

- **Monthly**: Run Lighthouse audits on all pages
- **Quarterly**: Review internal linking strategy
- **Bi-annually**: Update SEO metadata based on performance

### 2. Performance Monitoring

- Track page load times with new SEO components
- Monitor search engine indexing status
- Analyze internal link click-through rates

## 🔗 Related Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 🚨 Important Notes

1. **No Visual Changes**: All SEO improvements are designed to be invisible to users while maximizing search engine and accessibility benefits.

2. **Animation Compatibility**: Components are designed to not interfere with existing GSAP animations and page transitions.

3. **Modular Architecture**: All components can be imported and used independently across the application.

4. **Audit Ready**: All implementations follow SEO audit best practices and can be easily validated by automated tools.

5. **Future Extensibility**: The architecture supports easy addition of new pages and SEO features without breaking existing functionality.

---

*This document should be updated as new SEO and accessibility patterns are implemented.*