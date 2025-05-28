import { config } from "dotenv";
import { DataSource } from "typeorm";

config()

export default new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_DEV_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    entities: ['dist/**/entities/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*{.ts,.js}']
})