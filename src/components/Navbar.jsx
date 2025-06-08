"use client";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/slice/userSlice";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Settings,
  Trash2,
  LogOut,
  Code,
  Vault,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-purple-900/20"
          : "bg-[#0a0a0f]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-purple-400 font-bold text-xl flex items-center"
            >
              <div className="bg-purple-600/20 p-2 rounded-full mr-2">
                <Vault className="h-5 w-5 text-purple-400" />
              </div>
              <span className="hidden sm:block">Armory X</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-gray-200 hover:text-purple-400 transition-colors text-sm font-medium uppercase tracking-wider ${
                    isActive("/dashboard") ? "text-purple-400" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`text-gray-200 hover:text-purple-400 transition-colors text-sm font-medium uppercase tracking-wider ${
                    isActive("/profile") ? "text-purple-400" : ""
                  }`}
                >
                  Profile
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="cursor-pointer h-9 w-9 ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black">
                        <AvatarFallback className="bg-purple-600/20 text-purple-300">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-black/40 backdrop-blur-sm border border-gray-800 text-gray-200"
                    align="end"
                    forceMount
                  >
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none text-white">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs leading-none text-gray-400">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600/20 hover:text-purple-300"
                      >
                        <User className="h-4 w-4" />
                        <span>Your Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/update-password"
                        className="flex items-center gap-2 cursor-pointer hover:bg-purple-600/20 hover:text-purple-300"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Change Password</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/delete-account"
                        className="flex items-center gap-2 cursor-pointer hover:bg-red-900/20 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 cursor-pointer hover:bg-purple-600/20 hover:text-purple-300"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-gray-200 hover:text-purple-400 transition-colors text-sm font-medium uppercase tracking-wider ${
                    isActive("/login") ? "text-purple-400" : ""
                  }`}
                >
                  Login
                </Link>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-purple-600/20"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0a0a0f]/95 backdrop-blur-md text-white border-gray-800"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link
                    to="/"
                    className="text-purple-400 font-bold text-xl flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="bg-purple-600/20 p-2 rounded-full mr-2">
                      <Code className="h-5 w-5 text-purple-400" />
                    </div>
                    CodeSnippetVault
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-purple-600/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {isAuthenticated ? (
                    <>
                      <div className="mb-6 p-4 bg-black/40 rounded-lg border border-gray-800">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-10 w-10 ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black">
                            <AvatarFallback className="bg-purple-600/20 text-purple-300">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive("/dashboard")
                            ? "bg-purple-600/20 text-purple-300"
                            : "text-gray-200 hover:bg-purple-600/10 hover:text-purple-300"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive("/profile")
                            ? "bg-purple-600/20 text-purple-300"
                            : "text-gray-200 hover:bg-purple-600/10 hover:text-purple-300"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/update-password"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive("/update-password")
                            ? "bg-purple-600/20 text-purple-300"
                            : "text-gray-200 hover:bg-purple-600/10 hover:text-purple-300"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Change Password
                      </Link>
                      <Link
                        to="/delete-account"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive("/delete-account")
                            ? "bg-red-900/20 text-red-300"
                            : "text-red-400 hover:bg-red-900/10 hover:text-red-300"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Delete Account
                      </Link>

                      <div className="pt-4 mt-4 border-t border-gray-800">
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-purple-600/10 hover:text-purple-300"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          isActive("/login")
                            ? "bg-purple-600/20 text-purple-300"
                            : "text-gray-200 hover:bg-purple-600/10 hover:text-purple-300"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <div className="mt-3 px-3">
                        <Button
                          asChild
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Link
                            to="/register"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Register
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
