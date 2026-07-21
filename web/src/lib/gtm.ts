/**
 * Google Tag Manager & Google Analytics 4 Telemetry Dispatcher
 * GTM ID: GTM-5JTFJPDB
 * GA4 ID: G-J9JN67FS5C
 */

export const GTM_ID = 'GTM-5JTFJPDB';
export const GA4_ID = 'G-J9JN67FS5C';

export function pushToDataLayer(eventName: string, data: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // Ensure dataLayer array exists
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  const payload = {
    event: eventName,
    ...data,
    timestamp: new Date().toISOString()
  };

  // Push to GTM dataLayer
  (window as any).dataLayer.push(payload);

  // Send to GA4 if gtag function is defined
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, data);
  }
}
