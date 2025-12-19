import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchTagsReq = async (
  page: number | string = 1,
  size: number | string = 50
) => {
  try {
    const url = `/tags?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _config = res?.data || null;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchTagsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const addTagReq = async (body: { name: string; topLevelId: string }) => {
  try {
    const reqBody = {
      name: body?.name,
      topLevelId: body?.topLevelId,
    };
    const url = `/tags`;
    const res = await axiosInstance.post(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addTagReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const upadteTagReq = async (
  id: string,
  body: { name: string; topLevelId: string }
) => {
  try {
    const reqBody = {
      name: body?.name,
      topLevelId: body?.topLevelId,
    };
    const url = `/tags/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteTagReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const deleteTagReq = async (id: string) => {
  try {
    const url = `/tags/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteTagReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
