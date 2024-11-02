import { S3Service } from '@operation-firefly/s3-toolkit';

import { env } from '@/constants';

export const s3Service = new S3Service({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  bucketName: env.AWS_S3_BUCKET_NAME,
});
