import 'reflect-metadata';
import * as path from 'path';
import express from 'express';
import { buildSchema } from 'type-graphql';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import { createConnection, useContainer as typeormOrmUseContainer } from 'typeorm';
import { Container as containerTypeorm } from 'typeorm-typedi-extensions';
import { registerController as registerCronJobs, useContainer as cronUseContainer } from 'cron-decorators';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';

import { appConfig } from './config/app';
import { dbConfig } from './config/db';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { CurrentContextMiddleware } from './infrastructure/context/CurrentContext';
import RequestLogger from './infrastructure/middlewares/Application/RequestLogger';
import { formatGraphQLError } from './utils/error';

export class App {
  private app: express.Application = express();
  private port: Number = appConfig.port;

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.useContainers();
    await this.typeOrmCreateConnection();
    this.registerCronJobs();
    this.serveStaticFiles();
    this.setupMiddlewares();
    await this.setupGraphQL();
  }

  private useContainers() {
    typeormOrmUseContainer(containerTypeorm);
    cronUseContainer(Container);
  }

  private async typeOrmCreateConnection() {
    try {
      await createConnection(dbConfig);
    } catch (error) {
      console.log('Caught! Cannot connect to database: ', error);
    }
  }

  private registerCronJobs() {
    if (!appConfig.cronJobsEnabled) {
      return false;
    }

    registerCronJobs([__dirname + appConfig.cronJobsDir]);
  }

  private serveStaticFiles() {
    this.app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(RequestLogger);
    this.app.use(CurrentContextMiddleware);
  }

  private async setupGraphQL() {
    if (!appConfig.graphqlEnabled) {
      return false;
    }

    const schema = await buildSchema({
      resolvers: [__dirname + appConfig.resolversDir],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
      container: Container,
    });

    const httpServer = http.createServer(this.app);
    const server = new ApolloServer({
      schema,
      introspection: true,
      formatError: formatGraphQLError(),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({ app: this.app });

    httpServer.listen(this.port);
  }
}

new App();
