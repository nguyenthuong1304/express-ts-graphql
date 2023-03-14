import { IncomingMessage } from 'http';

import { v4 } from 'uuid';
import { Namespace, createNamespace, getNamespace } from 'cls-hooked';

export class CurrentContext {
  public static nameSpaceId = v4();
  public readonly id: string;
  public request: IncomingMessage;
  public response: Response;

  constructor(request: IncomingMessage, response: Response) {
    this.id = v4();
    this.request = request;
    this.response = response;
  }

  public static getId(): string {
    const requestContext = CurrentContext.getCurrentContext();

    return requestContext && requestContext.id;
  }

  public static getVersion(): number {
    const request: any = this.getRequest();

    return request && request.version;
  }

  public static getRequest(): IncomingMessage {
    const requestContext = CurrentContext.getCurrentContext();

    return requestContext && requestContext.request;
  }

  public static getCurrentContext(): CurrentContext {
    const session = getNamespace(CurrentContext.nameSpaceId);
    return session && session.get(CurrentContext.name);
  }

  public static exitContext(seq = 1): void {
    if (seq < 3) {
      try {
        const session = getNamespace(CurrentContext.nameSpaceId);
        session && session.enter(() => {
          session.exit(session.active.currentContext);
        });
      } catch (e) {
        return this.exitContext(++seq);
      }
    }
  }
}

export function CurrentContextMiddleware(req, res, next) {
  const currentContext = new CurrentContext(req, res);
  const session: Namespace = getNamespace(CurrentContext.nameSpaceId) || createNamespace(CurrentContext.nameSpaceId);
  session.run(() => {
    session.bindEmitter(req);
    session.bindEmitter(res);
    session.set(CurrentContext.name, currentContext);

    next();
  });
}
