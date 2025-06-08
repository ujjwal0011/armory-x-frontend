import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateProfile,
  updateProfileReset,
  clearProfileErrors,
  clearProfileMessages,
} from "../../store/slice/userSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, RefreshCcw } from "lucide-react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearProfileMessages());
    }

    if (isUpdated) {
      dispatch(getUserProfile());
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, message, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { name };
    dispatch(updateProfile(profileData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="text-center text-4xl font-extrabold text-cyan-400 tracking-wide">
          Your Profile
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-black/50 backdrop-blur-md border border-gray-800 py-10 px-6 shadow-xl rounded-2xl transition-all duration-500 hover:shadow-cyan-500/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-cyan-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:shadow-cyan-500/30 shadow-md transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  disabled
                  className="cursor-not-allowed w-full px-4 py-2 rounded-md bg-gray-800 text-gray-400 border border-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="relative group mt-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer relative w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-white bg-black border border-gray-800 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                >
                  <RefreshCcw className="w-4 h-4" />
                  {loading ? "Updating..." : "Update Profile"}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
