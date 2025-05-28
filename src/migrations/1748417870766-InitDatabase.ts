import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1748417870766 implements MigrationInterface {
    name = 'InitDatabase1748417870766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_stores_store" ("bookId" integer NOT NULL, "storeId" integer NOT NULL, CONSTRAINT "PK_a0baff59154e6752ae3fbdac796" PRIMARY KEY ("bookId", "storeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_198dd33d328a5d14dbcde7c803" ON "book_stores_store" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_640ddb3ffc4d5054b7d56c9c8c" ON "book_stores_store" ("storeId") `);
        await queryRunner.query(`ALTER TABLE "book_stores_store" ADD CONSTRAINT "FK_198dd33d328a5d14dbcde7c8038" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_stores_store" ADD CONSTRAINT "FK_640ddb3ffc4d5054b7d56c9c8cd" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_stores_store" DROP CONSTRAINT "FK_640ddb3ffc4d5054b7d56c9c8cd"`);
        await queryRunner.query(`ALTER TABLE "book_stores_store" DROP CONSTRAINT "FK_198dd33d328a5d14dbcde7c8038"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_640ddb3ffc4d5054b7d56c9c8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_198dd33d328a5d14dbcde7c803"`);
        await queryRunner.query(`DROP TABLE "book_stores_store"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "store"`);
    }

}
