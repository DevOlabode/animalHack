const API_BASE = '/api';

const fetchOptions = {
  credentials: 'include',
};

function parseAuthResponse(data) {
  return {
    user: data.data.user,
    clinic: data.data.clinic ?? null,
  };
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE}/auth/me`, fetchOptions);

    if (response.status === 401) {
      return { user: null, clinic: null };
    }

    if (!response.ok) {
      return { user: null, clinic: null };
    }

    const data = await response.json();
    return parseAuthResponse(data);
  } catch {
    return { user: null, clinic: null };
  }
}

export async function logout() {
  await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    ...fetchOptions,
  });
}

export async function updateOwnerProfile(payload) {
  const response = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    ...fetchOptions,
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update profile');
  }

  return parseAuthResponse(data);
}

export async function updateClinicProfile(payload) {
  const response = await fetch(`${API_BASE}/profile/clinic`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    ...fetchOptions,
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update clinic profile');
  }

  return parseAuthResponse(data);
}

export { parseAuthResponse };
