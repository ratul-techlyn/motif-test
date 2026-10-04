/**
 * CanonicalTag Component
 * 
 * A modular, reusable component for injecting canonical URLs into page heads.
 * Designed for SEO optimization and audit compliance.
 * 
 * @example
 * ```tsx
 * <CanonicalTag url="https://wemotif.com/culture" />
 * ```
 */

interface CanonicalTagProps {
  /** The canonical URL for the current page */
  url: string;
  /** Optional: Override the default domain */
  domain?: string;
}

const CanonicalTag: React.FC<CanonicalTagProps> = ({ 
  url, 
  domain = "https://wemotif.com" 
}) => {
  // Ensure URL is properly formatted
  const canonicalUrl = url.startsWith('http') 
    ? url 
    : `${domain}${url.startsWith('/') ? url : `/${url}`}`;

  return (
    <link
      rel="canonical"
      href={canonicalUrl}
      data-testid="canonical-tag"
    />
  );
};

export default CanonicalTag;