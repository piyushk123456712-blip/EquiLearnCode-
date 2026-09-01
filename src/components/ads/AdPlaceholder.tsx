import { cn } from '../../lib/utils';

interface AdPlaceholderProps {
  className?: string;
  type?: 'banner' | 'sidebar' | 'responsive';
}

export const AdPlaceholder = ({ className, type = 'responsive' }: AdPlaceholderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center my-8 text-center overflow-hidden",
        className
      )}
    >
      {/* 
        Ad network scripts have been disabled here to prevent malicious 
        frame-busting and unwanted mobile redirects to Vercel/scam pages.
        Only use trusted ad networks like Google AdSense.
      */}
      <div className="w-full flex justify-center items-center text-muted-foreground text-xs">
      </div>
    </div>
  );
};
