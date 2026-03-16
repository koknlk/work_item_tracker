import { TOKEN_KEY } from './constants';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(TOKEN_KEY);
  }

  const headers = {
    ...(init?.headers || {}),
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  const res = await fetch(input, { ...init, headers });

  if (!res.ok) {
    const text = await res.text();
    console.error('Fetch Error:', res.status, res.statusText, text, input);

    
    if (res.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY); 
      window.location.href = '/login';   
      return; 
    }

    throw new Error(text || `HTTP error ${res.status}`);
  }

  
  if (res.status === 204) return null;

  
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}