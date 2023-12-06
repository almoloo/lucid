import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AccountButton from "../components/AccountButton";
import { useStore } from "@dataverse/hooks";
import Unauthorized from "../Unauthorized";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import logo from "../../src/assets/images/logo.svg";
import { Braces, Github } from "lucide-react";

const Layout: React.FC = () => {
  const { pkh } = useStore();
  const location = useLocation();

  return (
    <div className="dark flex min-h-screen flex-col">
      <header className="flex items-center gap-5 border-b px-5 py-3">
        <Link to={`/`}>
          <img src={logo} alt="lucid" className="h-8 w-auto" />
        </Link>
        {pkh && (
          <div className="flex h-5 items-center gap-1">
            <Link to={`/create`}>
              <Button size="sm" variant="ghost">
                Create Entry
              </Button>
            </Link>
            <Link to={`/dreams`}>
              <Button size="sm" variant="ghost">
                My Dreams
              </Button>
            </Link>
            {/* <Link to={`/account`}>
              <Button size="sm" variant="ghost">
                Account
              </Button>
            </Link> */}
          </div>
        )}
        <div className="ml-auto">
          <AccountButton />
        </div>
      </header>
      <main className="grow p-5">
        {!pkh && location.pathname !== "/" ? <Unauthorized /> : <Outlet />}
      </main>
      <footer className="flex content-between items-center border-t p-5">
        <p className="mr-auto flex items-center text-xs text-slate-500">
          <Braces className="mr-2 h-4 w-4" />
          Designed & developed by
          <Link to={`https://github.com/almoloo`} className="ml-1">
            @almoloo
          </Link>
        </p>
        <Link to={`https://github.com/almoloo/lucid`} title="Github repository">
          <Button size="icon" variant="secondary">
            <Github className="h-4 w-4" />
          </Button>
        </Link>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
