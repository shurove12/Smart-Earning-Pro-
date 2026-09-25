declare global {
  interface Window {
    show_11887274?: (param?: any) => Promise<any>;
  }
}

export const MONETAG_ZONE_ID = '11887274';
export const MONETAG_DIRECT_LINK = 'https://omg10.com/4/11887609';

// Initialize In-App Interstitial
export function initMonetagInApp() {
  try {
    if (typeof window.show_11887274 === 'function') {
      window.show_11887274({
        type: 'inApp',
        inAppSettings: {
          frequency: 2,
          capping: 0.1,
          interval: 30,
          timeout: 5,
          everyPage: false,
        },
      });
    }
  } catch (err) {
    console.warn('Monetag inApp init notice:', err);
  }
}

// Play Rewarded Ad (Popup or Rewarded Interstitial)
export function playMonetagRewardedAd(
  format: 'pop' | 'interstitial' = 'pop',
  directLinkFallback = MONETAG_DIRECT_LINK
): Promise<{ success: boolean; method: string }> {
  return new Promise((resolve) => {
    // If real Monetag SDK is active
    if (typeof window.show_11887274 === 'function') {
      const call =
        format === 'pop'
          ? window.show_11887274('pop')
          : window.show_11887274();

      if (call && typeof call.then === 'function') {
        call
          .then(() => {
            resolve({ success: true, method: 'sdk' });
          })
          .catch((e) => {
            console.warn('Monetag SDK error or ad blocked, using direct link fallback:', e);
            // Open direct link
            window.open(directLinkFallback, '_blank');
            resolve({ success: true, method: 'direct_link_fallback' });
          });
        return;
      }
    }

    // Direct link fallback
    window.open(directLinkFallback, '_blank');
    resolve({ success: true, method: 'direct_link' });
  });
}
