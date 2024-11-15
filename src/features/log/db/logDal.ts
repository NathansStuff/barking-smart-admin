import { dbConnector } from '@/features/database/lib/mongodb';
import { WrapWithConnection } from '@/features/database/service/WrapWithConnection';
import { Log, LogWithId } from '@/features/log/types/Log';

import { LogModel } from './logModel';

const baseLogDal = {
  async create(log: Log): Promise<LogWithId> {
    const result = await LogModel.create(log);
    return result;
  },
  async getAll(): Promise<LogWithId[]> {
    const result = await LogModel.find({});
    return result;
  },
};

export const LogDal = WrapWithConnection(baseLogDal, dbConnector);
