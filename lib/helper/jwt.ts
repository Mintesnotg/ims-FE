export function decodePayload<T = any>(token: string): T | null {
    debugger;
    try {
        // JWT = header.payload.signature ─ we only need the middle part
        const base64 = token.split('.')[1] ?? ''
        const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(json) as T
    } catch {
        return null                           // malformed ⇒ treat as invalid
    }
}

export function isExpired(token: string): boolean {
    debugger;
  const payload = decodePayload<{ exp?: number }>(token)
  // exp is in seconds since Unix epoch
  var result= !payload?.exp || payload.exp * 1000 < Date.now()
  console.log(` is the token expired :-  ${result}`)
  return result;
}