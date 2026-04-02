import { redis } from "../config/redis";

export const CACHE_KEYS = {
  PORTFOLIO: "portfolio:data",
};

export const clearPortfolioCache = async () => {
  await redis.del(CACHE_KEYS.PORTFOLIO);
};