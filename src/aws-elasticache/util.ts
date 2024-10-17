/**
 * The engine the cache uses.
 */
export enum Engine {
  /**
   * Redis
   */
  REDIS = 'redis',
  /**
   * Valkey
   */
  VALKEY = 'valkey',
  /**
   * Memcached
   */
  MEMCACHED = 'memcached',
}
