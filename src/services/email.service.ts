import * as nodeMailer from 'nodemailer';
import logger from '../utils/logger.util';
import {SENDER_EMAIL_ID, SENDER_EMAIL_PASSWORD} from '../config';


let transport :any;

export async function createTransport() {
    try {
        if (transport) {
            return transport;
        }
        transport = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: SENDER_EMAIL_ID,
                pass: SENDER_EMAIL_PASSWORD,
            },
        });
        return transport;
    } catch (error) {
        logger.error('Error occurred in createTransport()');
        logger.error(error);
        throw error;
    }
}
export async function sendmail(payload: any) {
    try {
        const mailOptions: any = {
            from: SENDER_EMAIL_ID,
            to: payload.email,
            subject: payload.subject,
            html: payload.html,
        };
        const transporter = await createTransport();
        transporter.sendMail(mailOptions)
            .then((data:any) => {
                logger.info(JSON.stringify(data));
                return;
            })
            .catch((error:any) => {
               
                throw error;
            });
    } catch (error) {
        logger.error('Error occurred in sendmail()');
        logger.error(error);
        throw error;
    }
}
export async function sendForgetPasswordEmail(payload:any) {
    try {
        logger.debug('SEND EMAIL of Forget password');
        const name = payload.firstName + ((payload.lastName) ? ' ' + payload.lastName : '');
        payload.subject = 'ALERT: Reset password';
        payload.html = `<p>Dear ${name},</p>
        <p>Seems like you forgot your password for Grocery Store. If so, please use below otp to reset the password.</p>
        <p><b>OTP: ${payload.otp}</b></p>
        <b><b></b>Note: </b> Do not share this OTP with anyone.</p>
        <p>If you did not forget your password, you may please ignore this email.</p>
        <p><b>Thanks & Regards</b></p>
        <p>Admin Team</p>`;
        return sendmail(payload);
    } catch (error) {
        logger.error('Error occurred in sendForgetPasswordEmail() service');
        logger.error(error);
        throw error;
    }
}