/**
 * Internal Links Configuration
 * 
 * Defines related pages for internal linking to improve link density
 * and help with orphaned canonical URLs. Organized by page context.
 */

interface RelatedPage {
  title: string;
  href: string;
  description: string;
}

interface RelatedPagesConfig {
  [pagePath: string]: RelatedPage[];
}

export const INTERNAL_LINKS_MAP: RelatedPagesConfig = {
  "/culture": [
    {
      title: "About MOTIF",
      href: "/about",
      description: "Learn about our team and mission"
    },
    {
      title: "Why Choose MOTIF",
      href: "/why-motif", 
      description: "Discover what makes us different"
    },
    {
      title: "Our Process",
      href: "/the-motif-process",
      description: "How we approach brand building"
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "Get in touch with our team"
    }
  ],
  "/about": [
    {
      title: "Our Culture",
      href: "/culture",
      description: "Experience our collaborative environment"
    },
    {
      title: "What We Do",
      href: "/what-we-do",
      description: "Explore our services and expertise"
    },
    {
      title: "Luxury Lifestyle Agency",
      href: "/luxury-lifestyle-advertising-branding-agency-nyc-la-sf",
      description: "Specialized luxury brand services"
    }
  ],
  "/what-we-do": [
    {
      title: "Fashion Agency Services",
      href: "/fashion-agency",
      description: "Dedicated fashion brand expertise" 
    },
    {
      title: "Beauty Brand Marketing",
      href: "/beauty-brand-marketing-advertising-agency",
      description: "Specialized beauty brand marketing"
    },
    {
      title: "Shopify Partnership",
      href: "/better-than-shopify-platinum-partner",
      description: "Our Shopify platform expertise"
    }
  ],
  "/the-motif-process": [
    {
      title: "Why MOTIF",
      href: "/why-motif",
      description: "Understanding our unique approach"
    },
    {
      title: "B2B Ecommerce Solutions",
      href: "/pulse-b2b-ecommerce-agency",
      description: "Enterprise ecommerce capabilities"
    },
    {
      title: "Our Culture",
      href: "/culture", 
      description: "How our culture drives results"
    }
  ],
  "/contact": [
    {
      title: "Our Process",
      href: "/the-motif-process",
      description: "Learn how we'll work together"
    },
    {
      title: "About Our Team",
      href: "/about",
      description: "Meet the people behind MOTIF"
    },
    {
      title: "Why Choose Us",
      href: "/why-motif",
      description: "What sets us apart"
    }
  ],
  "/fashion-agency": [
    {
      title: "Luxury Lifestyle Services", 
      href: "/luxury-lifestyle-advertising-branding-agency-nyc-la-sf",
      description: "Comprehensive luxury brand services"
    },
    {
      title: "Beauty Brand Marketing",
      href: "/beauty-brand-marketing-advertising-agency", 
      description: "Cross-industry expertise"
    },
    {
      title: "Our Process",
      href: "/the-motif-process",
      description: "How we approach fashion brands"
    }
  ],
  "/beauty-brand-marketing-advertising-agency": [
    {
      title: "Fashion Agency Expertise",
      href: "/fashion-agency",
      description: "Related lifestyle industry services"
    },
    {
      title: "Luxury Brand Services",
      href: "/luxury-lifestyle-advertising-branding-agency-nyc-la-sf",
      description: "Premium brand positioning"
    },
    {
      title: "Shopify Solutions",
      href: "/pulse-b2b-shopify-b2b-agency",
      description: "Ecommerce platform expertise"
    }
  ],
  "/faqs": [
    {
      title: "About MOTIF",
      href: "/about",
      description: "Learn more about our team and approach"
    },
    {
      title: "Our Process",
      href: "/the-motif-process",
      description: "Understand how we work with clients"
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "Get in touch for specific questions"
    },
    {
      title: "Why Choose MOTIF",
      href: "/why-motif",
      description: "Discover our unique value proposition"
    }
  ],
  "/why-motif": [
    {
      title: "Our Process",
      href: "/the-motif-process",
      description: "See how we deliver results"
    },
    {
      title: "About Our Team",
      href: "/about",
      description: "Meet the people behind our success"
    },
    {
      title: "Our Culture",
      href: "/culture",
      description: "Experience our collaborative environment"
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "Start your journey with us"
    }
  ]
};

/**
 * Get related pages for a given path
 * @param currentPath - The current page path
 * @returns Array of related pages or empty array if none found
 */
export const getRelatedPages = (currentPath: string): RelatedPage[] => {
  return INTERNAL_LINKS_MAP[currentPath] || [];
};

/**
 * Get all orphaned pages that need internal links
 * @returns Array of page paths that need better internal linking
 */
export const getOrphanedPages = (): string[] => {
  return Object.keys(INTERNAL_LINKS_MAP);
};