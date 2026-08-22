import { Mail, MessageSquare } from 'lucide-react';
import { AdPlaceholder } from '../components/ads/AdPlaceholder';

export const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Have a question, feedback, or suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Get in touch</h2>
            <p className="text-muted-foreground text-sm">Fill out the form below and we'll get back to you.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>

      <AdPlaceholder type="banner" className="mt-16" />
    </div>
  );
};
