const API_BASE = '/api';

const fetchOptions = {
  credentials: 'include',
};

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data.data;
}

export async function fetchPets() {
  const data = await handleResponse(await fetch(`${API_BASE}/pets`, fetchOptions));
  return data.pets;
}

export async function fetchPet(id) {
  const data = await handleResponse(await fetch(`${API_BASE}/pets/${id}`, fetchOptions));
  return data.pet;
}

export async function createPet(payload) {
  const data = await handleResponse(await fetch(`${API_BASE}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    ...fetchOptions,
    body: JSON.stringify(payload),
  }));
  return data.pet;
}

export async function updatePet(id, payload) {
  const data = await handleResponse(await fetch(`${API_BASE}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    ...fetchOptions,
    body: JSON.stringify(payload),
  }));
  return data.pet;
}

export async function deletePet(id) {
  await handleResponse(await fetch(`${API_BASE}/pets/${id}`, {
    method: 'DELETE',
    ...fetchOptions,
  }));
}
