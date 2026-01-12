import { Engine } from './util';

interface EngineVersionBaseProps {
  /**
   * The major version of the engine.
   */
  readonly majorVersion: string;
}

abstract class EngineVersionBase {
  /**
   * The major version of the engine.
   */
  public readonly majorVersion: string;

  protected constructor(props: EngineVersionBaseProps) {
    this.majorVersion = props.majorVersion;
  }
}

/**
 * Properties for the Valkey engine version.
 */
export interface ValkeyEngineVersionProps extends EngineVersionBaseProps {}

/**
 * Valkey engine version for serverless cache.
 */
export class ValkeyEngineVersion extends EngineVersionBase {
  /**
   * Version 7
   */
  public static readonly VER_7 = new ValkeyEngineVersion({ majorVersion: '7' });

  /**
   * Version 8
   */
  public static readonly VER_8 = new ValkeyEngineVersion({ majorVersion: '8' });

  /**
   * Creates a ValkeyEngineVersion.
   * @param props The properties for the Valkey engine version.
   * @returns A ValkeyEngineVersion.
   */
  public static of(props: ValkeyEngineVersionProps): ValkeyEngineVersion {
    return new ValkeyEngineVersion(props);
  }

  private constructor(props: ValkeyEngineVersionProps) {
    super(props);
  }
}

/**
 * Properties of the Valkey engine for serverless cache.
 */
export interface ValkeyEngineProps {
  /**
   * The engine version of the Valkey engine.
   */
  readonly engineVersion: ValkeyEngineVersion;
}

/**
 * Properties for the Redis engine version.
 */
export interface RedisEngineVersionProps extends EngineVersionBaseProps {}

/**
 * Redis engine version for serverless cache.
 */
export class RedisEngineVersion extends EngineVersionBase {
  /**
   * Version 7
   */
  public static readonly VER_7 = new RedisEngineVersion({ majorVersion: '7' });

  /**
   * Creates a RedisEngineVersion.
   * @param props The properties for the Redis engine version.
   * @returns A RedisEngineVersion.
   */
  public static of(props: RedisEngineVersionProps): RedisEngineVersion {
    return new RedisEngineVersion(props);
  }

  private constructor(props: RedisEngineVersionProps) {
    super(props);
  }
}

/**
 * Properties of the Redis engine for serverless cache.
 */
export interface RedisEngineProps {
  /**
   * The engine version of the Redis engine.
   */
  readonly engineVersion: RedisEngineVersion;
}

/**
 * Properties for the Memcached engine version.
 */
export interface MemcachedEngineVersionProps extends EngineVersionBaseProps {}

/**
 * Memcached engine version for serverless cache.
 */
export class MemcachedEngineVersion extends EngineVersionBase {
  /**
   * Version 1.6
   */
  public static readonly VER_1_6 = new MemcachedEngineVersion({ majorVersion: '1.6' });

  /**
   * Creates a MemcachedEngineVersion.
   * @param props The properties for the Memcached engine version.
   * @returns A MemcachedEngineVersion.
   */
  public static of(props: MemcachedEngineVersionProps): MemcachedEngineVersion {
    return new MemcachedEngineVersion(props);
  }

  private constructor(props: MemcachedEngineVersionProps) {
    super(props);
  }
}

/**
 * Properties of the Memcached engine for serverless cache.
 */
export interface MemcachedEngineProps {
  /**
   * The engine version of the Memcached engine.
   */
  readonly engineVersion: MemcachedEngineVersion;
}

/**
 * Engine class for serverless cache.
 */
export class ServerlessCacheEngine {
  /**
   * Creates a ServerlessCacheEngine for Redis.
   * @param props The properties for the Redis engine.
   * @returns A ServerlessCacheEngine for Redis.
   */
  public static redis(props: RedisEngineProps): ServerlessCacheEngine {
    return new ServerlessCacheEngine(Engine.REDIS, props.engineVersion.majorVersion);
  }

  /**
   * Creates a ServerlessCacheEngine for Valkey.
   * @param props The properties for the Valkey engine.
   * @returns A ServerlessCacheEngine for Valkey.
   */
  public static valkey(props: ValkeyEngineProps): ServerlessCacheEngine {
    return new ServerlessCacheEngine(Engine.VALKEY, props.engineVersion.majorVersion);
  }

  /**
   * Creates a ServerlessCacheEngine for Memcached.
   * @param props The properties for the Memcached engine.
   * @returns A ServerlessCacheEngine for Memcached.
   */
  public static memcached(props: MemcachedEngineProps): ServerlessCacheEngine {
    return new ServerlessCacheEngine(Engine.MEMCACHED, props.engineVersion.majorVersion);
  }

  /**
   * The engine type of the serverless cache.
   */
  public readonly engine: Engine;

  /**
   * The major engine version of the serverless cache.
   */
  public readonly majorEngineVersion: string;

  private constructor(engine: Engine, majorEngineVersion: string) {
    this.engine = engine;
    this.majorEngineVersion = majorEngineVersion;
  }
}
