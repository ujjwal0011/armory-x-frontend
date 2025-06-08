import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import {
  searchSnippets,
  clearSearchResults,
} from "../store/slice/snippetSlice";
import SnippetCard from "../components/SnippetCard";
import { Search, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.snippet
  );
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      dispatch(searchSnippets(query));
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, query]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-[#0a0a0f]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4 relative z-10" />
        </div>
        <p className="text-gray-400 mt-4">Searching snippets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-[#0a0a0f]">
        <Card className="border-red-800 bg-black/40 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
              <h3 className="font-medium text-red-400">Error</h3>
            </div>
            <p className="text-gray-300">{error}</p>
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
        <Button
          variant="ghost"
          className="pl-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 mb-6"
          asChild
        >
          <Link to="/dashboard">
            <ArrowLeft size={16} className="mr-2" />
            Back to dashboard
          </Link>
        </Button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Search Results: <span className="text-purple-400">"{query}"</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Found {searchResults.length}{" "}
            {searchResults.length === 1 ? "snippet" : "snippets"}
          </p>
        </div>

        {searchResults.length === 0 ? (
          <Card className="border-dashed border-gray-800 bg-black/40 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-purple-600/20 p-4 mb-4">
                <Search className="h-8 w-8 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2 text-white">
                No results found
              </h2>
              <p className="text-gray-400 text-center mb-6 max-w-md">
                Try searching with different keywords or browse all snippets
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/dashboard">Browse all snippets</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
