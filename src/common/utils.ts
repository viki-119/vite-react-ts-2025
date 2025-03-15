export const getUrlSearchParams = (
  search = location.search
): {
  [key: string]: string;
} => {
  const searchParams = new URLSearchParams(search);
  return Object.fromEntries(searchParams);
};
