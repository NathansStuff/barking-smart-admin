import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Configuration options for the S3Service.
 */
interface S3ServiceConfig {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucketName: string;
}

/**
 * A service class for interacting with Amazon S3.
 * Provides methods for common S3 operations such as uploading, downloading, and managing files.
 */
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  /**
   * Creates an instance of S3Service.
   * @param {S3ServiceConfig} config - The configuration options for the S3 service.
   */
  constructor(config: S3ServiceConfig) {
    const { region, credentials, bucketName } = config;
    this.s3Client = new S3Client({ region, credentials });
    this.bucketName = bucketName;
    this.region = region;
  }

  /**
   * Uploads a file to S3.
   * @param {File} file - The file to upload.
   * @param {string} filepath - The path where the file will be stored in S3.
   * @returns {Promise<string>} A promise that resolves to the URL of the uploaded file.
   */
  async uploadFile(file: File, filepath: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
      Body: buffer,
      ContentType: file.type,
    });

    await this.s3Client.send(command);
    return this.getFileUrl(filepath);
  }

  /**
   * Downloads a file from S3.
   * @param {string} filepath - The path of the file in S3.
   * @returns {Promise<Buffer>} A promise that resolves to the file content as a Buffer.
   * @throws {Error} If the file is empty or does not exist.
   */
  async downloadFile(filepath: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
    });

    const response = await this.s3Client.send(command);
    if (!response.Body) {
      throw new Error('File is empty or does not exist');
    }
    return Buffer.from(await response.Body.transformToByteArray());
  }

  /**
   * Deletes a file from S3.
   * @param {string} filepath - The path of the file to delete in S3.
   * @returns {Promise<void>}
   */
  async deleteFile(filepath: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
    });

    await this.s3Client.send(command);
  }

  /**
   * Lists files in a specific S3 directory.
   * @param {string} prefix - The prefix (directory) to list files from.
   * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
   */
  async listFiles(prefix: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: prefix,
    });

    const response = await this.s3Client.send(command);
    const contents: (string | undefined)[] = response.Contents?.map((file) => file.Key) || [];
    const returnValue: string[] = contents.filter((value) => value !== undefined);
    return returnValue;
  }

  /**
   * Generates a presigned URL for uploading a file directly to S3.
   * @param {string} filepath - The path where the file will be stored in S3.
   * @param {string} contentType - The MIME type of the file.
   * @param {number} [expiresIn=3600] - The number of seconds until the presigned URL expires.
   * @returns {Promise<string>} A promise that resolves to the presigned URL.
   */
  async getPresignedUploadUrl(filepath: string, contentType: string, expiresIn: number = 3600): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
      ContentType: contentType,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  /**
   * Generates a presigned URL for downloading a file directly from S3.
   * @param {string} filepath - The path of the file in S3.
   * @param {number} [expiresIn=3600] - The number of seconds until the presigned URL expires.
   * @returns {Promise<string>} A promise that resolves to the presigned URL.
   */
  async getPresignedDownloadUrl(filepath: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  /**
   * Checks if a file exists in S3.
   * @param {string} filepath - The path of the file to check in S3.
   * @returns {Promise<boolean>} A promise that resolves to true if the file exists, false otherwise.
   */
  async fileExists(filepath: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: filepath,
        })
      );
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'NotFound') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Retrieves metadata for a file in S3.
   * @param {string} filepath - The path of the file in S3.
   * @returns {Promise<{ [key: string]: string }>} A promise that resolves to an object containing the file's metadata.
   */
  async getFileMetadata(filepath: string): Promise<{ [key: string]: string }> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
    });

    const response = await this.s3Client.send(command);
    return response.Metadata || {};
  }

  /**
   * Copies a file within the S3 bucket.
   * @param {string} sourceFilepath - The path of the source file in S3.
   * @param {string} destinationFilepath - The path where the file will be copied to in S3.
   * @returns {Promise<void>}
   */
  async copyFile(sourceFilepath: string, destinationFilepath: string): Promise<void> {
    const command = new CopyObjectCommand({
      Bucket: this.bucketName,
      CopySource: `${this.bucketName}/${sourceFilepath}`,
      Key: destinationFilepath,
    });

    await this.s3Client.send(command);
  }

  /**
   * Gets the public URL for a file in S3.
   * @param {string} filepath - The path of the file in S3.
   * @returns {Promise<string>} A promise that resolves to the public URL of the file.
   */
  async getFileUrl(filepath: string): Promise<string> {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${filepath}`;
  }

  /**
   * Uploads a buffer to S3.
   * @param {Buffer} buffer - The buffer to upload.
   * @param {string} filepath - The path where the file will be stored in S3.
   * @param {string} [contentType='application/pdf'] - The MIME type of the file.
   * @returns {Promise<string>} A promise that resolves to the URL of the uploaded file.
   */
  async uploadBuffer(buffer: Buffer, filepath: string, contentType: string = 'application/pdf'): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filepath,
      Body: buffer,
      ContentType: contentType,
    });

    await this.s3Client.send(command);
    return this.getFileUrl(filepath);
  }
}
