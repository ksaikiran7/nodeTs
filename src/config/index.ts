import * as path from 'path';

import { config } from 'dotenv';
import { existsSync, mkdirSync } from 'fs';

config({ path: path.resolve(__dirname, '../../.env') });
export const PORT = process.env.PORT || 5200;
export const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'jwttoken';
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshToken';
export const SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID || '';
export const SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
export const SMS_SENDER_USER_NAME = process.env.SMS_SENDER_USER_NAME || '';
export const SMS_SENDER_PASSWORD = process.env.SMS_SENDER_PASSWORD || '';
export const SMS_SENDER_ID = process.env.SMS_SENDER_ID || '';

export const MYSQL_DATABASE = {
    address: process.env.SQL_DATABASE_ADDRESS || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.SQL_DATABASE_USERNAME || 'root',
    password: process.env.SQL_DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME || 'grocery_store',
    
};

export function checkEnv() {
    return new Promise(((resolve, reject) => {  
        const mandatoryFields = ['SQL_DATABASE_ADDRESS', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD'];
        mandatoryFields.forEach(field => {
            if (!process.env[field]) {
                reject(`${field} is missing`);
            }
        });
        resolve("Success")
    }));
}
