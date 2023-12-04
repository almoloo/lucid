import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AccountButton from "../components/AccountButton";
import { useStore } from "@dataverse/hooks";
import Unauthorized from "../Unauthorized";

const Layout: React.FC = () => {
  const { pkh } = useStore();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex gap-5 border-b p-5">
        <Link to={`/`}>home</Link>
        {pkh && <Link to={`/create`}>create</Link>}
        {pkh && <Link to={`/dreams`}>dreams</Link>}
        {pkh && <Link to={`/account`}>account</Link>}
        <AccountButton />
      </header>
      <main className="grow p-5">
        {!pkh && location.pathname !== "/" ? <Unauthorized /> : <Outlet />}
      </main>
      <footer className="border-t p-5">footer</footer>
    </div>
  );
};

export default Layout;
