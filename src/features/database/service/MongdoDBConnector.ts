import mongoose from 'mongoose';

/**
 * MongoDBConnector class for managing MongoDB connections.
 *
 * This class provides a convenient way to establish and manage connections to MongoDB
 * using Mongoose. It implements connection caching and lazy loading to optimize
 * performance and resource usage.
 *
 * @example
 * import { MongoDBConnector, wrapWithConnection } from '@operation-firefly/mongodb-package';
 *
 * const dbConnector = new MongoDBConnector('mongodb://localhost:27017/mydb');
 *
 * const baseLogDal = {
 *   async create(log) { ... },
 *   async getAll() { ... }
 * };
 *
 * export const LogDal = wrapWithConnection(baseLogDal, dbConnector);
 *
 * // Usage
 * const newLog = await LogDal.create({ message: 'Test log' });
 * const allLogs = await LogDal.getAll();
 *
 * @class
 */
export class MongoDBConnector {
  private uri: string;
  private cached: {
    connection?: typeof mongoose;
    promise?: Promise<typeof mongoose>;
  } = {};

  constructor(uri: string) {
    this.uri = uri;
  }

  private async connect(): Promise<typeof mongoose> {
    if (!this.uri) {
      throw new Error('MongoDB URI is not defined');
    }

    if (this.cached.connection) {
      return this.cached.connection;
    }

    if (!this.cached.promise) {
      const opts = {
        bufferCommands: false,
      };
      this.cached.promise = mongoose.connect(this.uri, opts);
    }

    try {
      this.cached.connection = await this.cached.promise;
    } catch (e) {
      this.cached.promise = undefined;
      throw e;
    }

    return this.cached.connection;
  }

  async withConnection<T>(operation: () => Promise<T>): Promise<T> {
    await this.connect();
    return operation();
  }
}
