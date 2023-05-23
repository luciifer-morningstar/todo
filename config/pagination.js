export const formatPagination = (limit, currentPage) => {
	let skip = currentPage < 2 ? 0 : (currentPage - 1) * limit;
    return {
 	  skip:skip,
    limit:limit,
    currentPage:currentPage
  }
}

export const formatPaginationResponse = async (limit, totalData, data, currentPage = 1) => {
    return {
        limit:limit,
        totalData:totalData,
        totalPage:Math.ceil(totalData/limit),
        currentPage:currentPage,
        data:data
    }
}