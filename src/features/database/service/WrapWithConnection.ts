/* eslint-disable @typescript-eslint/no-explicit-any */

import { MongoDBConnector } from './MongdoDBConnector';

/**
 * Wraps a data access layer (DAL) object with MongoDB connection handling.
 *
 * This function takes a DAL object and a MongoDBConnector instance, and returns a new object
 * with the same methods as the original DAL, but each method is wrapped to ensure a database
 * connection is established before execution.
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
 * @template T
 * @param {T} dal - The original data access layer object.
 * @param {MongoDBConnector} connector - An instance of MongoDBConnector.
 * @returns {T} A new object with the same methods as the original DAL, but wrapped with connection handling.
 */
export function WrapWithConnection<T extends object>(dal: T, connector: MongoDBConnector): T {
  const wrappedDal = {} as T;

  for (const key of Object.keys(dal) as Array<keyof T>) {
    if (typeof dal[key] === 'function') {
      wrappedDal[key] = (async (...args: any[]) => {
        return connector.withConnection(() => (dal[key] as any)(...args));
      }) as any;
    } else {
      wrappedDal[key] = dal[key];
    }
  }

  return wrappedDal;
}
