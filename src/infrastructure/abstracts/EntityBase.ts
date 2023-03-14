import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { appConfig } from '../../config/app';

export abstract class EntityBase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ precision: appConfig.entityConstant.timePrecision })
  updated: Date;

  @CreateDateColumn({ precision: appConfig.entityConstant.timePrecision })
  created: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    precision: appConfig.entityConstant.timePrecision,
  })
  deleted: Date;
}
