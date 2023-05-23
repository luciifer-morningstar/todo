import { Subscription } from "../models";
import ApiError from "../helpers/error/ApiError";
import httpStatus from "http-status";
import { ERROR } from "../helpers/response.message";
import { formatPagination, formatPaginationResponse } from "../config/pagination";
import { Types } from "mongoose";

export const create = async (data, userId) => {
    try {
        let subscription = {};
        data['userId'] = new Types.ObjectId(userId);
        subscription = await Subscription.create(data);
        return subscription.toJSON();
    } catch (e) {
        throw e
    }
}

export const getSubscriptionWithPagination = async (authUser, search, pagination) => {
    try {
        let filter = {};
        filter['userId'] = {$eq:authUser._id}
        if(search && search != ""){
            filter = {...filter, serviceName:{ $regex: `^${search}`, $options: "i" }};
        }
        let paginationData = await formatPagination( pagination.limit, pagination.page );
        let _query = [
			{ $match: filter },
			{ $sort: { serviceName: 1 } },
			{ $skip: paginationData.skip },
			{ $limit: paginationData.limit }
		];
        console.log("authUser", JSON.stringify(_query))
		let result = await Subscription.aggregate(_query);
		let totalCount = await Subscription.countDocuments(filter);
		result = JSON.parse(JSON.stringify(result));
		return await formatPaginationResponse( pagination.limit, totalCount, result, pagination.page );
    } catch (error) {
        console.log("error while getting data", error)
        throw error;
    }
}

export const getById = async (id) => {
    try {
        let data = await Subscription.findOne({_id: new Types.ObjectId(id)});
        return data ? data : undefined;
    } catch (error) {
        throw error;
    }
}

export const update = async (updateInfo, id) => {
    try {
        let data = await Subscription.updateOne({_id:new Types.ObjectId(id)},{$set:updateInfo});
        return updateInfo;
    } catch (error) {
        throw error;
    }
}

export const destroy = async (id) => {
    try {
        let data = await Subscription.deleteOne({_id: new Types.ObjectId(id)});
        return id;
    } catch (error) {
        throw error;
    }
}