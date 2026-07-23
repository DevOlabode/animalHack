import API_BASE from './config';

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

export async function forgotPassword(email) {
  const response = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send reset link');
  }

  return data.message;
}

export async function resetPassword(token, password) {
  const response = await fetch(`${API_BASE}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }

  return data.message;
}

export { parseAuthResponse };
