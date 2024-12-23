import { getTokenFromCookie } from "./cookeeSet";
import jwtDecode from 'jwt-decode';



export const isAuthenticated = () => {
  const token = getTokenFromCookie();
  return token ? true : false;
}

export const memberInfo = () => {
  const token = getTokenFromCookie();
  if (!token) return null;
  return jwtDecode(token);
};
