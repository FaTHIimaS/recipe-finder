import React, { useState } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        id="btn-install-app"
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5A7D5B] bg-[#F5F2EE] hover:bg-[#ECE6DE] rounded-xl transition-colors border border-[#E8E2D9] shadow-2xs active:scale-95 cursor-pointer"
        title="Install Recipe Finder to home screen"
      >
        <Download className="w-3.5 h-3.5 text-[#5A7D5B]" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="btn-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5A7D5B] bg-[#F5F2EE] hover:bg-[#ECE6DE] rounded-xl transition-colors border border-[#E8E2D9] shadow-2xs active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#5A7D5B]" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div
            id="modal-ios-pwa-guide"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-sm rounded-[32px] bg-white border border-[#E8E2D9] p-6 shadow-xl text-[#3A3530] relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#3A3530]/60 hover:bg-[#F5F2EE] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#F5F2EE] border border-[#E8E2D9] flex items-center justify-center mb-4 text-[#5A7D5B]">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl text-[#3A3530]">Install on iPhone / iPad</h3>
              <p className="mt-1.5 text-xs text-[#3A3530]/70 leading-relaxed">
                Enjoy offline access and launch instantly from your home screen:
              </p>

              <div className="mt-4 space-y-2.5 text-xs bg-[#F5F2EE] p-3.5 rounded-2xl border border-[#E8E2D9]">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5A7D5B] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <span className="leading-snug">Tap the <strong>Share</strong> button in Safari toolbar.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5A7D5B] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <span className="leading-snug">Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5A7D5B] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                  <span className="leading-snug">Tap <strong>Add</strong> in the top-right corner.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-2xl bg-[#5A7D5B] text-white py-3 text-xs sm:text-sm font-medium hover:bg-[#486549] transition-all shadow-lg shadow-[#5A7D5B]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
