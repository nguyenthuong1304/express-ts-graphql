import { env } from '../utils/env';

export const mailConfig = {
  provider: env('MAIL_DRIVER'),
  host: env('MAIL_HOST'),
  port: Number(env('MAIL_PORT')),
  authUser: env('MAIL_USERNAME'),
  authPassword: env('MAIL_PASSWORD'),
  fromName: env('MAIL_FROM_ADDRESS'),
};
