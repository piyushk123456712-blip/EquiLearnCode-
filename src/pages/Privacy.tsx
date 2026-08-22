import { AdPlaceholder } from '../components/ads/AdPlaceholder';

export const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p className="font-medium text-foreground">
          This platform is proudly operated by Piyush Kumar, Founder & CEO. This Privacy Policy outlines how we handle your information.
        </p>
        
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
          <p>
            We do not require you to create an account. We do not collect personal identification information 
            unless you voluntarily submit it through our contact form.
          </p>
          <p>
            We use local browser storage (localStorage) to save your course progress and preferences (such as language and theme). 
            This data remains on your device and is not sent to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Third-Party Services & Advertising</h2>
          <p>
            To keep the platform free, we use third-party advertising networks. These networks may use cookies and similar technologies 
            to serve advertisements based on your prior visits to our website or other websites.
          </p>
          <p>
            Our lessons include embedded videos hosted by YouTube. YouTube may collect data, use cookies, embed additional third-party tracking, 
            and monitor your interaction with that embedded content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Analytics</h2>
          <p>
            We may use standard analytics tools to measure website traffic and improve our educational content. 
            This data is aggregated and anonymized.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We encourage you to review this page periodically for any changes.
          </p>
        </section>
      </div>
      
      <AdPlaceholder type="banner" className="mt-16" />
    </div>
  );
};
