
import * as mailService from './email.service';
import logger from '../utils/logger.util';

export async function sendForgetPasswordNotification(payload:any) {
    try {
        mailService.sendForgetPasswordEmail(payload).catch((error:any) => {
            throw error;
        });
        // smsService.sendForgetPasswordOTP(payload).catch((error) => {
        //     throw error;
        // });
    } catch (error) {
        logger.debug(`Error occurred in sendForgetPasswordNotification`);
        logger.error(error);
        throw error;
    }
}