import mongoose, { Document, Schema } from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../../utils/logger';
import process from 'process';

dotenv.config();

const { MONGODB_CONNECTION_STRING } = process.env;

if (!MONGODB_CONNECTION_STRING) {
    logger.error('MongoDB connection string not provided.');
    process.exit(1);
}

export interface KeyValue {
    key: string;
    value: string;
}

export interface UserStocks {
    username: string;
    financialCurrency: string;
    stockInfo: Array<KeyValue>;
    stockName: string;
    alertInfo: Array<KeyValue>;
}

export interface UserSchema extends UserStocks, Document {}

const userStockDetailSchemaModel = new mongoose.Schema({
    username: String,
    financialCurrency: String,
    stockInfo: [{ key: String, value: String }],
    alertInfo: [{ key: String, value: String }],
    stockName: String,
});

console.log(MONGODB_CONNECTION_STRING, 'String..');

mongoose.connect(MONGODB_CONNECTION_STRING)
    .then(() => {
        logger.info('Connected to MongoDB successfully');
    })
    .catch((error) => {
        logger.error('Error in MongoDB connection:', error);
        process.exit(1);
    });

const UserStockDetailsModel = mongoose.model<UserSchema>('stockDetails', userStockDetailSchemaModel, 'stockDetails');

export default UserStockDetailsModel;
