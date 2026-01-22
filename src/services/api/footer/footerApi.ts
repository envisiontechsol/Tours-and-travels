import { FooterReqBodyType } from "../../../types/footerTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const addFooterReq = async (body: FooterReqBodyType) => {
  try {
    const url = `/footer`;
    const res = await axiosInstance.post(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addFooterReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const fetchFootersReq = async (
  page: number | string,
  size: number | string,
) => {
  try {
    const url = `/footer?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _msg = res?.data?.message;
    const _config = res?.data?.meta;

    return {
      error: false,
      data: _data,
      message: _msg,
      config: _config,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchFootersReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const updateFooterReq = async (
  id: string,
  body: Partial<FooterReqBodyType>,
) => {
  try {
    const url = `/footer/${id}`;
    const res = await axiosInstance.patch(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateFooterReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const deleteFooterReq = async (id: string) => {
  try {
    const url = `/footer/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteFooterReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
