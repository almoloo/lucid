import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AccountButton from "../components/AccountButton";
import { useStore } from "@dataverse/hooks";
import Unauthorized from "../Unauthorized";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import logo from "../../src/assets/images/logo.svg";
import {
  Braces,
  Github,
  Menu,
  PencilLine,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
          <div className="hidden h-5 items-center gap-1 md:flex">
            <Link to={`/create`}>
              <Button size="sm" variant="ghost">
                <PencilLine className="mr-2 h-4 w-4" />
                Create Entry
              </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link to={`/dreams`}>
              <Button size="sm" variant="ghost">
                <ScrollText className="mr-2 h-4 w-4" />
                My Dreams
              </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link to={`/explore`}>
              <Button size="sm" variant="ghost">
                <Sparkles className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </Link>
          </div>
        )}
        <div className="ml-auto flex space-x-2">
          <AccountButton />
          {pkh && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Where do you want to go?</SheetTitle>
                </SheetHeader>
                <div className="mt-5 flex flex-col space-y-2">
                  <Link to={`/create`}>
                    <SheetClose asChild>
                      <Button variant="outline" size="lg" className="w-full">
                        <PencilLine className="mr-2 h-4 w-4" />
                        Create Entry
                      </Button>
                    </SheetClose>
                  </Link>
                  <Link to={`/dreams`}>
                    <SheetClose asChild>
                      <Button variant="outline" size="lg" className="w-full">
                        <ScrollText className="mr-2 h-4 w-4" />
                        My Dreams
                      </Button>
                    </SheetClose>
                  </Link>
                  <Link to={`/explore`}>
                    <SheetClose asChild>
                      <Button variant="outline" size="lg" className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Explore
                      </Button>
                    </SheetClose>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>
      <main className="flex grow flex-col p-5">
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
