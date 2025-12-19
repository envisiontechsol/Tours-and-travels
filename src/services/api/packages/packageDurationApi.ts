import { PackageDurationReqBodyType } from "../../../types/packageType";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchPackageDurationReq = async (
  page: number | string = 1,
  size: number | string = 50
) => {
  try {
    const url = `/package-durations?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _config = res?.data;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchPackageDurationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const addPackageDurationReq = async (
  body: PackageDurationReqBodyType
) => {
  try {
    const url = `/package-durations`;
    const res = await axiosInstance.post(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addPackageDurationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const updatePackageDurationReq = async (
  id: string,
  body: PackageDurationReqBodyType
) => {
  try {
    const url = `/package-durations/${id}`;
    const res = await axiosInstance.patch(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updatePackageDurationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const deletePackageDurationReq = async (id: string) => {
  try {
    const url = `/package-durations/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deletePackageDurationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
