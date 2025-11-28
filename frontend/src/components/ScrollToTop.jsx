import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Ensures that on every route change, the page scrolls to the top (0,0).
 * If the URL contains a hash anchor (e.g., /about#team), it will:
 * 1. First scroll to top
 * 2. Then scroll to the anchor element if it exists
 * 
 * This fixes the bug where pages were opening at footer or lower positions.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Always scroll to top first on route change
    window.scrollTo(0, 0);

    // If there's a hash in the URL, scroll to that element after a brief delay
    // This ensures the page has rendered and the element is available
    if (hash) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname, hash]); // Re-run on pathname or hash change

  return null; // This component doesn't render anything
}

export default ScrollToTop;

