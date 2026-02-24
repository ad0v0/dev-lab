export function isLocalhost(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  const { hostname } = window.location
  return hostname === 'localhost' || hostname === '127.0.0.1'
}

export function isLiveMode(): boolean {
  return import.meta.env.VITE_MODE === 'live' && isLocalhost()
}
