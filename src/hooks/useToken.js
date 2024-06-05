import { useSelector } from 'react-redux';

const useToken = () => {
  const token = useSelector((state) => state.login.token);
  return token;
};

export default useToken;