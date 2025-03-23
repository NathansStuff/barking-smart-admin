import { dbConnector } from '@/features/database/lib/mongodb';
import { WrapWithConnection } from '@/features/database/service/WrapWithConnection';
import { Log, LogWithId } from '@/features/log/types/Log';
import { UserModel } from '@/features/user/db/userModel';

import { LogModel } from './logModel';

const baseLogDal = {
  async create(log: Log): Promise<LogWithId> {
    const result = await LogModel.create(log);
    return result;
  },

  async getAll(filter = {}, skip = 0, limit = 10): Promise<{ logs: LogWithId[]; total: number }> {
    const [logs, total] = await Promise.all([
      LogModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate({
        path: 'userId',
        model: UserModel,
        select: 'email name',
      }),
      LogModel.countDocuments(filter),
    ]);
    return { logs, total };
  },
};

export const LogDal = WrapWithConnection(baseLogDal, dbConnector);
