import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  // console.log(auth);
  // async function temp() {
  //   const refresh = useRefreshToken();
  //   console.log("NOT AUTH", auth);
  //   const user = JSON.parse(localStorage.getItem("userProfile"));
  //   const newAccessToken = await refresh();
  //   setAuth({
  //     user: user.email,
  //     roles: user.roles,
  //     accessToken: newAccessToken,
  //   });
  // }

  // if (
  //   !auth ||
  //   auth == {} ||
  //   (Object.keys(auth).length === 0 && localStorage.getItem("userProfile"))
  // ) {
  //   temp();
  // }
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <>
      {localStorage.removeItem("userProfile")}
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );
};

export default RequireAuth;
