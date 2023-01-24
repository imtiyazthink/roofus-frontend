import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

interface RequestType {
  method: string;
  url: string;
}

interface errorType {
  message: string;
  statusCode: number | undefined;
}

interface apiResponseType {
  data: any;
  statusCode: number;
  message: string;
  paging: any;
}

const useHttp = (requestConfig: RequestType) => {
  const headers = useSelector((state: any) => state.auth.accessToken);
  const [apiResponse, setApiResponse] = useState<apiResponseType>({
    data: "",
    statusCode: 0,
    message: "",
    paging: {},
  });
  const [error, setError] = useState<errorType>({
    message: "",
    statusCode: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const hookHandler = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios({
        method: requestConfig.method,
        url: requestConfig.url,
        data: data ? data : null,
        headers: {
          Authorization: headers,
        },
      });
      setApiResponse({
        data: response?.data?.data,
        statusCode: response?.data?.statusCode,
        message: response?.data?.message,
        paging: response?.data?.paging,
      });
    } catch (error: any) {
      setError({
        message: error?.response?.data?.message,
        statusCode: error?.response?.status,
      });
    }
    setLoading(false);
  };

  return [apiResponse, error, loading, hookHandler] as const;
};

export default useHttp;
