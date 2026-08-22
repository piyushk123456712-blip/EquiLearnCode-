import { AdPlaceholder } from '../components/ads/AdPlaceholder';

export const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="font-medium text-foreground">
          Welcome! These terms govern your use of the platform, which is founded and operated by CEO Piyush Kumar.
        </p>
        
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using our platform, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Educational Purpose</h2>
          <p>
            All content is provided for educational purposes only. We strive to provide accurate and up-to-date information, 
            but we make no representations or warranties of any kind about the completeness or accuracy of the materials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. User Conduct</h2>
          <p>
            You agree to use the website only for lawful purposes. You must not use the website in any way that causes, 
            or may cause, damage to the website or impairment of the availability or accessibility of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Embedded Content & Links</h2>
          <p>
            Our website includes embedded content (e.g., YouTube videos) and links to other websites. 
            We have no control over the nature, content, and availability of those external sites.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Advertisements</h2>
          <p>
            This website displays advertisements provided by third-party networks. The inclusion of any advertisements 
            does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>
      </div>
      
      <AdPlaceholder type="banner" className="mt-16" />
    </div>
  );
};
