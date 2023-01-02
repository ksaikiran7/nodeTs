import * as Joi from 'joi';
import {validate} from './common';


export async function login(req: any, res: any, next: any) {
    const schema = Joi.object().keys({
        userName: Joi.string().required()
            .messages({
                'string.required': 'EmailId/mobileNumber/UserId required.',
            }),
        password: Joi.string().required().messages({
            'string.required': 'Password required.',
        }),

    });
    await validate(schema, req, res, next);
}

export async function logout(req:any, res:any, next:any) {
    const schema = Joi.object().keys({
        refreshToken: Joi.string().required().messages({
            'string.required': 'Refresh token required.',
        }),
    });
    await validate(schema, req, res, next);
}

export async function forgetPassword(req:any, res:any, next:any) {
    const schema = Joi.object().keys({
        userName: Joi.string().required().messages({
            'string.required': 'EmailId/mobileNumber/UserId required.',
        }),
    });
    await validate(schema, req, res, next);
}

export async function verifyOTP(req:any, res:any, next:any) {
    const schema = Joi.object().keys({
        token: Joi.string().required().messages({
            'string.required': 'Token required.',
        }),
        otp: Joi.string().required().messages({
            'string.required': 'OTP required.',
        }),
    });
    await validate(schema, req, res, next);
}


export async function updatePassword(req:any, res:any, next:any) {
    const schema = Joi.object().keys({
        token: Joi.string().required().messages({
            'string.required': 'Token required.',
        }),
        password: Joi.string().required().messages({
            'string.required': 'New Password required.',
        }),
    });
    await validate(schema, req, res, next);
}