// C:\Users\hasnain haider shah\Desktop\learn1\frontend\src\utils\token.js

const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export { getToken, setToken, removeToken };
  