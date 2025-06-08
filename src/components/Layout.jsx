"use client";

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  PlusCircle,
  Vault,
  Star,
  Trash,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSnippets, getAllSnippets } from "../store/slice/snippetSlice";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { snippets } = useSelector((state) => state.snippet);
  const [languageCounts, setLanguageCounts] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (snippets.length === 0) {
      dispatch(getAllSnippets());
    }
  }, [dispatch, snippets.length]);

  useEffect(() => {
    if (snippets.length > 0) {
      const counts = {};
      snippets.forEach((snippet) => {
        const lang = snippet.programmingLanguage;
        if (lang) {
          counts[lang] = (counts[lang] || 0) + 1;
        }
      });
      setLanguageCounts(counts);
    }
  }, [snippets]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchSnippets(searchQuery));
      navigate(`/dashboard/search?query=${encodeURIComponent(searchQuery)}`);
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: "bg-yellow-500",
      typescript: "bg-blue-500",
      html: "bg-orange-500",
      css: "bg-purple-500",
      python: "bg-green-500",
      java: "bg-red-500",
      csharp: "bg-blue-700",
      cpp: "bg-blue-400",
      php: "bg-indigo-500",
      ruby: "bg-red-600",
      go: "bg-cyan-500",
      rust: "bg-orange-700",
      swift: "bg-pink-500",
      kotlin: "bg-purple-700",
    };

    return colors[language.toLowerCase()] || "bg-gray-500";
  };

  const MobileMenuButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="md:hidden fixed top-4 right-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg"
      aria-label="Toggle menu"
    >
      <Menu size={20} />
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-gray-200 relative mt-12">
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(120, 87, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 87, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      ></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      {isMobile && <MobileMenuButton />}

      <div
        className={cn(
          "bg-black/40 backdrop-blur-sm border-r border-gray-800 shadow-sm flex flex-col transition-all duration-300 fixed md:relative z-30 h-full",
          isMobile
            ? mobileMenuOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full w-72"
            : sidebarCollapsed
            ? "w-16"
            : "w-72"
        )}
      >
        {isMobile && mobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}

        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 bg-purple-600 text-white rounded-full p-1 shadow-lg z-20 cursor-pointer"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        )}

        <div className="px-4 py-6 border-b border-gray-800 flex items-center justify-center">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Vault size={20} />
          </div>
          {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) && (
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Armory X
            </span>
          )}
        </div>

        <div className={cn("p-4", sidebarCollapsed && !isMobile ? "px-2" : "")}>
          {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) && (
            <form onSubmit={handleSearch} className="relative mb-6 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-purple-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search snippets..."
                className="w-full py-2.5 pl-10 pr-10 bg-gray-900/50 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </form>
          )}

          <div className="space-y-1 mb-6">
            {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Quick Links
              </h3>
            )}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-900/30 text-purple-400"
                    : "text-gray-300 hover:bg-gray-800/60",
                  sidebarCollapsed && !isMobile
                    ? "justify-center p-2.5"
                    : "px-3 py-2.5"
                )
              }
              onClick={() => isMobile && setMobileMenuOpen(false)}
              title="All Snippets"
            >
              <LayoutDashboard
                size={18}
                className={sidebarCollapsed && !isMobile ? "" : "mr-2.5"}
              />
              {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) &&
                "All Snippets"}
            </NavLink>
            <NavLink
              to="/dashboard/favorites"
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-900/30 text-purple-400"
                    : "text-gray-300 hover:bg-gray-800/60",
                  sidebarCollapsed && !isMobile
                    ? "justify-center p-2.5"
                    : "px-3 py-2.5"
                )
              }
              onClick={() => isMobile && setMobileMenuOpen(false)}
              title="Favorites"
            >
              <Star
                size={18}
                className={sidebarCollapsed && !isMobile ? "" : "mr-2.5"}
              />
              {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) &&
                "Favorites"}
            </NavLink>
            <NavLink
              to="/dashboard/create"
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-900/30 text-purple-400"
                    : "text-gray-300 hover:bg-gray-800/60",
                  sidebarCollapsed && !isMobile
                    ? "justify-center p-2.5"
                    : "px-3 py-2.5"
                )
              }
              onClick={() => isMobile && setMobileMenuOpen(false)}
              title="Create Snippet"
            >
              <PlusCircle
                size={18}
                className={sidebarCollapsed && !isMobile ? "" : "mr-2.5"}
              />
              {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) &&
                "Create Snippet"}
            </NavLink>
          </div>

          {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Languages
              </h3>
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
                {Object.keys(languageCounts).length > 0 ? (
                  Object.entries(languageCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([language, count]) => (
                      <div
                        key={language}
                        className="flex items-center py-1.5 px-1 group hover:bg-gray-800 rounded transition-colors"
                      >
                        <div
                          className={`w-2.5 h-2.5 ${getLanguageColor(
                            language
                          )} rounded-full mr-2.5`}
                        ></div>
                        <span className="text-sm capitalize text-gray-200">
                          {language}
                        </span>
                        <span className="ml-auto text-xs font-medium bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">
                          {count}
                        </span>
                      </div>
                    ))
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">
                    No snippets yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-gray-700">
          <NavLink
            to="/dashboard/trash"
            className={({ isActive }) =>
              cn(
                "flex items-center rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-900/30 text-purple-400"
                  : "text-gray-300 hover:bg-gray-800/60",
                sidebarCollapsed && !isMobile
                  ? "justify-center p-2.5"
                  : "px-3 py-2.5"
              )
            }
            onClick={() => isMobile && setMobileMenuOpen(false)}
            title="Trash"
          >
            <Trash
              size={18}
              className={cn(
                "text-gray-400",
                sidebarCollapsed && !isMobile ? "" : "mr-2.5"
              )}
            />
            {(!sidebarCollapsed || (isMobile && mobileMenuOpen)) && "Trash"}
          </NavLink>
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 overflow-auto relative z-10 pt-14 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
