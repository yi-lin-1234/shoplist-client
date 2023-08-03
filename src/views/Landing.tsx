import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from "../components/LoginButton";

function Landing() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <img
              className="h-28 w-auto"
              src="https://res.cloudinary.com/yilin1234/image/upload/v1690653507/logo_x2gxmo.png"
              alt="logo"
            />
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Shoplist App
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Never Forget An Item Again.
            </p>
            {isAuthenticated === false ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <LoginButton />
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="dashboard"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
