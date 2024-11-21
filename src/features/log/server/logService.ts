import { ObjectId } from 'mongodb';

import { Log, LogWithId } from '@/features/log/types/Log';
import { UserModel } from '@/features/user/db/userModel';

import { LogDal } from '../db/logDal';
import { CreateLogRequest } from '../types/CreateLogRequest';
import { ELogStatus } from '../types/ELogStatus';

// ***** Basic CRUD *****
// Service to create a Log
export async function createLogService(request: CreateLogRequest, ipAddress: string): Promise<LogWithId> {
  const log: Log = {
    userId: new ObjectId(request.userId),
    details: request.details,
    status: ELogStatus.SUCCESS, // hardcoded user action
    additionalInfo: request.additionalInfo,
    action: request.action,
    ipAddress,
  };
  const validLog = Log.parse(log);
  return await LogDal.create(validLog);
}

export async function createServerLogService(log: Log): Promise<LogWithId> {
  return await LogDal.create(log);
}

// Service to get all Logs
interface GetLogsOptions {
  page?: number;
  limit?: number;
  filters?: {
    email?: string;
    action?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
}

export async function getAllLogsService(options: GetLogsOptions = {}): Promise<{
  logs: LogWithId[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Find users by email if email filter is provided
  let userIds: ObjectId[] | undefined;
  if (options.filters?.email) {
    const users = await UserModel.find({
      email: { $regex: options.filters.email, $options: 'i' },
    }).select('_id');
    userIds = users.map(user => user._id);
    if (userIds.length === 0) {
      // If no users found with this email, return empty result
      return {
        logs: [],
        total: 0,
        page,
        totalPages: 0,
      };
    }
  }

  // Build filter object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: Record<string, any> = {};

  if (userIds) {
    filter.userId = { $in: userIds };
  }
  if (options.filters?.action) {
    filter.action = options.filters.action;
  }
  if (options.filters?.status) {
    filter.status = options.filters.status;
  }
  if (options.filters?.startDate || options.filters?.endDate) {
    filter.createdAt = {};
    if (options.filters.startDate) {
      filter.createdAt.$gte = new Date(options.filters.startDate);
    }
    if (options.filters.endDate) {
      filter.createdAt.$lte = new Date(options.filters.endDate);
    }
  }

  const { logs, total } = await LogDal.getAll(filter, skip, limit);

  return {
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
