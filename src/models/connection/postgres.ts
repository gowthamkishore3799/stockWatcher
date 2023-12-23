import { DataSource } from "typeorm";
import process from "process";
import { userdetails } from "../entity/userDetails";
import logger from "../../utils/logger";

import * as dotenv from 'dotenv';
dotenv.config();

const { POSTGRES_HOST, POSTGRES_USERNAME, POSTGRES_HOST_password, POSTGRES_DATABASE } = process.env || {}



export async function getRepository(): Promise<DataSource | void> {
    const appDataSource = new DataSource({
        type: "postgres",
        host: POSTGRES_HOST,
        port: 5432,
        username: POSTGRES_USERNAME,
        password: POSTGRES_HOST_password,
        database: POSTGRES_DATABASE,
        synchronize: true,
        logging: true,
        subscribers: [],
        migrations: [],
        entitySkipConstructor: true,
        ssl: true,
        entities: [userdetails]
    });

    await appDataSource.initialize()
    logger.info('Connection has been established')
    return appDataSource;
}


