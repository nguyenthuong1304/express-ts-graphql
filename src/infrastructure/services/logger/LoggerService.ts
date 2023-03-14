import { Service } from 'typedi';
import { Logger, createLogger, format, transports } from 'winston';
import { hostname } from 'os';
import { red, green } from 'cli-color';
import { PlatformTools } from 'typeorm/platform/PlatformTools';

import { loggerConstant } from '../../../config/logger.constant';

const formatted = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: process.env.TZ,
  });
};

@Service()
export class LoggerService {
  private logger: Logger;
  
  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: formatted }),
            process.env.NODE_ENV === 'development' 
              ? this.loggerFormatWithColor() 
              : this.loggerFormatWithoutColor(),
          ),
        }),
      ],
    });
  }

  public getLogger(): Logger {
    return this.logger;
  }

  private loggerFormatWithColor() {
    return format.printf(
      ({ context, level, timestamp, message }): string => {
        const hostName = `[${hostname()}]`;
        timestamp = `[${timestamp}]`;
    
        switch (level) {
          case loggerConstant.infoLevel:
            level = green(`[${level.toUpperCase()}]`);
            context = green(`[${context}]`);
    
            if (message.startsWith(loggerConstant.queryPrefix)) {
              message = PlatformTools.highlightSql(message);
            }
            break;
          case loggerConstant.errorLevel:
            level = red(`[${level.toUpperCase()}]`);
            context = red(`[${context}]`);
            break;
        }
    
        return `${level}\t${hostName}\t${timestamp}\t${context}\t${message}`;
      },
    );
  }
  
  private loggerFormatWithoutColor() {
    return format.printf(
      ({ context, level, timestamp, message }): string => {
        const hostName = `[${hostname}]`;
        timestamp = `[${timestamp}]`;
        level = `[${level.toUpperCase()}]`;
        context = `[${context}]`;
    
        return `${level}\t${hostName}\t${timestamp}\t${context}\t${message}`;
      },
    );
  }
}