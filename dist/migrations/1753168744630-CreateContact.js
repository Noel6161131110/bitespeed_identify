"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact1753168744630 = void 0;
class CreateContact1753168744630 {
    constructor() {
        this.name = 'CreateContact1753168744630';
    }
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "contact"
        `);
    }
}
exports.CreateContact1753168744630 = CreateContact1753168744630;
