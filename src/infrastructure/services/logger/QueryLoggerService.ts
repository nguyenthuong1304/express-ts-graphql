import { AdvancedConsoleLogger } from 'typeorm';
import { Service } from 'typedi';

import { LoggerService } from './LoggerService';
import { loggerConstant } from '../../../config/logger.constant';
import { CurrentContext } from '../../../infrastructure/context/CurrentContext';

@Service()
export class QueryLogger extends AdvancedConsoleLogger {
  constructor(
    private readonly logger: LoggerService,
  ) {
    super(['log', 'warn', 'query', 'schema', 'migration']);
  }

  logQuery(query: string, parameters?: any[]) {
    const stringifyParams =
      parameters && parameters.length
        ? loggerConstant.parameterPrefix + JSON.stringify(parameters)
        : '';
    const sql = loggerConstant.queryPrefix + query + stringifyParams;
    this.logger.getLogger().info(
      sql,
      { context: CurrentContext.getId() ||
        loggerConstant.typeOrmFirstQuery },
    );
  }
}
