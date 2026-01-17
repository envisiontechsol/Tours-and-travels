import { ReviewResType } from "../../../types/reviewsTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

type ReviewReqBody = {
  name: string;
  rating: number;
  location: string;
  feedback: string;
  tagIds: string[];
};

export const addReviewReq = async (body: ReviewReqBody) => {
  try {
    const url = `/reviews`;
    const res = await axiosInstance.post(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addReviewReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const fetchReviewsReq = async (
  page: number | string,
  size: number | string
) => {
  try {
    const url = `/reviews?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _msg = res?.data?.message;
    const _config = res?.data;

    return {
      error: false,
      data: _data,
      message: _msg,
      config: _config,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchReviewsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const updateReviewReq = async (
  id: string,
  body: Partial<ReviewReqBody>
) => {
  try {
    const reqBody = body;
    const url = `/reviews/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateReviewReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const deleteReviewReq = async (id: string) => {
  try {
    const url = `/reviews/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteReviewReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
