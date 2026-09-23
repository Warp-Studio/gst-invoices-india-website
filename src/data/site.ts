// Single source of truth for facts shown on the site.
// Keep pricing, rating and review counts in sync with the Shopify App Store listing.

export const site = {
  name: 'GST Invoices India',
  url: 'https://gstinvoicesindia.com',
  tagline: 'Flawless GST invoices for your Shopify store, every single time.',
  description:
    'Automatically generate, email and WhatsApp GST-compliant invoices for every Shopify order. HSN codes, CGST/SGST/IGST, credit notes and GSTR-1 reports, handled. Free plan available.',
  appStoreUrl: 'https://apps.shopify.com/gst-invoice-india-1',
  reviewsUrl: 'https://apps.shopify.com/gst-invoice-india-1/reviews',
  email: 'warpstudio.io@gmail.com',
  // Optional: set to a number in international format without "+" (e.g. '919876543210') to show WhatsApp links.
  whatsapp: '',
  // Optional: a Cal.com / Calendly / Google Calendar booking link for the free support call.
  bookingUrl: '',
  company: {
    name: 'Warp Studio',
    url: 'https://www.warpstudio.io',
    location: 'Dharamshala, Himachal Pradesh, India',
  },
  rating: {
    value: 5.0,
    count: 21,
  },
  launched: 'September 2025',
};

// Appends attribution so installs from this site show up in the Shopify Partner Dashboard.
export function installUrl(placement: string) {
  const params = new URLSearchParams({
    utm_source: 'gstinvoicesindia.com',
    utm_medium: 'website',
    utm_content: placement,
  });
  return `${site.appStoreUrl}?${params}`;
}

export type Plan = {
  name: string;
  monthly: number;
  yearly: number | null;
  yearlySaving?: string;
  orders: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

const coreFeatures = [
  'Generate invoices',
  'Automatically email invoices',
  'Customizable templates',
  'Custom invoice numbering',
];

export const plans: Plan[] = [
  {
    name: 'Free',
    monthly: 0,
    yearly: null,
    orders: 'Up to 50 orders / month',
    blurb: 'For new stores getting started with GST compliance.',
    features: coreFeatures,
  },
  {
    name: 'Founders',
    monthly: 4.99,
    yearly: 39.99,
    yearlySaving: 'Save 33%',
    orders: '51–500 orders / month',
    blurb: 'For growing stores that need automation and clean reports.',
    features: coreFeatures,
    highlight: true,
  },
  {
    name: 'Growth',
    monthly: 9.99,
    yearly: 99.99,
    yearlySaving: 'Save 17%',
    orders: '501–3,000 orders / month',
    blurb: 'For high-volume merchants and distributors.',
    features: coreFeatures,
  },
  {
    name: 'Pro',
    monthly: 29.99,
    yearly: 299.99,
    yearlySaving: 'Save 17%',
    orders: '3,001+ orders / month',
    blurb: 'For large brands that want a direct line to the team.',
    features: [...coreFeatures, 'Priority WhatsApp and call support'],
  },
];

export type Review = {
  store: string;
  date: string;
  usage: string;
  text: string;
  featured?: boolean;
};

// From the Shopify App Store, edited only for capitalization and punctuation.
// All 21 reviews are 5 stars; rating-only reviews are not listed here.
export const reviews: Review[] = [
  {
    store: 'Guilt & Class',
    date: 'June 2026',
    usage: '12 days using the app',
    text: 'Great overall experience. Previously we were using Swipe invoices but we faced issues in terms of item wise discount allocation and credit notes for partial refunds. This app does exactly what is the need of the hour. Kudos to the developer Arihant who takes out time to discuss specific requirements and makes changes as per your requirements. Couldn’t have asked for a better app. We are a forever customer now.',
    featured: true,
  },
  {
    store: 'PrernaForIAS.com',
    date: 'March 2026',
    usage: '19 days using the app',
    text: 'Excellent app. Simple, elegant and has all the features. Much needed for India GST compliance. The only one of its kind with the right mix of free and paid features. Allows setting product level HSN and GST rates. Allocates GST into state/central/integrated based on the location. Invoices generated are perfect. Thanks!',
    featured: true,
  },
  {
    store: 'SLATE HASH',
    date: 'December 2025',
    usage: '4 months using the app',
    text: '10/10 app. Been looking for good invoice app at reasonable price. Finally switched to this app and experience is smooth. Customer support is really helpful and listen to merchant feedback. Plans are well priced, not like other overpriced app. I highly recommend this app to try out.',
    featured: true,
  },
  {
    store: 'reMargam',
    date: 'August 2026',
    usage: 'About 1 month using the app',
    text: 'We’ve had a great experience using this app. It takes care of GST invoicing automatically, and keeps all records well organized in one place. It’s simple to use, reliable, and has made managing our invoices much easier. Definitely a useful app for any business!',
  },
  {
    store: 'Rude Clothing',
    date: 'July 2026',
    usage: '30 days using the app',
    text: 'We have been using this app for 3 months and so far we are very much satisfied with the service overall. Even we are personally in touch with the founder and he is always there to solve the issues! Getting GSTR-1 reports is also really helpful.',
  },
  {
    store: 'Goldvyns',
    date: 'August 2026',
    usage: '23 days using the app',
    text: '…It will solve your invoice related issues. Easy to activate. Any doubts, send a message through WhatsApp, get quick response and issue resolved. Try it!',
  },
  {
    store: 'ADEL & VIDA',
    date: 'July 2026',
    usage: '6 days using the app',
    text: 'This app is amazing! There’s no need to worry about GST—it automatically generates and sends invoices to customers while keeping all records organized for future reference.',
  },
  {
    store: 'The Wink Label',
    date: 'July 2026',
    usage: '6 days using the app',
    text: 'This 5 star is more for the customer service than the app! The app is also amazing but the person behind it is even more impressive. Help is just a WhatsApp message away. Thanks!',
  },
  {
    store: 'Fun Junction',
    date: 'March 2026',
    usage: 'About 6 hours using the app',
    text: 'Best for Indian Shopify store, generates GST reports for easy accounting, sends invoice on mail to the customers, automatically calculates GST on the final amount.',
  },
  {
    store: 'Root Labs',
    date: 'July 2026',
    usage: '7 days using the app',
    text: 'It’s only been a few days of using the app but what I like the most is how helpful the founder is for any issues or confusions I face.',
  },
];
