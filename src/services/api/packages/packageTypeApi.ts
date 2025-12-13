import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchPackageTypesReq = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/tour-package-types?page=${page}&pageSize=${size}`;
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
    const error = errorHandler(err, "fetchPackageTypesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const addPackageTypesReq = async (body: { name: string }) => {
  try {
    const reqBody = {
      name: body?.name,
      slug: body?.name,
    };
    const url = `/tour-package-types`;
    const res = await axiosInstance.post(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addPackageTypesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const updatePackageTypesReq = async (
  id: string,
  body: { name: string }
) => {
  try {
    const reqBody = {
      name: body?.name,
      slug: body?.name,
    };
    const url = `/tour-package-types/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updatePackageTypesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
