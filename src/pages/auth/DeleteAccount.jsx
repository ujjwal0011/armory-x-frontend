import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  deleteAccountReset,
  clearProfileErrors,
  clearProfileMessages,
  logout,
} from "../../store/slice/userSlice";
import toast from "react-hot-toast";

import { motion } from "framer-motion";
import { AlertTriangle, Trash2, X, Check } from "lucide-react";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, isDeleted } = useSelector(
    (state) => state.profile
  );

  const [confirmText, setConfirmText] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearProfileMessages());
    }

    if (isDeleted) {
      dispatch(logout());
      navigate("/login");
      dispatch(deleteAccountReset());
    }
  }, [dispatch, error, message, isDeleted, navigate]);

  const handleInitialDelete = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setConfirmText("");
  };

  const handleConfirmDelete = () => {
    if (confirmText === "DELETE") {
      dispatch(deleteAccount());
    } else {
      toast.error("Please type DELETE to confirm");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-black rounded-full shadow-lg border border-red-500/30 shadow-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <h2 className="text-center text-4xl font-extrabold text-red-500 tracking-wide">
          Danger Zone
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Account termination is permanent and irreversible
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-md border border-gray-800 py-10 px-6 shadow-xl rounded-2xl transition-all duration-500 hover:shadow-red-500/10">
          <div className="space-y-6">
            {!showConfirmDialog ? (
              <div>
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                  <h3 className="text-lg font-medium text-red-400 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Account Termination
                  </h3>
                  <p className="text-sm text-gray-400">
                    This action will permanently delete your account and all
                    associated data. This process cannot be undone or recovered.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <motion.button
                    type="button"
                    onClick={handleInitialDelete}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-white bg-black border border-gray-800 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete My Account
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg mb-4">
                  <p className="text-sm text-red-400 font-medium">
                    Warning: This action is permanent and cannot be undone. All
                    your data will be permanently erased.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmDelete"
                    className="text-sm font-semibold text-gray-300 flex items-center gap-2"
                  >
                    Type "DELETE" to confirm
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmDelete"
                      name="confirmDelete"
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-red-500/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:shadow-red-500/30 shadow-md transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={handleCancelDelete}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>

                  <div className="relative flex-1 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-pink-600 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <motion.button
                      type="button"
                      onClick={handleConfirmDelete}
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Confirm Delete
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteAccount;
