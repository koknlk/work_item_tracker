import { LoginDto, AuthResponse } from '../../types/Auth';
import { API_URL, TOKEN_KEY } from '../../utils/constants';


export async function login(dto: LoginDto) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error('Invalid credentials');
  const data: AuthResponse = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY); 
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}