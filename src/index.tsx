import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// const domain = process.env.REACT_APP_DOMAIN!;
// const clientId = process.env.REACT_APP_CLIENT_ID!;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-wbntuus1r5ywt5kh.us.auth0.com"
      clientId="7nMtno8Oqk9We5DiegxC8Jhv1xr61E88"
      authorizationParams={{
        redirect_uri: "https://inspiring-squirrel-e515f6.netlify.app/dashboard",
        audience: "8707129838",
      }}
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
