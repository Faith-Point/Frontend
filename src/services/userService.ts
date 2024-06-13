import axios from 'axios';
import { IRole } from '../interfaces/IRole';
import { IAddress } from '../interfaces/IAddress';
import { ApiResponse } from '../interfaces/ApiResponse';

const API_URL = 'http://localhost:3308';

export const getRoles = async (): Promise<ApiResponse<IRole[]>> => {
  const response = await axios.get<ApiResponse<IRole[]>>(`${API_URL}/role`);
  return response.data;
};

export const getAddresses = async (): Promise<ApiResponse<IAddress[]>> => {
  const response = await axios.get<ApiResponse<IAddress[]>>(
    `${API_URL}/address`
  );
  return response.data;
};

export const createUser = async (user: {
  name: string;
  email: string;
  password: string;
  role: { id: string };
  address: { id: string };
}) => {
  return await axios.post(`${API_URL}/user`, user);
};
