export const useApi = (url: string) =>
  useFetch(url, {
    // опционально можно добавить transformResponse, error handling и т.д.
  });
