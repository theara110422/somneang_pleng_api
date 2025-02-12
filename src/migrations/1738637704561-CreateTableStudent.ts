import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableStudent1738637704561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExised = await queryRunner.hasTable('student');
        if(isExised){
            return
        } 

        await queryRunner.query(`
            CREATE TABLE student (
                id CHAR(36) NOT NULL PRIMARY KEY,
                gender VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                date_register DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                user_id CHAR(36) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`);
    }

}
