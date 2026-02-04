// Simple CSRF protection for forms
// In production, consider using a more robust solution like csrf or next-csrf

const CSRF_COOKIE_NAME = 'csrf_token'
const CSRF_HEADER_NAME = 'x-csrf-token'

// Generate a random token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array)
  } else {
    // Fallback for server-side
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Set CSRF token in cookie (client-side)
export function setCSRFCookie(token: string): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${CSRF_COOKIE_NAME}=${token}; path=/; SameSite=Strict; max-age=3600`
  }
}

// Get CSRF token from cookie (client-side)
export function getCSRFFromCookie(): string | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(new RegExp(`(^| )${CSRF_COOKIE_NAME}=([^;]+)`))
  return match ? match[2] : null
}

// Initialize CSRF token (call this on app mount)
export function initializeCSRF(): string {
  let token = getCSRFFromCookie()

  if (!token) {
    token = generateCSRFToken()
    setCSRFCookie(token)
  }

  return token
}

// Get headers with CSRF token for fetch requests
export function getCSRFHeaders(): HeadersInit {
  const token = getCSRFFromCookie()
  return {
    'Content-Type': 'application/json',
    ...(token ? { [CSRF_HEADER_NAME]: token } : {}),
  }
}

// Validate CSRF token (server-side)
export function validateCSRFToken(requestToken: string | null, cookieToken: string | null): boolean {
  if (!requestToken || !cookieToken) {
    return false
  }
  return requestToken === cookieToken
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME }
