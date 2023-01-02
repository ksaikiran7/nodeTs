import logger from './logger.util';
import {sqlConnection} from '../database';
import {toCamelCase} from './sql_response_formatter.util';
import {APIError} from '../models';
import {errorCodes} from '../constants/error_codes.constant';
import nodeUtil from 'util';


export async function executeQuery(query: string, type: string, replacements = {}, transaction = null,
                                   camelCaseColumns: boolean = true): Promise<any> {
    const connection = sqlConnection();
    try {
        logger.debug('QUERY: ' + query);
        logger.debug('REPLACEMNT: ' + nodeUtil.inspect(replacements));
        if (camelCaseColumns) {
            return toCamelCase(await connection.query(query, {
                replacements,
                type,
                transaction,
            }));
        } else {
            return await connection.query(query, {
                replacements,
                type,
                transaction,
            });
        }
    } catch (e) {
        logger.error(`ERROR in executeQuery() => ${e}`);
        throw e;
    }
}

export function getRecord(dbResultsArray: any, debugMsg: string) {
    if (Array.isArray(dbResultsArray)) {
        if (dbResultsArray.length == 0) {
            return null;
        } else if (dbResultsArray.length == 1) {
            return dbResultsArray[0];
        } else {
            throw(new APIError('More than one record found for ' + debugMsg, errorCodes.BAD_REQUEST, debugMsg));
        }
    }
}
