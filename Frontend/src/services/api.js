export async function api(url, options = {}) {
  const res = await fetch(`/api${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) {
    throw new Error('API error')
  }

  return res.json()
}
