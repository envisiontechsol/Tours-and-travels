export type SlotsCategoryType =
  | "MORNING"
  | "EVENING"
  | "AFTERNOON"
  | "FIRST HALF"
  | "SECOND HALF";

export type SlotsCategoryResType = {
  id: string;
  code: number;
  name: string;
  isActive: boolean;
  value?: number;
};
