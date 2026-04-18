/**
 * Converts English digits to Bengali digits
 * @param num - Number or string to convert
 * @returns String with Bengali digits
 */
export const toBanglaNumber = (num: number | string): string => {
  const englishDigits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  
  return String(num).replace(/[0-9]/g, (digit) => englishDigits[digit]);
};

// /**
//  * Format price with currency
//  * @param price - Price number
//  * @param currency - Currency string (default: 'BDT')
//  * @returns Formatted price string
//  */
// export const formatPrice = (price: number, currency: string = 'BDT'): string => {
//   return `${price} ${currency}`;
// };

// /**
//  * Calculate profit from wholesale and sale price
//  * @param wholesale - Wholesale price
//  * @param sale - Sale price
//  * @returns Profit amount
//  */
// export const calculateProfit = (wholesale: number, sale: number): number => {
//   return sale - wholesale;
// };

// /**
//  * Generate slug from title
//  * @param title - Title string
//  * @returns URL-friendly slug
//  */
// export const generateSlug = (title: string): string => {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9 -]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .trim();
// };

// /**
//  * Truncate text to specified length
//  * @param text - Text to truncate
//  * @param length - Maximum length
//  * @returns Truncated text with ellipsis
//  */
// export const truncateText = (text: string, length: number): string => {
//   if (text.length <= length) return text;
//   return text.substring(0, length).trim() + '...';
// };