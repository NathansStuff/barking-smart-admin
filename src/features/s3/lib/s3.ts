import { env } from '@/constants';

import { S3Service } from '../service/S3Service';
export const s3Service = new S3Service({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  bucketName: env.AWS_S3_BUCKET_NAME,
});
