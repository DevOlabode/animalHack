# Frontend Data Loading

## AuthContext

Holds `user`, `loading`, `login`, `logout`, `refresh`.

On app load: `GET /api/auth/me` with credentials.

## Per-page fetching

MVP pattern:

```js
useEffect(() => {
  let cancelled = false;
  (async () => {
    setLoading(true);
    try {
      const data = await api.getSomething();
      if (!cancelled) setData(data);
    } catch (e) {
      if (!cancelled) setError(e);
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();
  return () => { cancelled = true; };
}, [deps]);
```

## Axios

`withCredentials: true`; `baseURL` from `VITE_API_URL`.

## Phase 2

TanStack Query for cache; Zustand for UI-only state.
