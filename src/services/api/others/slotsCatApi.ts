import { SlotsCategoryResType } from "../../../types/slotsTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

const getValue = (codeIs: number) => {
  if (codeIs <= 3) return 1;
  if (codeIs > 3 && codeIs <= 5) return 1.5;
};

export const fetchSlotsCategoryReq = async () => {
  try {
    const url = `/categories`;
    const res = await axiosInstance.get(url);
    let _data = [];
    if (Array.isArray(res?.data?.data)) {
      _data = res?.data.data.map((item: SlotsCategoryResType) => {
        return {
          ...item,
          value: item?.value || getValue(item?.code),
        };
      });
    }
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "fetchSlotsCategoryReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
