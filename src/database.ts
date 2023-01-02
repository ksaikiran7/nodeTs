import {MYSQL_DATABASE} from './config';
import {Sequelize} from 'sequelize';
import logger from './utils/logger.util';

let connection :any ;

export const sqlConnection = () => {

    logger.info('START of database.sqlConnection()' + `${JSON.stringify(MYSQL_DATABASE)}`);
    try {
        if (connection) {
            return connection;
        }
        logger.info('Establish new SQL CONNECTION');
        connection = new Sequelize(MYSQL_DATABASE.db_name, MYSQL_DATABASE.username, MYSQL_DATABASE.password, {
            dialect: 'mysql',
            host: MYSQL_DATABASE.address,
            port: + MYSQL_DATABASE.port,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: (msg) => (process.env.ENABLE_DB_LOGGING == 'TRUE') ? logger.info(msg) : false,
        });
        return connection;
    } catch (e) {
        throw e;
    }
};
