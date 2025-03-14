export const getUrlSearchParams = (search = location.search) => {
  const searchParams = new URLSearchParams(search);
  return Object.fromEntries(searchParams);
};
