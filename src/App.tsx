import { Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Landing from "./views/Landing";
import All from "./views/All";
import Dashboard from "./views/Dashboard";
import Create from "./views/Create";
import Profile from "./views/Profile";
import History from "./views/History";
import Category from "./views/Category";
import BarChart from "./views/BarChart";
import Edit from "./views/Edit";
import PrivateRoutes from "./views/PrivateRoutes";

export const AuthContext = createContext("");

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function initialSetUp() {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    }
    initialSetUp();
  }, [getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={token}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="all" element={<All />} />
            <Route path="create" element={<Create />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="category" element={<Category />} />
            <Route path="chart" element={<BarChart />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
