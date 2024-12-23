import Cookies from 'js-cookie';

export const saveTokenToCookie = (token) => {
  Cookies.set('userToken', token, { expires: 15 }); // Expires in 7 days
};

export const getTokenFromCookie = () => {
    return Cookies.get('userToken');
  };
 export const removeTokenFromCookie = () => {
    Cookies.remove('userToken');
  };