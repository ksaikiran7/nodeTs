import {checkEnv, PORT} from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger.util';
import {sqlConnection} from './database';

import * as path from 'path';
import routes from './routes';
// import * as Authenticator from './middleware/authentication.middleware';
// import {startPaymentReminderCronJob} from './schedulars/payment_reminder';


logger.debug('confloaded:' + (checkEnv != null));
const app: express.Application = express();
const corsOptions = {
    origin: '*',
    methods: 'GET, OPTIONS, PUT, POST, DELETE',
};
const stream = {
    write: (message: string) => {
        logger.info(message);
    },
};

app.use(bodyParser.urlencoded({
    limit: '100mb', extended: true,
}));
app.use(bodyParser.json({
    limit: '100mb',
}));
const uploadPath = path.resolve('./public/');
app.use(express.static(uploadPath));
app.use('/public', express.static(uploadPath));
// app.use('/src/public', express.static(__dirname));
app.use(cors(corsOptions));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status ' +
    ':res[content-length]', {stream}));


//TODO: Change after implementing Autentication
// app.use(Authenticator.isAuthenticated);

(async () => {
    try {
        await checkEnv();
        await sqlConnection();
        //startPaymentReminderCronJob();
        app.use(routes);
        app.listen(PORT);
        logger.info(`GROCERY-API Server listening ports => ${PORT}`);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();