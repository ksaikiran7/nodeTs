import {executeQuery, getRecord} from '../../utils/sql.query.util';
import {QueryTypes} from 'sequelize';
import log from '../../utils/logger.util';

export async function getUser(payload: any) {
    try {
        const sqlQuery = `select user_id as userId, user_first_name as firstName, user_last_name as lastName, user_email as email,user_password as password, user_mobile_number as mobileNumber from users where user_email=:userName or user_mobile_number=:userName `;
       
        const result = await executeQuery(sqlQuery, QueryTypes.SELECT, {
            userName: payload.userName,
        });
        return getRecord(result, 'getUser');
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.getUser()');
        log.error(error);
        throw error;
    }
}

export async function saveAuthorizationTokens(payload: any) {
    try {
        const sqlQuery = `insert into authorization_token(id,access_token,refresh_token,type,
        created_date,updated_date) values(:userId,:accessToken,:refreshToken,:type,:createdDate,:updatedDate)`;

        return await executeQuery(sqlQuery, QueryTypes.INSERT, payload);
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.saveAuthorizationTokens()');
        log.error(error);
        throw error;
    }
}

export async function getUserAccessToken(userId: number, accessToken: string) {

    
    try {
        const sqlQuery = `select user_id from authorization_token where user_id=:userId
        and access_token =:accessToken`;

        const result = await executeQuery(sqlQuery, QueryTypes.SELECT, {
            userId: userId,
            accessToken: accessToken,
        });

        return getRecord(result, 'getUserAccessToken');
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.getUserAccessToken()');
        log.error(error);
        throw error;
    }
}

export async function deleteAuthorizationToken(refreshToken: string, type: string) {
    try {
        const sqlQuery = `delete from authorization_token where refresh_token=:refreshToken and type=:type`;

        return await executeQuery(sqlQuery, QueryTypes.DELETE, {
            refreshToken: refreshToken,
            type: type,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.deleteAuthorizationToken()');
        log.error(error);
        throw error;
    }

}

export async function saveUserOTP(payload: any) {
    try {
        const sqlQuery = `insert into authorization_token(id,access_token,type,created_date)
        values(:userId,:otp,:type,:createdDate)`;

        return await executeQuery(sqlQuery, QueryTypes.INSERT, payload);
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.saveUserOTP()');
        log.error(error);
        throw error;
    }

}

export async function getUserOTP(userId: number, otp: string) {
    try {
        const sqlQuery = `select * from authorization_token where id=:userId and access_token=:otp`;
        const result = await executeQuery(sqlQuery, QueryTypes.SELECT, {
            userId: userId,
            otp: otp,
        });

        return getRecord(result, 'getUserOTP');
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.getUserOTP()');
        log.error(error);
        throw error;
    }
}

export async function deleteUserOTP(userId: number, type: string) {
    try {
        const sqlQuery = `delete from authorization_token where id=:userId and type=:type`;

        return await executeQuery(sqlQuery, QueryTypes.DELETE, {
            userId: userId,
            type: type,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.deleteUserOTP()');
        log.error(error);
        throw error;
    }
}

export async function updateUserPassword(userId: number, payload: any) {
    try {
        const sqlQuery = `update users set user_password=:password,updated_date=:updatedDate where user_id =:userId`;

        return await executeQuery(sqlQuery, QueryTypes.UPDATE, {
            userId: userId,
            ...payload,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.updateUserPassword()');
        log.error(error);
        throw error;
    }
}

export async function getOtpCount(userId: number, type: string, startAt: Date, endAt: Date) {
    try {
        const sqlQuery = `select count(id) as count from authorization_token where id=:userId and
        type=:type and created_date >= :startAt and created_date <= :endAt`;

        const result = await executeQuery(sqlQuery, QueryTypes.SELECT, {
            userId: userId,
            type: type,
            startAt: startAt,
            endAt: endAt,
        });

        return getRecord(result, 'getOtpCount');
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.getOtpCount()');
        log.error(error);
        throw error;
    }
}

export async function updateAuthorizationToken(refreshToken: number, payload: any) {
    try {
        const sqlQuery = `update authorization_token set access_token=:accessToken,updated_date=:updatedDate
        where refresh_token=:refreshToken and refresh_token is not null`;

        return await executeQuery(sqlQuery, QueryTypes.UPDATE, {
            refreshToken: refreshToken,
            ...payload,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.updateAuthorizationToken()');
        log.error(error);
        throw error;
    }
}

export async function deleteUserLogins(userId: number) {
    try {
        const sqlQuery = `delete from authorization_token where user_id =:userId`;

        return await executeQuery(sqlQuery, QueryTypes.DELETE, {
            userId: userId,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.deleteUserLogins()');
        log.error(error);
        throw error;
    }
}

export async function deleteUserAccessToken(accessToken: string) {
    try {
        const sqlQuery = `delete from authorization_token where access_token =:accessToken`;

        return await executeQuery(sqlQuery, QueryTypes.DELETE, {
            accessToken: accessToken,
        });
    } catch (error) {
        log.debug('ERROR occurred in mysql.auth.deleteUserAccessToken()');
        log.error(error);
        throw error;
    }
}


