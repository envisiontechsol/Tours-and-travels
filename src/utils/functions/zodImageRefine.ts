import { validateImageSize } from "./validateImageSize";

export const imageSizeRefine =
  (fieldName: string, width: number, height: number) =>
  async (data: Record<string, any>) => {
    const fileList = data[fieldName] as FileList | undefined;
    const file = fileList?.[0];

    if (!file) return true; // allow empty
    return validateImageSize(file, width, height);
  };
