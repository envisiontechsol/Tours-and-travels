import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchUserItineraries = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/user-itineraries`;
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
    const error = errorHandler(err, "fetchUserItineraries");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
