import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  updatePasswordReset,
  clearProfileErrors,
  clearProfileMessages,
} from "../../store/slice/userSlice";
import toast from "react-hot-toast";
import { Shield, Key, Check, Lock, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProfileErrors());
    }

    if (message) {
      toast.success(message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(clearProfileMessages());
    }

    if (isUpdated) {
      dispatch(updatePasswordReset());
    }
  }, [dispatch, error, message, isUpdated]);

  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength += 1;
      if (newPassword.match(/[A-Z]/)) strength += 1;
      if (newPassword.match(/[0-9]/)) strength += 1;
      if (newPassword.match(/[^A-Za-z0-9]/)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const validatePassword = () => {
    if (newPassword.length < 8 || newPassword.length > 32) {
      setPasswordError("Password must be between 8 and 32 characters");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    const passwordData = { oldPassword, newPassword };
    dispatch(updatePassword(passwordData));
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-700";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-cyan-400";
      default:
        return "bg-gray-700";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
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
          <div className="p-3 bg-black rounded-full shadow-lg border border-cyan-500/30 shadow-cyan-500/20">
            <Shield className="h-8 w-8 text-cyan-400" />
          </div>
        </div>
        <h2 className="text-center text-4xl font-extrabold text-cyan-400 tracking-wide">
          Update Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Strengthen your account with a secure password
        </p>
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
                <Key className="w-4 h-4 text-cyan-400" />
                Current Password
              </label>
              <div className="mt-1">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-cyan-500/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:shadow-cyan-500/30 shadow-md transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-cyan-500/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:shadow-cyan-500/30 shadow-md transition-all duration-300"
                />
              </div>

              {newPassword && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">
                      Password Strength
                    </span>
                    <span className="text-xs font-medium text-cyan-400">
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full ${getStrengthColor()} shadow-lg`}
                      style={{ width: `${passwordStrength * 25}%` }}
                    ></div>
                  </div>
                  <div className="mt-1.5 text-xs text-gray-500">
                    Use 8+ characters with letters, numbers & symbols
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-cyan-500/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:shadow-cyan-500/30 shadow-md transition-all duration-300"
                />
              </div>
            </div>

            {passwordError && (
              <div className="text-red-400 text-sm bg-red-900/20 py-2 px-3 rounded-lg border border-red-500/30">
                {passwordError}
              </div>
            )}

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
                  {loading ? "Updating..." : "Update Password"}
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
