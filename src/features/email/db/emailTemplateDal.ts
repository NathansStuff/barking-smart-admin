import connectMongo, { dbConnector } from '@/features/database/lib/mongodb';
import { WrapWithConnection } from '@/features/database/service/WrapWithConnection';
import { EmailTemplate, EmailTemplateWithId } from '@/features/email/types/EmailTemplate';

import { EmailTemplateModel } from './emailTemplateModel';

const baseEmailTemplateDal = {
  async create(emailTemplate: EmailTemplate): Promise<EmailTemplateWithId> {
    const result = await EmailTemplateModel.create(emailTemplate);
    return result;
  },

  async getAll(
    filter = {},
    skip = 0,
    limit = 10
  ): Promise<{
    emailTemplates: EmailTemplateWithId[];
    total: number;
  }> {
    await connectMongo();
    const [emailTemplates, total] = await Promise.all([
      EmailTemplateModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      EmailTemplateModel.countDocuments(filter),
    ]);
    const total2 = await EmailTemplateModel.find();
    console.log(total2);
    return { emailTemplates, total };
  },

  async getById(id: string): Promise<EmailTemplateWithId | null> {
    return await EmailTemplateModel.findById(id);
  },

  async update(id: string, emailTemplate: Partial<EmailTemplate>): Promise<EmailTemplateWithId | null> {
    return await EmailTemplateModel.findByIdAndUpdate(id, { $set: emailTemplate }, { new: true });
  },

  async delete(id: string): Promise<EmailTemplateWithId | null> {
    return await EmailTemplateModel.findByIdAndDelete(id);
  },
};

export const EmailTemplateDal = WrapWithConnection(baseEmailTemplateDal, dbConnector);
