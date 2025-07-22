import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContact1753168744630 implements MigrationInterface {
    name = 'CreateContact1753168744630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "contact" (
                "id" SERIAL NOT NULL,
                "phoneNumber" character varying,
                "email" character varying,
                "linkedId" integer,
                "linkPrecedence" character varying NOT NULL DEFAULT 'primary',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "contact"
        `);
    }

}
