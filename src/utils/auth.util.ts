import jsonwebtoken from 'jsonwebtoken';
import {JWT_SECRET, REFRESH_TOKEN_SECRET} from '../config';
import logger from './logger.util';
import {DEFAULT_LOGIN_TOKEN_EXPIRY_TIME, DEFAULT_REFRESH_TOKEN_EXPIRY_TIME} from '../constants/default.constant';

const generateJWT = (payload: object, secret: jsonwebtoken.Secret, expiresIn: number) => {
    return jsonwebtoken.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn,
    });
};

export async function generateAccessToken(payload: object) {
    try {
        return generateJWT(payload, JWT_SECRET, DEFAULT_LOGIN_TOKEN_EXPIRY_TIME);
    } catch (e) {
        logger.error(`ERROR in login generateAccessToken() => ${e}`);
    }
}

export async function generateRefreshToken(payload: object, expiresIn: number = DEFAULT_REFRESH_TOKEN_EXPIRY_TIME) {
    try {
        return generateJWT(payload, REFRESH_TOKEN_SECRET, expiresIn);
    } catch (e) {
        logger.error(`ERROR in login generateRefreshToken() => ${e}`);
    }
}

export const verifyJWT = async (token: string) => {
    return jsonwebtoken.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = async (token: string) => {
    return jsonwebtoken.verify(token, REFRESH_TOKEN_SECRET);
};
