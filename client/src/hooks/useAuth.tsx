import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import useApi from "./useApi";
import { ENDPOINTS } from "../configs/api";
import { STORAGE_KEYS } from "../configs/enums/storageKeys";
import { useToast } from "./useToast";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout: () => void;
  loadToken: () => string;
}

type ILoginRequest = {
  username: string;
  password: string;
};

type ILoginResponse = {
  status: string;
  data: string;
};

type IRegisterRequest = {
  username: string;
  password: string;
  email: string;
};

type IRegisterResponse = {
  status: string;
  data: string;
};

function getLocalStorage(key: STORAGE_KEYS, initialValue: string = "") {
  try {
    const value = localStorage.getItem(key);
    return value ?? initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loadToken: () => "",
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() =>
    getLocalStorage(STORAGE_KEYS.TOKEN, "")
  );

  const { showToastError, showToastSuccess } = useToast();
  const { callPostMethod } = useApi();

  const login = async (username: string, password: string) => {
    try {
      const response = await callPostMethod<ILoginRequest, ILoginResponse>(
        ENDPOINTS.LOGIN,
        { username, password }
      );
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data);
      setUser(response.data);
      showToastSuccess("Login Successful!", "", "top");
      return;
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    try {
      const response = await callPostMethod<
        IRegisterRequest,
        IRegisterResponse
      >(ENDPOINTS.REGISTER, { username, password, email });
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data);
      setUser(response.data);
      showToastSuccess("Register Successful!", "", "top");
      return;
    } catch (error: any) {
      showToastError(error?.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  };

  const loadToken = (): string => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return storedUser as string;
  };

  useEffect(() => {
    setUser(loadToken());
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loadToken, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
