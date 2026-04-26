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

// Password strength utility
// export function getPasswordStrength(password: string) {
//   let strength = 0;
//   if (password.length >= 6) strength++;
//   if (password.length >= 8) strength++;
//   if (/[A-Z]/.test(password)) strength++;
//   if (/[0-9]/.test(password)) strength++;
//   if (/[^A-Za-z0-9]/.test(password)) strength++;

//   const info = {
//     0: { text: "দুর্বল", color: "text-red-500", bg: "bg-red-500" },
//     1: { text: "দুর্বল", color: "text-red-500", bg: "bg-red-500" },
//     2: { text: "মাঝারি", color: "text-yellow-500", bg: "bg-yellow-500" },
//     3: { text: "ভালো", color: "text-blue-500", bg: "bg-blue-500" },
//     4: { text: "শক্তিশালী", color: "text-green-500", bg: "bg-green-500" },
//     5: { text: "শক্তিশালী", color: "text-green-500", bg: "bg-green-500" },
//   } as const;

//   return { strength, ...info[strength as keyof typeof info] };
// }

export function getPasswordStrength(password: string) {
  if (!password) {
    return { strength: 0, text: "", color: "", bg: "" };
  }

  let score = 0;

  // 1. Length requirements (High priority)
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 2;
  if (password.length >= 16) score += 1;

  // 2. Character Variety (Bonus points)
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasLower && hasUpper) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecial) score += 1;

  // 3. Penalties for weak patterns
  if (password.length < 8) score = Math.min(score, 1); // Cap short passwords
  if (/^[0-9]+$/.test(password) || /^[a-zA-Z]+$/.test(password)) score -= 1;
  if (/(.)\1{2,}/.test(password)) score -= 1; // Sequences like 'aaa' or '111'

  // 4. Clamp strength between 0-5
  const strength = Math.max(1, Math.min(5, score)) as keyof typeof info;

  const info = {
    0: { text: "", color: "", bg: "" },
    1: { text: "অনেক দুর্বল", color: "text-red-600", bg: "bg-red-600" },
    2: { text: "দুর্বল", color: "text-orange-500", bg: "bg-orange-500" },
    3: { text: "মাঝারি", color: "text-yellow-500", bg: "bg-yellow-500" },
    4: { text: "শক্তিশালী", color: "text-blue-500", bg: "bg-blue-500" },
    5: { text: "অনেক শক্তিশালী", color: "text-green-500", bg: "bg-green-500" },
  } as const;

  return { strength, ...info[strength as keyof typeof info]  };
}
