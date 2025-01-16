import { Navigate, Outlet } from 'react-router-dom';
import { RoutePaths } from './EnumFile';
// import { StatusEnum } from './EnumFile';
// import Loader from "../pages/Loader";

function PrivateRoute (){
  const token = localStorage.getItem("token");
  // if (status === "loading") {
  //   return (
  //       <Loader />
  //   );
  // }
  return token ? <Outlet /> : <Navigate to={RoutePaths.MAIN} />;
}

export default PrivateRoute;
