import { clearToken } from '../redux/auth.slice/login.slice';
import { isTokenExpired } from '../utils/TokenUtils';

let isClearingToken = false;

export const tokenExpiryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  if (isClearingToken) return next(action);

  if (state.login.token && isTokenExpired(state.login.token)) {
    isClearingToken = true;
    store.dispatch(clearToken());
    window.location.href = "/";
    return;
  }
  
  return next(action);
};
