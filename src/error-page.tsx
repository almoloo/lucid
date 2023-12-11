import { AlertTriangle, ChevronsRight, Home } from "lucide-react";
import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex min-h-screen items-center justify-center"
    >
      <div>
        <h1 className="mb-4 flex items-center text-2xl font-bold text-rose-500">
          <AlertTriangle className="mr-2 h-8 w-8" />
          Oops!
        </h1>
        <p className="mb-1">Sorry, an unexpected error has occurred.</p>
        <p className="inline-flex items-center">
          <ChevronsRight className="mr-2 h-4 w-4 text-slate-500" />
          <i>{error.statusText || error.message}</i>
        </p>
        <hr className="my-5" />
        <Link to="/" className="flex items-center text-sky-500">
          <Home className="mr-2 h-4 w-4" />
          Return to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
