const TOKEN_KEY = 'token';

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setTokenToLocalStorage = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};