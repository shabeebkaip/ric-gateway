type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const stores = new Map<string, Map<string, RateLimitEntry>>();

export function consumeRateLimit(
  bucket: string,
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();
  const store = stores.get(bucket) ?? new Map<string, RateLimitEntry>();
  stores.set(bucket, store);

  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    const nextEntry = { count: 1, resetAt: now + windowMs };
    store.set(key, nextEntry);
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: nextEntry.resetAt,
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: true,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}