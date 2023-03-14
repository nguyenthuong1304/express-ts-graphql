import { env } from '../utils/env';
import { appConfig } from './app';

export const fileSystemsConfig = {
  defaultDisk: env('FILESYSTEM_DEFAULT_DISK', 'local'),

  disks: {
    local: {
      root: appConfig.appPath + '/public/uploads',
    },
  },
};
