import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getSnippetsByTag,
  clearTaggedSnippets,
} from "../store/slice/snippetSlice";
import SnippetCard from "../components/SnippetCard";
import { Tag, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaggedSnippets = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taggedSnippets, loading, error } = useSelector(
    (state) => state.snippet
  );
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSnippetsByTag(tag));
    }

    return () => {
      dispatch(clearTaggedSnippets());
    };
  }, [dispatch, tag, isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-[#0a0a0f]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4 relative z-10" />
        </div>
        <p className="text-gray-400 mt-4">Loading tagged snippets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#0a0a0f]">
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

      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl relative z-10">
        {!isAuthenticated ? (
          <Card className="mx-auto max-w-md bg-black/40 backdrop-blur-sm border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-purple-400">
                Authentication Required
              </CardTitle>
              <CardDescription className="text-gray-400">
                Please log in to view tagged snippets
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/login">Go to login page</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Button
              asChild
              variant="ghost"
              className="group flex items-center text-purple-400 hover:text-purple-300 hover:bg-purple-950/30 mb-4"
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
              </Link>
            </Button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <div className="bg-purple-600/20 p-2 rounded-full mr-3">
                    <Tag className="h-5 w-5 text-purple-400" />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">
                    Tag: <span className="text-purple-400">{tag}</span>
                  </h1>
                </div>
                <p className="text-gray-400 mt-2 ml-12">
                  Found {taggedSnippets.length}{" "}
                  {taggedSnippets.length === 1 ? "snippet" : "snippets"} with
                  this tag
                </p>
              </div>
              <Badge className="bg-purple-600/80 hover:bg-purple-600 text-white self-start md:self-center">
                {tag}
              </Badge>
            </div>

            {taggedSnippets.length === 0 ? (
              <Card className="border-dashed border-gray-800 bg-black/40 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-purple-600/20 p-4 mb-4">
                    <Tag className="h-8 w-8 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-2 text-white">
                    No snippets found
                  </h2>
                  <p className="text-gray-400 text-center mb-6 max-w-md">
                    There are no snippets with the tag "{tag}"
                  </p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link to="/dashboard">Return to Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {taggedSnippets.map((snippet) => (
                  <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaggedSnippets;
