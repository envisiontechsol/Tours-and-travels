import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchTermsConditionsReq = async () => {
  try {
    const url = `/cms/TERMS_AND_CONDITIONS`;
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
    const error = errorHandler(err, "fetchTermsConditionsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addTermsConditionsReq = async (body: any) => {
  try {
    const url = `/cms/TERMS_AND_CONDITIONS`;
    const res = await axiosInstance.put(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addTermsConditionsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const upadteTermsConditionsReq = async (id: string, body: any) => {
  try {
    const url = `/cms/TERMS_AND_CONDITIONS`;
    const res = await axiosInstance.patch(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message || "Updated successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteTermsConditionsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
