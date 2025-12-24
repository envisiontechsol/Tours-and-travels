export const validateImageSize = (
  file: File,
  width: number,
  height: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) return resolve(false);

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve(img.width === width && img.height === height);
      URL.revokeObjectURL(url);
    };

    img.onerror = () => resolve(false);
    img.src = url;
  });
};
