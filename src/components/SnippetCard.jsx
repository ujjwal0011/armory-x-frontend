"use client";

import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Edit,
  Trash,
  Code2,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  toggleFavorite,
  moveToTrash,
  restoreFromTrash,
  deleteSnippet,
} from "../store/slice/snippetSlice";
import CodeViewer from "./CodeViewer";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SnippetCard = ({ snippet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showTrashDialog, setShowTrashDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isTrashView = location.pathname.includes("/trash");

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(snippet._id));
  };

  const handleMoveToTrash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTrashDialog(true);
  };

  const confirmMoveToTrash = () => {
    dispatch(moveToTrash(snippet._id));
    setShowTrashDialog(false);
    toast.success(`"${snippet.title}" moved to trash`);
  };

  const handleRestoreFromTrash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(restoreFromTrash(snippet._id));
    toast.success(`"${snippet.title}" restored from trash`);
  };

  const handlePermanentDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmPermanentDelete = () => {
    dispatch(deleteSnippet(snippet._id));
    setShowDeleteDialog(false);
    toast.success(`"${snippet.title}" deleted permanently`);
  };

  const handleCardClick = () => {
    if (!isTrashView) {
      navigate(`/dashboard/view/${snippet._id}`);
    }
  };

  const getCodePreview = (code) => {
    if (!code) return "";
    const lines = code.split("\n");
    return lines.slice(0, 10).join("\n");
  };

  const getLanguageColor = (language) => {
    if (!language) return "border-zinc-700 bg-zinc-800/50 text-zinc-400";

    const colors = {
      javascript: "border-amber-700/50 bg-amber-900/20 text-amber-300",
      typescript: "border-cyan-700/50 bg-cyan-900/20 text-cyan-300",
      html: "border-orange-700/50 bg-orange-900/20 text-orange-300",
      css: "border-violet-700/50 bg-violet-900/20 text-violet-300",
      python: "border-emerald-700/50 bg-emerald-900/20 text-emerald-300",
      java: "border-rose-700/50 bg-rose-900/20 text-rose-300",
      csharp: "border-sky-700/50 bg-sky-900/20 text-sky-300",
      cpp: "border-blue-700/50 bg-blue-900/20 text-blue-300",
      php: "border-indigo-700/50 bg-indigo-900/20 text-indigo-300",
      ruby: "border-red-700/50 bg-red-900/20 text-red-300",
      go: "border-teal-700/50 bg-teal-900/20 text-teal-300",
      rust: "border-orange-700/50 bg-orange-900/20 text-orange-300",
      swift: "border-pink-700/50 bg-pink-900/20 text-pink-300",
      kotlin: "border-purple-700/50 bg-purple-900/20 text-purple-300",
    };

    return (
      colors[language.toLowerCase()] ||
      "border-zinc-700 bg-zinc-800/50 text-zinc-400"
    );
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative h-full flex flex-col overflow-hidden rounded-xl transition-all duration-300 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 rounded-xl p-[1px]">
          <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm rounded-xl" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-cyan-600/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-violet-600/10 group-hover:to-cyan-600/10 transition-opacity duration-300" />

        <div className="relative flex flex-col h-full z-10">
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 max-w-[80%]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-900/40 to-cyan-900/40 text-violet-300 shadow-sm shadow-violet-900/20 border border-violet-800/30">
                  <Code2 size={16} />
                </div>
                <h3 className="text-base font-medium text-zinc-100 truncate">
                  {snippet.title}
                </h3>
              </div>

              {!isTrashView && (
                <button
                  onClick={handleToggleFavorite}
                  className={cn(
                    "p-1.5 rounded-full transition-all duration-200",
                    snippet.isFavorite
                      ? "text-amber-300 bg-amber-900/20 border border-amber-700/50 shadow-sm shadow-amber-900/20"
                      : "text-zinc-500 hover:text-amber-300 hover:bg-amber-900/20 hover:border-amber-700/50 border border-transparent cursor-pointer"
                  )}
                  aria-label="Favorite"
                >
                  <Star
                    size={16}
                    className={cn(
                      "transition-transform duration-200",
                      snippet.isFavorite
                        ? "fill-amber-400 scale-110"
                        : "scale-100 group-hover:scale-105"
                    )}
                  />
                </button>
              )}
            </div>

            <div className="mb-4 h-10">
              {snippet.description ? (
                <p className="text-zinc-400 text-xs line-clamp-2">
                  {snippet.description}
                </p>
              ) : (
                <p className="text-zinc-600 text-xs italic">No description</p>
              )}
            </div>

            <div className="h-44 mb-4 overflow-hidden rounded-lg border border-zinc-800/80 bg-black/50 backdrop-filter backdrop-blur-sm shadow-inner">
              <CodeViewer
                code={getCodePreview(snippet.code)}
                language={
                  snippet.programmingLanguage?.toLowerCase() || "javascript"
                }
              />
            </div>

            <div className="flex flex-wrap mb-2 min-h-8">
              <div
                className={`text-xs font-medium px-2 py-0.5 rounded-md mr-2 mb-1.5 border ${getLanguageColor(
                  snippet.programmingLanguage
                )}`}
              >
                {snippet.programmingLanguage || "Unknown"}
              </div>

              {snippet.tags?.slice(0, 2).map((tag, index) => (
                <Link
                  key={index}
                  to={`/dashboard/tag/${tag}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-zinc-800/50 text-zinc-300 text-xs font-medium px-2 py-0.5 rounded-md mr-1.5 mb-1.5 hover:bg-violet-900/30 hover:text-violet-300 transition-colors border border-zinc-700/50 hover:border-violet-700/50"
                >
                  #{tag}
                </Link>
              ))}

              {snippet.tags?.length > 2 && (
                <span className="bg-zinc-800/30 text-zinc-400 text-xs font-medium px-2 py-0.5 rounded-md mb-1.5 border border-zinc-700/30">
                  +{snippet.tags.length - 2}
                </span>
              )}
            </div>
          </div>

          <div className="bg-black/40 p-3 mt-auto border-t border-zinc-800/30 flex items-center justify-between">
            <div className="text-xs text-zinc-500">
              {snippet.updatedAt &&
                new Date(snippet.updatedAt).toLocaleDateString()}
            </div>

            <div className="flex items-center space-x-1">
              {isTrashView ? (
                <>
                  <button
                    onClick={handleRestoreFromTrash}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-green-300 hover:bg-green-900/20 transition-all hover:shadow-sm hover:shadow-green-900/20 border border-transparent hover:border-green-800/30 cursor-pointer"
                    aria-label="Restore"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={handlePermanentDelete}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-red-300 hover:bg-red-900/20 transition-all hover:shadow-sm hover:shadow-red-900/20 border border-transparent hover:border-red-800/30 cursor-pointer"
                    aria-label="Delete Permanently"
                  >
                    <Trash size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={`/dashboard/edit/${snippet._id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-violet-300 hover:bg-violet-900/20 transition-all hover:shadow-sm hover:shadow-violet-900/20 border border-transparent hover:border-violet-800/30"
                    aria-label="Edit"
                  >
                    <Edit size={14} />
                  </Link>
                  <button
                    onClick={handleMoveToTrash}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-red-300 hover:bg-red-900/20 transition-all hover:shadow-sm hover:shadow-red-900/20 border border-transparent hover:border-red-800/30 cursor-pointer"
                    aria-label="Move to Trash"
                  >
                    <Trash size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCardClick();
                    }}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-cyan-300 hover:bg-cyan-900/20 transition-all hover:shadow-sm hover:shadow-cyan-900/20 border border-transparent hover:border-cyan-800/30 cursor-pointer"
                    aria-label="View"
                  >
                    <ExternalLink size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showTrashDialog} onOpenChange={setShowTrashDialog}>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-800 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">
              Move to Trash
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to move "{snippet.title}" to trash? You can
              restore it later from the trash folder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmMoveToTrash}
              className="bg-red-900/70 text-red-100 hover:bg-red-800 border border-red-700/50 cursor-pointer"
            >
              Move to Trash
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-zinc-900 border border-zinc-800 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">
              Delete Permanently
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to permanently delete "{snippet.title}"?
              <span className="block mt-2 font-medium text-red-400">
                This action cannot be undone.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPermanentDelete}
              className="bg-red-900/70 text-red-100 hover:bg-red-800 border border-red-700/50 cursor-pointer"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SnippetCard;
