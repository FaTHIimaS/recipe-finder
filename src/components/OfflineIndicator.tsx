import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <aside
      aria-label="Offline status notice"
      className="bg-[#5A7D5B] text-white px-4 py-2 text-xs flex items-center justify-between shadow-xs animate-fadeIn"
    >
      <div className="flex items-center gap-2">
        <WifiOff className="w-3.5 h-3.5 text-white/80" />
        <span className="font-medium">Offline Mode Active</span>
        <span className="hidden sm:inline text-white/80">— All recipes and saved favorites are ready to cook</span>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-medium">
        <CheckCircle2 className="w-3 h-3 text-white" />
        <span>Cached</span>
      </div>
    </aside>
  );
};
