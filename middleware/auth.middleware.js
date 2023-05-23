import httpStatus from 'http-status';
import { getLoggedInUser } from '../config/authentication';
import { errorResponse } from '../helpers';
import { ERROR } from '../helpers/response.message';
import { Types } from 'mongoose';

export const isUserAuth = async (req, res, next) => {
	try {
        let {headers:{authorization}} = req;
		if (authorization) {
			const user = await getLoggedInUser(authorization.replace("Bearer ",''));
			if (!user) {
				return errorResponse( req, res, httpStatus.UNAUTHORIZED, ERROR.CREDENTIALS.USER_NOT_FOUND);
			}
			req.authUser = {
				...user,
				_id: new Types.ObjectId(user._id)
			};
			return next();
		}
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, ERROR.SYSTEM.INVALID_TOKEN);
	} catch (error) {
		// return next(error);
		return errorResponse( req, res, httpStatus.UNAUTHORIZED, ERROR.SYSTEM.INVALID_TOKEN);
	}
};