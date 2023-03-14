import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';

import { LoggerService } from '../../../infrastructure/services/logger/LoggerService';

const RequestLogger = (req: Request, _: Response, next: NextFunction) => {
  if (
    !isEmpty(req.body) &&
    req.body.operationName !== 'IntrospectionQuery'
  ) {
    const logger = new LoggerService();
    const asyncRequestContext = new AsyncLocalStorage();
    const requestId = v4();

    logger.getLogger().info(`OperationName: #${req.body.operationName}`, { context: requestId });
    logger.getLogger().info(
      `GraphQLQuery: ${JSON.stringify(req.body.query)}`,
      { context: requestId },
    );
    asyncRequestContext.enterWith(requestId);
  }

  next();
}

export default RequestLogger;