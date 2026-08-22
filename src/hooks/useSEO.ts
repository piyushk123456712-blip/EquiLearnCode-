import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  type?: string;
}

export const useSEO = ({ title, description, type = 'website' }: SEOProps) => {
  useEffect(() => {
    // Determine the full title
    const siteName = 'EquiLearnCode';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrValue] = selector.replace(/[\[\]"']/g, '').split('=');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    if (description) {
      updateMetaTag('meta[name="description"]', 'content', description);
      updateMetaTag('meta[property="og:description"]', 'content', description);
    }

    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:type"]', 'content', type);

  }, [title, description, type]);
};
