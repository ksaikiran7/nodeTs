import {APIError} from '../index';
import {HttpStatusCodes} from '../../constants/http_codes.constant';

export interface IServiceResponse {
    message: string;
    data: any;
    showMessage: boolean;
    errors?: any;
    errorMessages?: string[];

    addError?(apiError: APIError): any;

    addServerError?(errorMessage: string): any;

}

export class ServiceResponse implements IServiceResponse {
    public message: string;
    public data: any;
    public showMessage: boolean;
    public errors?: any;
    public errorMessages?: string[];
    public statusCode?: number;

    constructor(message: string, data: any, showMessage: boolean, errors?: any, errorMessages?: string[],
                statusCode?: number) {
        this.message = message;
        this.data = data;
        this.showMessage = showMessage;
        this.errors = errors;
        this.errorMessages = errorMessages;
        this.statusCode = statusCode;

    }

    public addError(apiError: APIError): any {
        if (!this.errors) {
            this.errors = [];
        }
        this.errors.push(apiError);
    }

    public addServerError(errorMessage: string, responseMessage?: string): any {
        this.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
        this.message = responseMessage || errorMessage;
        this.addError(new APIError(errorMessage || 'Failed to process the request due to technical difficulties'
            , 'Internal server error'));
    }

}