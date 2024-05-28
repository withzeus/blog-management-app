import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { BASE_API_URL } from "../configs/api";

export interface ICommonApiErr {
  status: string;
  message: string;
}

export default function useApi() {
  const { user: userContext } = useAuth();

  const headers = {
    authorization: userContext,
    "Content-Type": "application/json",
  };

  const getUrl = (endpoint: string) => {
    if (endpoint.startsWith("/")) {
      return BASE_API_URL + endpoint;
    }
    return BASE_API_URL + "/" + endpoint;
  };

  const callGetMethod = async <Response>(endpoint: string) => {
    const response = await fetch(getUrl(endpoint), {
      headers: headers as HeadersInit,
    });
    if (!response.ok) {
      const res: ICommonApiErr = await response.json();
      throw new Error(res.message);
    }
    return (await response.json()) as Response;
  };

  const callPostMethod = async <Payload, Response>(
    endpoint: string,
    payload: Payload
  ) => {
    const response = await fetch(getUrl(endpoint), {
      method: "POST",
      headers: headers as HeadersInit,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const res: ICommonApiErr = await response.json();
      throw new Error(res.message);
    }
    return (await response.json()) as Response;
  };

  const callPutMethod = async <Payload, Response>(
    endpoint: string,
    payload: Partial<Payload>
  ) => {
    const response = await fetch(getUrl(endpoint), {
      method: "PUT",
      headers: headers as HeadersInit,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const res: ICommonApiErr = await response.json();
      throw new Error(res.message);
    }
    return (await response.json()) as Response;
  };

  const callDeleteMethod = async <Response>(endpoint: string) => {
    const response = await fetch(getUrl(endpoint), {
      method: "DELETE",
      headers: headers as HeadersInit,
    });
    if (!response.ok) {
      const res: ICommonApiErr = await response.json();
      throw new Error(res.message);
    }
    return (await response.json()) as Response;
  };

  return { callGetMethod, callPostMethod, callPutMethod, callDeleteMethod };
}
