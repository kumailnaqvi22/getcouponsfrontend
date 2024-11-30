// utils/auth.js

export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  };
  
  export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  };