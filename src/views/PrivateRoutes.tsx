import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//https://res.cloudinary.com/yilin1234/image/upload/v1690909755/Screenshot_2023-08-01_at_1.08.50_PM_bphik1.png

function PrivateRoutes() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
