import { prisma } from './db';

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  const now = new Date();
  let staleData: T | null = null;

  try {
    const cached = await prisma.cachedData.findUnique({
      where: { id: key },
    });

    if (cached) {
      if (cached.expiresAt > now) {
        return JSON.parse(cached.value) as T;
      }
      staleData = JSON.parse(cached.value) as T;
    }
  } catch (error) {
    console.error(`Cache read error for ${key}:`, error);
  }

  try {
    const data = await fetcher();

    try {
      await prisma.cachedData.upsert({
        where: { id: key },
        update: {
          value: JSON.stringify(data),
          expiresAt: new Date(now.getTime() + ttlSeconds * 1000),
        },
        create: {
          id: key,
          value: JSON.stringify(data),
          expiresAt: new Date(now.getTime() + ttlSeconds * 1000),
        },
      });
    } catch (error) {
      console.error(`Cache write error for ${key}:`, error);
    }

    return data;
  } catch (error) {
    if (staleData !== null) {
      console.warn(`Fetch failed for ${key}, serving stale cache`);
      return staleData;
    }
    throw error;
  }
}
