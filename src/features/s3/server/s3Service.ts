import { s3Service } from '@/features/s3/lib/s3';

export async function s3PresignedUploadProfilePictureService(contentType: string, userId: string): Promise<string> {
  const filepath = `${userId}/profile-picture`;

  const presignedUrl = await s3Service.getPresignedUploadUrl(filepath, contentType, 3600);

  return presignedUrl;
}

export async function s3UploadProfilePictureService(file: File, userId: string): Promise<string> {
  const presignedUrl = await s3Service.uploadFile(file, userId);

  return presignedUrl;
}

export async function s3UploadFileService(file: File, filepath: string): Promise<string> {
  const fileUrl = await s3Service.uploadFile(file, filepath);
  return fileUrl;
}
