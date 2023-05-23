import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
import { userService } from "../services";

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const data = await userService.login(email, password);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error?.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

export const register = async (req, res) => {
    try {
        const result = await userService.register(req?.body);
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}

export const getUsersWithPagination = async (req, res) => {
    try {
        const { limit, page, search } = req.query;
        const result = await userService.getUsersWithPagination(req.authUser, search, { limit: parseInt(limit ?? 1), page: parseInt(page ?? 1) });
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }

}