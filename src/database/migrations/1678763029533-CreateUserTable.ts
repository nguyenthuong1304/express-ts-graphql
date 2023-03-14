import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1678763029533 implements MigrationInterface {
  name = 'CreateUserTable1678763029533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated" TIMESTAMP(3) NOT NULL DEFAULT now(), "created" TIMESTAMP(3) NOT NULL DEFAULT now(), "deleted" TIMESTAMP(3), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ae7b5c71de5f255b5fc800d2e3" ON "users" ("email") WHERE deleted IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_ae7b5c71de5f255b5fc800d2e3"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
