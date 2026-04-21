import { API_URL } from '../constants/apiUrls';
import { setToken } from '../helpers/token';

export async function login(
  payload: any,
): Promise<{ email: string; role: string; accessToken: string }> {
  const { email } = payload.decoded;
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  setToken(data.accessToken);

  return { email: data.email, role: data.role, accessToken: data.accessToken };
}
