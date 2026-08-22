import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface AdPlaceholderProps {
  className?: string;
  type?: 'banner' | 'sidebar' | 'responsive';
}

export const AdPlaceholder = ({ className, type = 'responsive' }: AdPlaceholderProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current || adRef.current.hasChildNodes()) return;

    if (type === 'sidebar') {
      // 300x250 banner
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `atOptions = { 'key' : '77631de1af97f20bd7a123f68471d127', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };`;
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.highperformanceformat.com/77631de1af97f20bd7a123f68471d127/invoke.js';
      
      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    } else if (type === 'banner') {
      // 320x50 banner
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `atOptions = { 'key' : '2bec36dcc0420dae701547efe200b2ca', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };`;
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.highperformanceformat.com/2bec36dcc0420dae701547efe200b2ca/invoke.js';
      
      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    } else {
      // Native ad
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://pl30318867.effectivecpmnetwork.com/be32d02e0942e6dfdd2a3aace7b439f1/invoke.js";
      
      const div = document.createElement('div');
      div.id = "container-be32d02e0942e6dfdd2a3aace7b439f1";
      
      adRef.current.appendChild(script);
      adRef.current.appendChild(div);
    }
  }, [type]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center my-8 text-center overflow-hidden",
        className
      )}
    >
      {/* Smartlink fallback/sponsor button if needed: 
          https://www.effectivecpmnetwork.com/yafmt03w6?key=b93a2e046bc3e4d661aef48a4bdd1b09 
      */}
      <div ref={adRef} className="w-full flex justify-center items-center"></div>
    </div>
  );
};
