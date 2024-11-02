import { s3Service } from '@/lib/s3';

export async function s3UploadFileService(
  file: File,
  filepath: string
): Promise<string> {
  const fileUrl = await s3Service.uploadFile(file, filepath);
  return fileUrl;
}
