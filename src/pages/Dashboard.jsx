import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllSnippets } from "../store/slice/snippetSlice";
import SnippetCard from "../components/SnippetCard";
import {
  PlusCircle,
  Code,
  User,
  KeyRound,
  Trash2,
  Loader2,
  AlertCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    loading: authLoading,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const {
    snippets,
    pagination,
    loading: snippetsLoading,
    error,
  } = useSelector((state) => state.snippet);

  const [filter, setFilter] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [activeTab, setActiveTab] = useState("snippets");
  const [isMobile, setIsMobile] = useState(false);
  const [expandFilters, setExpandFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);

      setItemsPerPage(window.innerWidth < 768 ? 6 : 9);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllSnippets(currentPage, itemsPerPage));
    }
  }, [dispatch, isAuthenticated, currentPage, itemsPerPage]);

  useEffect(() => {
    if (snippets.length > 0) {
      const tagsSet = new Set(
        snippets.flatMap((snippet) => snippet.tags || [])
      );
      setAllTags(Array.from(tagsSet));
    }
  }, [snippets]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return "Unknown date";
    }
  };

  if (authLoading || snippetsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-[#0a0a0f]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4 relative z-10" />
        </div>
        <p className="text-gray-400 mt-4">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 bg-[#0a0a0f]">
        <Card className="border-red-800 bg-black/40 backdrop-blur-sm">
          <CardHeader className="bg-red-900/20 text-red-400">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <CardTitle>Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const toggleFilters = () => {
    setExpandFilters(!expandFilters);
  };

  const filteredSnippets = snippets.filter(
    (snippet) =>
      filter === "all" || (snippet.tags && snippet.tags.includes(filter))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 relative">
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(120, 87, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 87, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      ></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 max-w-7xl relative z-10">
        {!isAuthenticated ? (
          <Card className="mx-auto max-w-md bg-black/40 backdrop-blur-sm border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-purple-400">
                Authentication Required
              </CardTitle>
              <CardDescription className="text-gray-400">
                Please log in to view your dashboard
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/login">Go to login page</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Tabs
            defaultValue="snippets"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4 md:space-y-6"
          >
            <div className="flex items-center justify-center md:justify-between">
              <TabsList className="bg-gray-900/60 backdrop-blur-sm w-full md:w-auto">
                <TabsTrigger
                  value="snippets"
                  className="flex-1 md:flex-auto px-4 md:px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-300 cursor-pointer"
                >
                  Code Snippets
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="flex-1 md:flex-auto px-4 md:px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-300 cursor-pointer"
                >
                  User Profile
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="snippets" className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    All Items in Armory X
                  </h1>
                  <p className="text-sm md:text-base text-gray-400 mt-1">
                    Browse and manage your code arsenal
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
                >
                  <Link
                    to="/dashboard/create"
                    className="flex items-center justify-center"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> New Snippet
                  </Link>
                </Button>
              </div>

              {allTags.length > 0 && (
                <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
                  <CardHeader className="pb-2 md:pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2 text-gray-400" />
                        <CardTitle className="text-sm font-medium text-gray-200">
                          Filter by Tag
                        </CardTitle>
                      </div>
                      {isMobile && (
                        <button
                          onClick={toggleFilters}
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={
                            expandFilters
                              ? "Collapse filters"
                              : "Expand filters"
                          }
                        >
                          {expandFilters ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 md:pb-3">
                    {(!isMobile || expandFilters) && (
                      <ScrollArea
                        className="whitespace-nowrap pb-2"
                        type="always"
                      >
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                          <Badge
                            variant={filter === "all" ? "default" : "outline"}
                            className="transition-colors bg-purple-600/80 hover:bg-purple-600 text-white cursor-pointer"
                            onClick={() => setFilter("all")}
                          >
                            All
                          </Badge>
                          {allTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={filter === tag ? "default" : "outline"}
                              className={`cursor-pointer transition-colors ${
                                filter === tag
                                  ? "bg-purple-600/80 hover:bg-purple-600 text-white"
                                  : "bg-transparent border-gray-700 text-gray-300 hover:bg-purple-600/20"
                              }`}
                              onClick={() => setFilter(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              )}

              {snippets.length === 0 ? (
                <Card className="border-dashed border-gray-800 bg-black/40 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="rounded-full bg-purple-600/20 p-3 md:p-4 mb-4">
                      <Code className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-center mb-2 text-white">
                      No snippets yet
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 text-center mb-4 md:mb-6 max-w-md px-4">
                      Create your first code snippet to get started with your
                      collection.
                    </p>
                    <Button
                      asChild
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Link to="/dashboard/create">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Snippet
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredSnippets.map((snippet) => (
                      <SnippetCard key={snippet._id} snippet={snippet} />
                    ))}
                  </div>

                  {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center mt-6 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="border-gray-700 bg-black/40 text-gray-300 hover:bg-purple-600/20 hover:text-white cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        )
                          .filter((page) => {
                            const isCurrentPage = page === currentPage;
                            const isFirstPage = page === 1;
                            const isLastPage = page === pagination.totalPages;
                            const isNearCurrentPage =
                              page === currentPage - 1 ||
                              page === currentPage + 1;

                            return (
                              isCurrentPage ||
                              isFirstPage ||
                              isLastPage ||
                              isNearCurrentPage
                            );
                          })
                          .map((page, index, array) => {
                            const showEllipsisBefore =
                              index > 0 && array[index - 1] !== page - 1;
                            const ellipsisBefore = showEllipsisBefore && (
                              <span
                                key={`ellipsis-before-${page}`}
                                className="px-2 text-gray-500"
                              >
                                ...
                              </span>
                            );

                            const pageButton = (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => handlePageChange(page)}
                                className={
                                  currentPage === page
                                    ? "bg-purple-600 text-white"
                                    : "border-gray-700 bg-black/40 text-gray-300 hover:bg-purple-600/20 hover:text-white cursor-pointer"
                                }
                              >
                                {page}
                              </Button>
                            );

                            return showEllipsisBefore
                              ? [ellipsisBefore, pageButton]
                              : pageButton;
                          })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="border-gray-700 bg-black/40 text-gray-300 hover:bg-purple-600/20 hover:text-white cursor-pointer"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-4 md:space-y-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  User Profile
                </h1>
                <p className="text-sm md:text-base text-gray-400 mt-1">
                  Manage your personal information and account settings
                </p>
              </div>

              <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
                <CardHeader className="pb-4 md:pb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-purple-500/30 ring-offset-2 ring-offset-black mx-auto md:mx-0">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-lg bg-purple-600/20 text-purple-300">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                      <CardTitle className="text-white">{user.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {user.email}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                      <div className="text-sm font-medium text-gray-400">
                        Full name
                      </div>
                      <div className="md:col-span-2 text-sm text-gray-200">
                        {user.name}
                      </div>
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                      <div className="text-sm font-medium text-gray-400">
                        Email address
                      </div>
                      <div className="md:col-span-2 text-sm text-gray-200">
                        {user.email}
                      </div>
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                      <div className="text-sm font-medium text-gray-400">
                        Account created
                      </div>
                      <div className="md:col-span-2 text-sm text-gray-200">
                        {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-purple-800 transition-colors group">
                  <CardContent className="pt-4 md:pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                        <User className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">
                          Manage Profile
                        </h3>
                        <p className="text-sm text-gray-400">
                          Update your personal information
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-purple-400 hover:text-purple-300"
                          asChild
                        >
                          <Link to="/profile">Update profile</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-gray-800 hover:border-purple-800 transition-colors group">
                  <CardContent className="pt-4 md:pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                        <KeyRound className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Password</h3>
                        <p className="text-sm text-gray-400">
                          Change your account password
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-purple-400 hover:text-purple-300"
                          asChild
                        >
                          <Link to="/update-password">Change password</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-sm border-red-900/30 hover:border-red-900/50 transition-colors group">
                  <CardContent className="pt-4 md:pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Account</h3>
                        <p className="text-sm text-gray-400">
                          Permanently delete your account
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-red-400 hover:text-red-300"
                          asChild
                        >
                          <Link to="/delete-account">Delete account</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
