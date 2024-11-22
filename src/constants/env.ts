/* eslint-disable n/no-process-env */
import { createEnv } from '@t3-oss/env-nextjs';
import { z, ZodError } from 'zod';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export const env = createEnv({
  server: {
    MONGODB_URI: z.string(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    NEXTAUTH_URL: z.string().url(),
    GMAIL_EMAIL: z.string().email(),
    GMAIL_PASS: z.string(),
    CONTACT_EMAIL_ADDRESS: z.string().email(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
    OPENAI_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.nativeEnum(Environment),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  },
  onValidationError: (error: ZodError) => {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    process.exit(1);
  },

  runtimeEnv: {
    // Server-side environment variables
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // Client-side environment variables
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    CONTACT_EMAIL_ADDRESS: process.env.CONTACT_EMAIL_ADDRESS,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  emptyStringAsUndefined: true,
});
