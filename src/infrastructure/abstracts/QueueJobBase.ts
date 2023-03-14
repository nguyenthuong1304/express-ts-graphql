import Queue, { JobOptions } from 'bull';
import { appConfig } from '../../config/app';

export abstract class QueueJobBase {
  private queue: Queue.Queue;
  private readonly jobName: string = (<any>this).constructor.name;
  private jobOptions: JobOptions;
  private data: any;

  abstract handle(job: any): Promise<any>;

  public constructor(data: any) {
    this.data = data;
  }

  public process() {
    this.queue = new Queue(this.jobName, {
      redis: appConfig.redis,
    });

    this.queue.add(this.jobName, this.data, this.jobOptions);
    this.queue.process(this.jobName, this.handle);
    this.queue.on('completed', this.onCompleted);
    this.queue.on('failed', this.onFailed);
  }

  public setOptions(jobOptions: JobOptions): this {
    this.jobOptions = jobOptions;

    return this;
  }

  public dispatch() {
    this.process();
  }

  public onCompleted(_: any): any {}

  public onFailed(_: any): any {}
}
