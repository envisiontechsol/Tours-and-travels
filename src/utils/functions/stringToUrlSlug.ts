export function convertStringToUrlSlug(text: string) {
  return (
    "/" +
    text
      .toLowerCase() // lowercase
      .trim() // remove starting/ending spaces
      .normalize("NFD") // normalize accents
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // collapse multiple hyphens
  );
}
