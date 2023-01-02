import * as JoiBase from 'joi';

import logger from '../utils/logger.util';
import {APIError, IAPIError, IServiceResponse, ServiceResponse} from '../models';

const Joi = require('joi').extend(require('@joi/date'));

export function addressSchema() {
    return Joi.object().keys({
        addressLine1: Joi.string().allow('', null),
        addressLine2: Joi.string().allow('', null),
        zipcode: pincodeValidation.allow('', null),
        state: Joi.string().required()
            .messages({
                'any.required': 'State required.',
            }),
        district: Joi.string().required()
            .messages({
                'any.required': 'District is required.',
            }),
        city: Joi.string().required()
            .messages({
                'any.required': 'City is required.',
            }),
    });
}

export const dateSchema = Joi.date().format(['YYYY/MM/DD', 'YYYY-MM-DD']);
export const isoDate = () => {
    return Joi.date().format('YYYY-MM-DD');
};
export const customIdsType = Joi.string().pattern(/^[0-9]+(,[0-9]+)*$/);
export const mobileNumberValidation = Joi.string().min(10).pattern(/^\+?([0-9]{1,3})?-?\s?[1-9]{1}[0-9]{9}$/);
export const pincodeValidation = Joi.string().pattern(/^[0-9]{6}$/);
export const landLineValidation = Joi.string().min(11).pattern(/^\+?[0-9]{3,5}-?\s?[0-9]{7,10}$/);
export const emailValidation = Joi.string().min(11).pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const validate = async (schema: JoiBase.ObjectSchema<any>, req: { params: any; query: any; method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: IServiceResponse): void; new(): any; }; }; }, next: () => void) => {
    logger.info('START of common.validator.validate()');
    schema = schema.append({
        token: Joi.string().allow(''),
    });
    let body = Object.assign({}, req.params, req.query);
    if (req.method === 'POST' || req.method === 'PUT') {
        body = Object.assign(body, req.body);
    }
    const result = await schema.validate(body, {abortEarly: false});
    if (result.error) {
        logger.debug(JSON.stringify(result));
        const errorResponse = buildUsefulErrorObject(result);
        res.status(422).send(errorResponse);
    } else {
        next();
    }
};

const buildUsefulErrorObject = (errors: any): IServiceResponse => {
    const usefulErrors: IAPIError[] = [];
    const errorMsgs: string[] = errors.error.message.split('. ');
    for (const error of errors.error.details) {
        if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
            usefulErrors.push(new APIError(error.message, error.type, error.path.join('_')));
        } else {
            logger.debug('missed error:' + error);
        }
    }
    return new ServiceResponse('Please fill all Mandatory fields with valid values!.', null,
        true, usefulErrors, errorMsgs);
};
