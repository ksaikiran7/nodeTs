import logger from './logger.util';
import {forEach, camelCase, isPlainObject, isArray} from 'lodash';

function formCamelCaseForArray(data:any) {
    return data.map(toCamelCase);
}

export function toCamelCase(object:any) {
    const camelCaseObject ={};
    try {
        if (Array.isArray(object)) {
            return formCamelCaseForArray(object);
        } else if (!isNaN(object)) {
            return object;
        }
        forEach(object,
            (value, key, i) => {
                if (isPlainObject(value)) {
                    value = toCamelCase(value);
                } else if (isArray(value)) {
                    value = formCamelCaseForArray(value);
                }
                (camelCaseObject as any)[camelCase(key)] = value;
            });
        return camelCaseObject;
    } catch (error) {
        logger.error('ERROR in toCamelCase()');
        logger.error(error);
        return object;
    }
}

