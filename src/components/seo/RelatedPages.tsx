/**
 * RelatedPages Component
 * 
 * A modular, accessible component for displaying internal links to improve
 * link density and help with orphaned canonical URLs.
 * Designed with semantic HTML and ARIA compliance.
 * 
 * @example
 * ```tsx
 * <RelatedPages 
 *   pages={[
 *     { title: "About MOTIF", href: "/about", description: "Learn about our team" },
 *     { title: "Our Process", href: "/the-motif-process", description: "How we work" }
 *   ]}
 *   heading="Related Pages"
 *   className="hidden" // Hide visually but keep for SEO/bots
 * />
 * ```
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

interface RelatedPage {
  /** The page title */
  title: string;
  /** The page URL/href */
  href: string;
  /** Optional description for accessibility */
  description?: string;
  /** Optional: Mark as external link */
  external?: boolean;
}

interface RelatedPagesProps {
  /** Array of related pages to link to */
  pages: RelatedPage[];
  /** Heading text for the section */
  heading?: string;
  /** Additional CSS classes */
  className?: string;
  /** Hide visually but keep for SEO/accessibility */
  visuallyHidden?: boolean;
  /** Custom aria-label for the navigation */
  ariaLabel?: string;
}

const RelatedPages: React.FC<RelatedPagesProps> = ({
  pages,
  heading = "Related Pages",
  className,
  visuallyHidden = false,
  ariaLabel = "Related pages navigation"
}) => {
  const baseStyles = visuallyHidden 
    ? "sr-only" // Screen reader only class for accessibility
    : "space-y-2";

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(baseStyles, className)}
      role="navigation"
    >
      <h2 className={cn(
        "text-lg font-semibold mb-4",
        visuallyHidden && "sr-only"
      )}>
        {heading}
      </h2>
      <ul className="space-y-2" role="list">
        {pages.map((page, index) => (
          <li key={`${page.href}-${index}`} role="listitem">
            <Link
              href={page.href}
              className={cn(
                "inline-block text-blue-600 hover:text-blue-800 underline",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                visuallyHidden && "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-white focus:p-2 focus:z-50"
              )}
              {...(page.external && {
                target: "_blank",
                rel: "noopener noreferrer"
              })}
              aria-describedby={page.description ? `desc-${index}` : undefined}
            >
              {page.title}
            </Link>
            {page.description && (
              <span
                id={`desc-${index}`}
                className={cn(
                  "text-sm text-gray-600 ml-2",
                  visuallyHidden && "sr-only"
                )}
              >
                - {page.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RelatedPages;