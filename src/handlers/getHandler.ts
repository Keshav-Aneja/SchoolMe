import axios, { AxiosResponse } from 'axios';
import { GenericAbortSignal } from 'axios';

const getHandler = async (URL: string, signal?: GenericAbortSignal) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response: any = {
    status: 0,
    data: '',
    statusCode: 500,
  };

  try {
    const res: AxiosResponse = await axios.get(URL, { headers, signal });
    response.status = 1;
    response.data = res.data;
    response.statusCode = res.status;
  } catch (err:any) {
    if (axios.isCancel(err)) {
      response.status = -1;
    } else {
      response.status = 0;
      response.data = err.response?.data || '';
    }
  }

  return response;
};

export default getHandler;
