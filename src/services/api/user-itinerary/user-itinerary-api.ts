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

export const fetchUserItineraryByIdReq = async (body: {
  packageId: string;
  userId: string;
}) => {
  const packageIdIs = body?.packageId;
  const userIdIs = body?.userId;
  try {
    const url = `/user-itineraries/${packageIdIs}/plan?userId=${userIdIs}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data || null;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "fetchUserItineraryByIdReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
