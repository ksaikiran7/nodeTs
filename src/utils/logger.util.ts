import path from 'path';
import {createLogger, format, transports} from 'winston';
// tslint:disable-next-line:no-import-side-effect
import 'winston-daily-rotate-file';

// tslint:disable-next-line:no-require-imports no-var-requires
const process = require('process');

const objectifyError = format((info: any, error?: any) => {
    if (info.message instanceof Error) {
        info = Object.assign({
            message: info.message.message,
            stack: info.message.stack,
        }, info.message);
    }

    if (info instanceof Error) {
        info = Object.assign({
            message: info.message,
            stack: info.stack,
        }, info);
    }

    return info;
});

const printf = (info: any) => {
    return `${info.timestamp} [${info.level}]: ${info.message} ${info.stack ? -info.stack : ''}`;
};

const logger = createLogger({
    exitOnError: false,
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        objectifyError(),
        format.label({
            label: path.basename(process.mainModule ? process.mainModule.filename : ''),
        }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(printf),
    ),
    silent: process.env.NODE_ENV === 'test',
    transports: [
        new transports.Console({
            format: format.combine(
                objectifyError(),
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf(printf),
            ),
        }),
        new transports.DailyRotateFile({
            filename: path.resolve('./logs', 'iaex-api-%DATE%.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '15d',
        }),
    ],
});

export default logger;
