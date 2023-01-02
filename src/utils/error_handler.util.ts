import {statusCodes} from '../constants/status_codes.constant';
import {IServiceResponse, ServiceResponse} from '../models';

const DEFAULT_ERROR_MESSAGE = 'Failed to handle the request.';

function getProductionErrorResponse(message:any) {
    return new ServiceResponse(message, null,
        true, [{
            INTERNAL_SERVER_ERROR: 'Internal server error.',
        }], ['Internal server error.']);
}

function getOtherErrorResponse(error:any, message:any) {
    return new ServiceResponse(message, null, true, error,
        [error.message]);
}

export function errorHandler(res: any, error: any, message: string = DEFAULT_ERROR_MESSAGE) {
    const errorResponse: IServiceResponse = process.env.ENVIRONMENT === 'prod' ? getProductionErrorResponse(message)
        : getOtherErrorResponse(error, message);
    const status = parseInt(error.errorCode) || error.status || statusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).send(errorResponse);
}
