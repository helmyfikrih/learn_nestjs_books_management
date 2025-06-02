import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1748848688793 implements MigrationInterface {
    name = 'InitDatabase1748848688793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "book" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "book" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "image"`);
    }

}
