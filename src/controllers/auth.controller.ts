import * as authService from '../services/auth.service';
import logger from '../utils/logger.util';
import {errorHandler} from '../utils/error_handler.util';
import {IServiceResponse} from '../models';

export async function login(req :any, res:any) {
    try {
        const authResponse: IServiceResponse = await authService.loginUser(req.body);
        res.status(200).send(authResponse);
    } catch (error) {
        logger.info('error occurred in login()=>');
        logger.error(error);
        errorHandler(res, error, 'Failed to login.');
    }
}

export async function logout(req :any, res:any) {
    try {
        const authResponse: IServiceResponse = await authService.logoutUser(req.body);
        res.status(200).send(authResponse);
    } catch (error) {
        logger.info('error occurred in logout()=>');
        logger.error(error);
        errorHandler(res, error, 'Failed to logout.');
    }
}

export async function forgetPassword(req :any, res:any) {
    try {
        const authResponse: IServiceResponse = await authService.forgetPassword(req.body);
        res.status(200).send(authResponse);
    } catch (error) {
        logger.info('error occurred in forgetPassword()=>');
        logger.error(error);
        errorHandler(res, error, 'Failed to send OTP.');
    }
}

export async function verifyOTP(req :any, res:any) {
    try {
        const authResponse: IServiceResponse = await authService.verifyOTP(req.body);
        res.status(200).send(authResponse);
    } catch (error) {
        logger.info('error occurred in verifyOTP()=>');
        logger.error(error);
        errorHandler(res, error, 'Failed to verify OTP.');
    }
}

export async function updateUserPassword(req :any, res:any) {
    try {
        const authResponse: IServiceResponse = await authService.updateUserPassword(req.body);
        res.status(200).send(authResponse);
    } catch (error) {
        logger.info('error occurred in verifyOTP()=>');
        logger.error(error);
        errorHandler(res, error, 'Failed to Update User Password.');
    }
}