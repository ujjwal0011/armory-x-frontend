import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getSnippetById,
  updateSnippet,
  updateSnippetReset,
  getSnippetVersions,
  clearSnippetVersions,
} from "../store/slice/snippetSlice";
import SnippetForm from "../components/SnippetForm";
import toast from "react-hot-toast";

import { History, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const EditSnippet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentSnippet,
    loading,
    error,
    isUpdated,
    message,
    snippetVersions,
  } = useSelector((state) => state.snippet);
  const [showVersionAlert, setShowVersionAlert] = useState(true);

  useEffect(() => {
    dispatch(clearSnippetVersions());
    dispatch(getSnippetById(id));
    dispatch(getSnippetVersions(id));
    return () => {
      dispatch(updateSnippetReset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (isUpdated) {
      toast.success(message || "Snippet updated successfully");
      navigate(`/dashboard/view/${id}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [isUpdated, error, message, id, navigate]);

  const handleSubmit = (formData) => {
    dispatch(updateSnippet(id, formData));
  };

  const handleViewHistory = () => {
    navigate(`/dashboard/view/${id}`);
    sessionStorage.setItem("openVersionHistory", "true");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!currentSnippet) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Snippet not found or still loading...</p>
      </div>
    );
  }

  const hasVersionHistory = snippetVersions && snippetVersions.length > 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 relative p-6">
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(120, 87, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 87, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      ></div>

      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Snippet</h1>
              <p className="text-gray-400">Update your code snippet</p>
            </div>
            <div className="flex items-center space-x-4">
              {hasVersionHistory && (
                <Button
                  variant="outline"
                  className="border-blue-800 bg-blue-900/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200 cursor-pointer"
                  onClick={handleViewHistory}
                >
                  <History size={16} className="mr-2" />
                  View History
                </Button>
              )}
              <Button
                variant="outline"
                className="border-purple-800 bg-purple-900/20 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>

        {hasVersionHistory && showVersionAlert && (
          <Alert className="mb-6 border-blue-800 bg-blue-900/20 text-blue-300">
            <Info className="h-4 w-4" />
            <AlertTitle>Version History Available</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>
                This snippet has {snippetVersions.length} previous version
                {snippetVersions.length !== 1 ? "s" : ""}. Each edit creates a
                new version.
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30 -mr-2 cursor-pointer"
                onClick={() => setShowVersionAlert(false)}
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
          <SnippetForm
            initialData={currentSnippet}
            onSubmit={handleSubmit}
            buttonText="Update Snippet"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;
