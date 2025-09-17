/**
 * Interface for URL entries stored in the application
 */
export interface UrlEntry {
  id: string;
  longUrl: string;
  shortUrl: string;
  createdAt: Date;
  clickCount: number;
}

/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns boolean indicating if the URL is valid
 */
export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    // Check if protocol is http or https
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    // If URL constructor throws, it's not a valid URL
    return false;
  }
};

/**
 * Generates a random short URL identifier
 * @returns A shortened URL string
 */
export const generateShortUrl = (): string => {
  const domain = 'https://short.ly/';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  // Generate a 7-character random string
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return domain + result;
};

/**
 * Formats a date for display in the UI
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  
  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    const hours = Math.floor(diffInHours);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (diffInDays < 7) {
    const days = Math.floor(diffInDays);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

/**
 * Truncates a URL for display purposes
 * @param url - The URL to truncate
 * @param maxLength - Maximum length of the truncated URL
 * @returns Truncated URL string
 */
export const truncateUrl = (url: string, maxLength: number = 50): string => {
  if (url.length <= maxLength) {
    return url;
  }
  
  return url.substring(0, maxLength - 3) + '...';
};

/**
 * Extracts domain from a URL for display
 * @param url - The URL to extract domain from
 * @returns Domain string or original URL if extraction fails
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
};