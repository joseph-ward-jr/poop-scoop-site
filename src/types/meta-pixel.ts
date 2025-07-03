// Meta Pixel TypeScript declarations
declare global {
  interface Window {
    fbq: (action: string, eventName: string, parameters?: Record<string, any>) => void;
  }
}

// Meta Pixel event types
export type MetaPixelEvent = 
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe';

// Meta Pixel parameters for events
export interface MetaPixelParameters {
  content_category?: string;
  content_id?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  currency?: string;
  value?: number;
  search_string?: string;
  status?: boolean;
  [key: string]: any;
}

export {};
