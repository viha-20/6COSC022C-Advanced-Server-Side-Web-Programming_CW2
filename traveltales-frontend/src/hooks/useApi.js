import { useState } from 'react';

export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (apiFunc) => {
    setLoading(true);
    try {
      const response = await apiFunc();
      setData(response.data);
      setError(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
};

export default useApi;