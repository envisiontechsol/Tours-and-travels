import { QuickLinkReqBodyType } from "../../../types/quickLinksTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const addQuickLinkReq = async (body: QuickLinkReqBodyType) => {
  try {
    const url = `/quick-links`;
    const res = await axiosInstance.post(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addQuickLinkReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const fetchQuickLinksReq = async (
  page: number | string,
  size: number | string,
) => {
  try {
    const url = `/quick-links?page=${page}&pageSize=${size}`;
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
    const error = errorHandler(err, "fetchQuickLinksReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const updateQuickLinkReq = async (
  id: string,
  body: Partial<QuickLinkReqBodyType>,
) => {
  try {
    const url = `/quick-links/${id}`;
    const res = await axiosInstance.patch(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateQuickLinkReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const deleteQuickLinkReq = async (id: string) => {
  try {
    const url = `/quick-links/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteQuickLinkReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
