import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchModulesReq = async (
  page: number | string,
  size: number | string
) => {
  try {
    const url = `/access-modules`;
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
    const error = errorHandler(err, "fetchModulesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
