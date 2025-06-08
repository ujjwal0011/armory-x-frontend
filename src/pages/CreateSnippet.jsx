import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createSnippet,
  createSnippetReset,
  clearErrors,
} from "../store/slice/snippetSlice";
import SnippetForm from "../components/SnippetForm";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const CreateSnippet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isCreated, message } = useSelector(
    (state) => state.snippet
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to create snippets");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(createSnippetReset());
    dispatch(clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isCreated) {
      toast.success(message || "Snippet created successfully");
      dispatch(createSnippetReset());
      navigate("/dashboard");
    }

    if (error && submissionAttempted) {
      toast.error(error || "Error creating snippet");
      dispatch(clearErrors());
      setSubmissionAttempted(false);
    }
  }, [isCreated, error, message, dispatch, navigate, submissionAttempted]);

  useEffect(() => {
    let timeout;
    if (loading && submissionAttempted) {
      timeout = setTimeout(() => {
        if (loading) {
          toast.error("Request is taking too long. Please try again.");
          dispatch(createSnippetReset());
          setSubmissionAttempted(false);
        }
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [loading, dispatch, submissionAttempted]);

  const handleSubmit = (formData) => {
    if (!formData.title || !formData.code) {
      toast.error("Title and code are required");
      return;
    }

    console.log("Submitting snippet data:", formData);
    console.log("Current user:", user);
    console.log("Auth state:", isAuthenticated);

    if (!user || !user._id) {
      toast.error("User not fully loaded. Please try again in a moment.");
      return;
    }

    setSubmissionAttempted(true);

    try {
      dispatch(
        createSnippet({
          ...formData,
          userId: user._id,
        })
      );
    } catch (err) {
      console.error("Error dispatching createSnippet:", err);
      toast.error("Error creating snippet");
      setSubmissionAttempted(false);
    }
  };

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
      <div className="container mx-auto py-8 px-4 flex flex-col items-center relative z-10">
        <div className="w-full max-w-4xl mb-6 flex justify-start">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 transition-colors w-fit cursor-pointer"
          >
            ← Back to Dashboard
          </button>
        </div>
        <Card className="w-full max-w-4xl bg-black/40 backdrop-blur-sm border-gray-800/60 shadow-xl">
          <CardHeader className="pb-4 border-b border-gray-800/60">
            <CardTitle className="text-gray-100">Create New Snippet</CardTitle>
            <CardDescription className="text-gray-400">
              Add a new code snippet to your collection
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {loading && submissionAttempted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400 mb-4" />
                <p className="text-gray-400">Creating snippet...</p>
              </div>
            ) : (
              <SnippetForm
                onSubmit={handleSubmit}
                buttonText="Create Snippet"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSnippet;
