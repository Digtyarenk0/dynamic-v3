import axios from 'axios';

export const headContentType = async (url: string) => {
  const { headers } = await axios.head(url, { withCredentials: false });
  return headers['content-type'];
};

export const get = async (url: string) => {
  const { data } = await axios.get(url, { withCredentials: false });
  return data;
};
