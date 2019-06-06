import apiService from '../services';
import { SignIn, SignUp, SendVerificationCode, VerifyCode } from '../../constants/endpoint-constants';

export const loginUser = data =>
  apiService.get(`${SignIn}`, data);

export const signUp = data =>
  apiService.post(`${SignUp}`, data);

export const sendVerificationCode = (data) =>
  apiService.post(`${SendVerificationCode}`, data);

export const verifyCode = data =>
  apiService.post(`${VerifyCode}`, data);
  