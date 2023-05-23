import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
import { subscriptionService } from "../services";

export const create = async (req, res) => {
    try {
        const data = await subscriptionService.create(req.body, req.authUser._id);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error?.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR, error.message, error);
    }
};

export const update = async (req, res) => {
    try {
        const result = await subscriptionService.update(req?.body, req.params.id);
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}

export const getById = async (req, res) => {
    try {
        const result = await subscriptionService.getById(req.params.id);
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}

export const destroy = async (req, res) => {
    try {
        const result = await subscriptionService.destroy(req.params.id);
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}

export const getSubscriptionWithPagination = async (req, res) => {
    try {
        const { limit, page, search } = req.query;
        const result = await subscriptionService.getSubscriptionWithPagination(req.authUser, search, { limit: parseInt(limit ?? 1), page: parseInt(page ?? 1) });
        return successResponse(req, res, result);
    }catch(error){
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}