const API_BASE = '/api';

const fetchOptions = {
  credentials: 'include',
};

export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, fetchOptions);

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data.user;
  } catch {
    return null;
  }
}

export async function logout() {
  await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    ...fetchOptions,
  });
}
