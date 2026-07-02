const API_BASE = '/api';

export function isLoggedIn() {
    const token = localStorage.getItem("token");
    console.log(token);
    return !!token;
}

export async function logout() {
    const token = localStorage.getItem("token");
  
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    localStorage.removeItem("token");
}