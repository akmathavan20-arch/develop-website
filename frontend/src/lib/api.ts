export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export async function api(path: string, method = 'GET', body?: any, token?: string) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  return res.json();
}
