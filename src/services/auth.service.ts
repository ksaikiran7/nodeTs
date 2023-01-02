import {unionBy} from 'lodash';
import logger from '../utils/logger.util';
import {comparePasswords, generateRandomOTP, hashPassword} from '../utils/password.util';
import {generateAccessToken, generateRefreshToken, verifyRefreshToken} from '../utils/auth.util';
import {AuthData} from '../mySql';
import {APIError, IUserActivity, ServiceResponse, UserActivityModel} from '../models';
import {errorCodes} from '../constants/error_codes.constant';
import { DEFAULT_FORGET_PASSWORD_TYPE, DEFAULT_LOGIN_AUTH_TYPE, DEFAULT_OTP_EXPIRY_TIME, DEFAULT_RESEND_OTP_COUNT } from '../constants/default.constant';
import {sendForgetPasswordNotification} from './notification.service';



export async function loginUser(payload: any,) {
    
    try {
        const user = await AuthData.getUser(payload);
        if (!user) {
            throw new APIError('Given credentials is do not match with any account.', errorCodes.BAD_REQUEST,
                'userName');
        }
        const isPasswordMatch = await comparePasswords(user.password, payload.password);
        if (!isPasswordMatch) {
            throw new APIError('Invalid credentials.', errorCodes.BAD_REQUEST, 'password');
        }
        delete (user.password);
        const authPayload = {
            userId: user.userId,
            userName: user.firstName + ' ' + (user.lastName || ''),
        };
        const accessToken = await generateAccessToken(authPayload);
        const refreshToken = await generateRefreshToken(authPayload);
        await AuthData.saveAuthorizationTokens({
            userId: user.userId,
            accessToken: accessToken,
            refreshToken: refreshToken,
            type: 'LOGIN',
            createdDate: new Date(),
            updatedDate: new Date(),
        });
      
        const responseData = {
            accessToken,
            refreshToken,
            user,
        };
        return new ServiceResponse('Login successful ,', responseData, false,
            {}, []);
    } catch (error) {
        logger.info('Error occurred in loginUser()');
        logger.error(error);
        throw error;
    }
}

export async function logoutUser(payload:any) {
    try {
        const refreshToken = payload.refreshToken;
        await AuthData.deleteAuthorizationToken(refreshToken, DEFAULT_LOGIN_AUTH_TYPE);

        return new ServiceResponse('Logout successful.', {}, false,
            {}, []);
    } catch (error) {
        logger.info('Error occurred in logoutUser()');
        logger.error(error);
        throw error;
    }
}

async function checkUserExistSendOtpCount(userId:any) {
    try {
        const date = new Date();
        const startAt = new Date(date.setHours(date.getHours() - 1));
        const endAt = new Date();
        const otpCount = await AuthData.getOtpCount(userId, DEFAULT_FORGET_PASSWORD_TYPE, startAt, endAt);
        if (otpCount.count >= DEFAULT_RESEND_OTP_COUNT) {
            throw new APIError('Your OTP limit exceeded. Please try after some time.', errorCodes.BAD_REQUEST,
                'otp');
        }
        return;
    } catch (error) {
        logger.info('Error occurred in checkUserExistSendOtpCount()');
        logger.error(error);
        throw error;
    }
}

export async function forgetPassword(payload:any) {
    try {
        const user = await AuthData.getUser(payload);
        if (!user) {
            throw new APIError('User Does not exist.', errorCodes.DOES_NOT_EXIST, 'userName');
        }
        //await checkUserExistSendOtpCount(user.userId);
        const otp = generateRandomOTP();
        const userOtpData = {
            userId: user.userId,
            otp: otp,
            type: DEFAULT_FORGET_PASSWORD_TYPE,
            createdDate: new Date(),
        };
        await AuthData.saveUserOTP(userOtpData);
        user.otp = otp;
        sendForgetPasswordNotification(user).catch((error:any) => {
            logger.error(`ERROR occurred in send forget password notifications. ${error}`);
        });
        const token = await generateRefreshToken({userId: user.userId}, DEFAULT_OTP_EXPIRY_TIME);
        return new ServiceResponse('Successfully sent OTP to your Email/Phone.', {token}, false,
            {}, []);
    } catch (error) {
        logger.info('Error occurred in forgetPassword()');
        logger.error(error);
        throw error;
    }
}

export async function verifyOTP(payload:any) {
    try {
        const decode: any = await verifyRefreshToken(payload.token);
        const userOTP = await AuthData.getUserOTP(decode.userId, payload.otp);
        if (!userOTP) {
            throw new APIError('Invalid OTP.', errorCodes.DOES_NOT_EXIST, 'otp');
        }
        await AuthData.deleteUserOTP(decode.userId, DEFAULT_FORGET_PASSWORD_TYPE);

        decode.isVerified = true;
        delete decode.exp;
        delete decode.iat;
        const token = await generateRefreshToken(decode, DEFAULT_OTP_EXPIRY_TIME);
        return new ServiceResponse('OTP verification Successfully.', {token}, true,
            {}, []);
    } catch (error:any) {
        logger.info('Error occurred in verifyOTP()');
        logger.error(error);
        if (error.message === 'jwt expired') {
            error = new APIError('OTP time expired. Please use valid OTP.', errorCodes.DOES_NOT_EXIST, 'otp');
        }
        throw error;
    }
}

export async function updateUserPassword(payload:any) {
    try {
        const decode: any = await verifyRefreshToken(payload.token);
        if (decode.isVerified) {
            const plainPassword = payload.password.trim();
            const hashedPassword = await hashPassword(plainPassword);
            const dataToUpdate = {
                userId: decode.userId,
                password: hashedPassword,
                updatedDate: new Date(),
            };
            await AuthData.updateUserPassword(decode.userId, dataToUpdate);
            return new ServiceResponse('Password updated successfully.', {}, true,
                {}, []);
        }

        throw new APIError('Invalid token.', errorCodes.BAD_REQUEST, 'token');
    } catch (error:any) {
        logger.info('Error occurred in verifyOTP()');
        logger.error(error);
        if (error.message === 'jwt expired') {
            error = new APIError('Set password time expired.', errorCodes.DOES_NOT_EXIST, 'token');
        }
        throw error;
    }
}











