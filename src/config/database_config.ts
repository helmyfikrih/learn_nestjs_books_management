import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = registerAs('database',
    (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: process.env.DATABASE_DEV_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '5432'),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
    })
)