export const loggerConstant = {
  fileName: `${process.env.NODE_ENV}-%DATE%.log`,
  storageDirname: 'logs',
  maxFiles: 365,
  infoLevel: 'info',
  errorLevel: 'error',
  queryPrefix: 'Query: ',
  parameterPrefix: ' -- PARAMETERS: ',
  queryLogLevels: ['log', 'warn', 'query', 'schema', 'migration'],
  success: 'Complete 200 OK',
  badRequest: 'Completed 400 Bad Request',
  notFound: 'Completed 404 Not Found',
  pageNotFound: 'Completed 404 Page Not Found',
  forbidden: 'Completed 403 Forbidden',
  unauthorized: 'Completed 401 Unauthorized',
  introspectionQuery: 'IntrospectionQuery',
  typeOrmFirstQuery: 'TypeOrmFirstQuery',
  backgroundJobContext: 'BackgroundJob',
};