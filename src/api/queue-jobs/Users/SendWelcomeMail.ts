import { Job } from 'bull';

import { QueueJobBase } from '../../../infrastructure/abstracts/QueueJobBase';
import { MailService } from '../../../infrastructure/services/mail/MailService';

export class SendWelcomeMail extends QueueJobBase {
  /**
   * Create a new job instance.
   */
  public constructor(data: any) {
    super(data);
  }

  /**
   * Execute the job.
   */
  public async handle(job: Job) {
    const mailService = new MailService();
    const user = job.data;
    
    mailService.to(user.email)
      .text('Welcome to new member')
      .subject('Welcome to new member')
      .send();
  }
}
