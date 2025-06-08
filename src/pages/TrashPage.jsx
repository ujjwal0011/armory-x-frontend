import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrashSnippets,
  emptyTrash,
  emptyTrashReset,
} from "../store/slice/snippetSlice";
import SnippetCard from "../components/SnippetCard";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TrashPage = () => {
  const dispatch = useDispatch();
  const { trashedSnippets, loading, error, message, isTrashEmptied } =
    useSelector((state) => state.snippet);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  useEffect(() => {
    dispatch(getTrashSnippets());
  }, [dispatch]);

  useEffect(() => {
    if (isTrashEmptied) {
      setTimeout(() => {
        dispatch(emptyTrashReset());
      }, 3000);
    }
  }, [isTrashEmptied, dispatch]);

  const handleEmptyTrash = () => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete all items in the trash? This action cannot be undone."
      )
    ) {
      setIsEmptyingTrash(true);
      dispatch(emptyTrash());

      setTimeout(() => {
        setIsEmptyingTrash(false);
      }, 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-[#0a0a0f]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4 relative z-10" />
        </div>
        <p className="text-gray-400 mt-4">Loading trash items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 relative">
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

      <div className="container mx-auto py-6 px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-900/30 text-red-400 mr-3 border border-red-800/30">
              <Trash2 size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100">Trash</h1>
              <p className="text-zinc-400 text-sm">
                Items in trash will be permanently deleted after 30 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm rounded-lg border border-purple-400 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition-colors"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleEmptyTrash}
              disabled={
                trashedSnippets.length === 0 || loading || isEmptyingTrash
              }
              className={`px-4 py-2 text-sm rounded-lg border border-red-700/50 bg-red-900/20 text-red-300 hover:bg-red-800/30 transition-colors  ${
                trashedSnippets.length === 0 || loading || isEmptyingTrash
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Empty Trash
            </button>
          </div>
        </div>

        {isTrashEmptied && (
          <div className="mb-4 p-3 bg-green-900/20 border border-green-700/50 rounded-lg text-green-300">
            {message || "Trash emptied successfully"}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg text-red-300">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {trashedSnippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
            <div className="bg-zinc-800/50 rounded-full p-4 mb-4">
              <Trash2 size={32} className="text-zinc-500" />
            </div>
            <h3 className="text-xl font-medium text-zinc-300 mb-2">
              Trash is empty
            </h3>
            <p className="text-zinc-500 max-w-md">
              Items you move to trash will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trashedSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashPage;
