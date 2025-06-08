import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getSnippetById,
  toggleFavorite,
  moveToTrash,
  moveToTrashReset,
  getSnippetVersions,
  restoreSnippetVersion,
  restoreSnippetVersionReset,
  clearSnippetVersions,
} from "../store/slice/snippetSlice";
import CodeViewer from "../components/CodeViewer";
import {
  Star,
  Edit,
  Trash,
  ArrowLeft,
  Loader2,
  AlertCircle,
  History,
  Clock,
  RotateCcw,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ViewSnippet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentSnippet,
    loading,
    error,
    isMovedToTrash,
    snippetVersions,
    isVersionRestored,
  } = useSelector((state) => state.snippet);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(null);
  const [versionDetailsOpen, setVersionDetailsOpen] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  useEffect(() => {
    dispatch(clearSnippetVersions());
    dispatch(getSnippetById(id));
    return () => {
      dispatch(moveToTrashReset());
      dispatch(restoreSnippetVersionReset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isMovedToTrash) {
      toast.success("Snippet moved to trash");
      navigate("/dashboard");
    }
  }, [isMovedToTrash, navigate]);

  useEffect(() => {
    if (isVersionRestored) {
      toast.success("Version restored successfully");
      setVersionDetailsOpen(false);
      dispatch(getSnippetById(id));
      dispatch(getSnippetVersions(id));
    }
  }, [isVersionRestored, dispatch, id]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const handleMoveToTrash = () => {
    dispatch(moveToTrash(id));
  };

  const handleViewVersionHistory = () => {
    setShowVersionHistory(!showVersionHistory);

    if (
      !showVersionHistory &&
      (!snippetVersions || snippetVersions.length === 0)
    ) {
      dispatch(getSnippetVersions(id));
    }
  };

  const handleViewVersionDetails = (index) => {
    setSelectedVersionIndex(index);
    setVersionDetailsOpen(true);
  };

  const handleRestoreVersion = (index) => {
    dispatch(restoreSnippetVersion(id, index));
  };

  const formatTimestamp = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "unknown time";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-[#0a0a0f]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/20 animate-pulse"></div>
          <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4 relative z-10" />
        </div>
        <p className="text-gray-400 mt-4">Loading snippet...</p>
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

  if (!currentSnippet) {
    return (
      <div className="p-6 bg-[#0a0a0f]">
        <Card className="border-yellow-800 bg-black/40 backdrop-blur-sm">
          <CardHeader className="bg-yellow-900/20 text-yellow-400">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <CardTitle>Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p>Snippet not found or still loading...</p>
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
          className="pl-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 mb-6 cursor-pointer"
          asChild
        >
          <Link to="/dashboard">
            <ArrowLeft size={16} className="mr-2" />
            Back to all snippets
          </Link>
        </Button>

        <Card className="bg-black/40 backdrop-blur-sm border-gray-800">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-2">
                <CardTitle className="text-2xl text-white">
                  {currentSnippet.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30"
                >
                  {currentSnippet.programmingLanguage}
                </Badge>
              </div>

              <TooltipProvider delayDuration={300}>
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleViewVersionHistory}
                        variant="outline"
                        size="icon"
                        className="border-gray-800 bg-black/20 text-white hover:text-white hover:bg-blue-900/20 hover:border-blue-800 cursor-pointer"
                      >
                        <History size={18} />
                        <span className="sr-only">Version History</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-gray-200 border-gray-800">
                      Version History
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleToggleFavorite}
                        variant="outline"
                        size="icon"
                        className={
                          currentSnippet.isFavorite
                            ? "text-yellow-500 border-yellow-800 bg-yellow-900/20 hover:bg-yellow-900/30 hover:border-yellow-700"
                            : "border-gray-800 bg-black/20 text-white hover:text-white hover:bg-purple-900/20 hover:border-purple-800 cursor-pointer"
                        }
                      >
                        <Star
                          size={18}
                          className={
                            currentSnippet.isFavorite ? "fill-yellow-500" : ""
                          }
                        />
                        <span className="sr-only">
                          {currentSnippet.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-gray-200 border-gray-800">
                      {currentSnippet.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="border-gray-800 bg-black/20 text-white hover:text-white hover:bg-purple-900/20 hover:border-purple-800 cursor-pointer"
                      >
                        <Link to={`/dashboard/edit/${currentSnippet._id}`}>
                          <Edit size={18} />
                          <span className="sr-only">Edit snippet</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-900 text-gray-200 border-gray-800">
                      Edit snippet
                    </TooltipContent>
                  </Tooltip>

                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-800 bg-black/20 text-white hover:text-white hover:bg-red-900/20 hover:border-red-800 cursor-pointer"
                          >
                            <Trash size={18} />
                            <span className="sr-only">Move to trash</span>
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-900 text-gray-200 border-gray-800">
                        Move to trash
                      </TooltipContent>
                    </Tooltip>
                    <AlertDialogContent className="bg-gray-900 border-gray-800 text-gray-200">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                          Move to trash?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          This snippet will be moved to trash. You can restore
                          it later from the trash if needed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleMoveToTrash}
                          className="bg-red-900/70 text-white hover:bg-red-900 cursor-pointer"
                        >
                          Move to Trash
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentSnippet.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Description
                </h3>
                <p className="whitespace-pre-line text-gray-300">
                  {currentSnippet.description}
                </p>
              </div>
            )}

            <Separator className="bg-gray-800" />

            {currentSnippet.tags && currentSnippet.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentSnippet.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-gray-700 hover:bg-purple-900/20 text-gray-300"
                      asChild
                    >
                      <Link to={`/dashboard?tag=${tag}`}>#{tag}</Link>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-gray-800" />

            {showVersionHistory && (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                      <History size={14} className="mr-1" />
                      Version History
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-purple-400  cursor-pointer"
                      onClick={() => setShowVersionHistory(false)}
                    >
                      <X size={14} />
                    </Button>
                  </div>

                  {snippetVersions && snippetVersions.length > 0 ? (
                    <Card className="bg-gray-900/50 border-gray-800">
                      <CardContent className="p-0">
                        <div className="overflow-hidden">
                          <div className="bg-gray-800/50 py-2 px-4 flex items-center border-b border-gray-800">
                            <div className="font-medium text-sm text-gray-300">
                              Current Version
                            </div>
                            <Badge className="ml-2 bg-blue-900/40 hover:bg-blue-900/60 text-blue-200">
                              Latest
                            </Badge>
                            <span className="ml-auto text-xs text-gray-400">
                              {formatTimestamp(currentSnippet.updatedAt)}
                            </span>
                          </div>
                          <div className="divide-y divide-gray-800">
                            {snippetVersions.map((version, index) => (
                              <div
                                key={index}
                                className="py-3 px-4 hover:bg-gray-800/30 transition-colors flex items-center justify-between"
                              >
                                <div className="flex items-center">
                                  <Clock
                                    size={14}
                                    className="text-gray-500 mr-2"
                                  />
                                  <div>
                                    <div className="text-sm text-gray-300">
                                      {version.title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatTimestamp(version.timestamp)}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-7 px-2 text-gray-400 hover:text-blue-300 hover:bg-blue-900/20 cursor-pointer"
                                    onClick={() =>
                                      handleViewVersionDetails(index)
                                    }
                                  >
                                    View
                                    <ChevronRight size={14} className="ml-1" />
                                  </Button>
                                  <TooltipProvider delayDuration={300}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-xs h-7 w-7 text-gray-400 hover:text-green-300 hover:bg-green-900/20 cursor-pointer"
                                          onClick={() =>
                                            handleRestoreVersion(index)
                                          }
                                        >
                                          <RotateCcw size={14} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-gray-900 text-gray-200 border-gray-800">
                                        Restore this version
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="bg-gray-900/50 border border-gray-800 rounded-md p-4 text-center">
                      <p className="text-gray-400 text-sm">
                        {loading
                          ? "Loading version history..."
                          : "No version history available yet."}
                      </p>
                    </div>
                  )}
                </div>
                <Separator className="bg-gray-800" />
              </>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Code</h3>
              <div className="rounded-lg border border-gray-800 overflow-hidden">
                <CodeViewer
                  code={currentSnippet.code}
                  language={currentSnippet.programmingLanguage}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedVersionIndex !== null &&
        snippetVersions &&
        snippetVersions[selectedVersionIndex] && (
          <Dialog
            open={versionDetailsOpen}
            onOpenChange={setVersionDetailsOpen}
          >
            <DialogContent className="bg-gray-900 border-gray-800 text-gray-200 sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center">
                  <History size={16} className="mr-2" />
                  Version from{" "}
                  {formatTimestamp(
                    snippetVersions[selectedVersionIndex].timestamp
                  )}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Compare with current version
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details" className="border-gray-800">
                    <AccordionTrigger className="text-gray-300 hover:text-white hover:no-underline">
                      Version Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-400 mb-1">
                            Title
                          </h4>
                          <p className="text-gray-300">
                            {snippetVersions[selectedVersionIndex].title}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-400 mb-1">
                            Language
                          </h4>
                          <p className="text-gray-300">
                            {
                              snippetVersions[selectedVersionIndex]
                                .programmingLanguage
                            }
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-400 mb-1">
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {snippetVersions[selectedVersionIndex].tags.map(
                              (tag, idx) => (
                                <Badge
                                  key={idx}
                                  className="bg-gray-800 hover:bg-gray-700 text-gray-300"
                                  variant="secondary"
                                >
                                  {tag}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <h4 className="font-medium text-gray-400 mb-1">
                            Description
                          </h4>
                          <p className="text-gray-300 whitespace-pre-line">
                            {snippetVersions[selectedVersionIndex]
                              .description || "No description"}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="rounded-lg border border-gray-800 overflow-hidden">
                  <div className="bg-gray-800/50 px-4 py-2 text-sm font-medium text-gray-300">
                    Code in this version
                  </div>
                  <CodeViewer
                    code={snippetVersions[selectedVersionIndex].code}
                    language={
                      snippetVersions[selectedVersionIndex].programmingLanguage
                    }
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    onClick={() => setVersionDetailsOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-blue-900/70 text-white hover:bg-blue-800 cursor-pointer"
                    onClick={() => handleRestoreVersion(selectedVersionIndex)}
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Restore this version
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
    </div>
  );
};

export default ViewSnippet;
