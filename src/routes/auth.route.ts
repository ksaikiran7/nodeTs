import {Router} from 'express';
import * as controller from '../controllers/auth.controller';
import * as validation from '../validations/auth.validation';

const router = Router();

router.route('/login').post(validation.login, controller.login);
router.route('/logout').post(validation.logout, controller.logout);
router.route('/password/forget').post(validation.forgetPassword, controller.forgetPassword);
router.route('/otp/verify').post(validation.verifyOTP, controller.verifyOTP);
router.route('/password/update').put(validation.updatePassword, controller.updateUserPassword);

export default router;