export const API_BASE_URL = 'http://localhost:8080/api'

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`
}
