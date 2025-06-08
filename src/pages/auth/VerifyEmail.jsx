import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyEmail,
  resendVerificationOTP,
  clearAuthErrors,
} from "../../store/slice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else if (!email) {
      navigate("/register");
    }
  }, [location.state, navigate, email]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(verifyEmail({ email, otp }));
  };

  const handleResendOTP = () => {
    dispatch(resendVerificationOTP({ email }));
    setResendDisabled(true);
    setCountdown(60);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 backdrop-blur-sm bg-gray-900/70 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            We've sent a verification code to{" "}
            <span className="text-purple-400 font-medium">{email}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative">
            {typeof error === "object" ? JSON.stringify(error) : error}
          </div>
        )}

        {message && (
          <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg relative">
            {message}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="relative group">
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 bg-gray-800/50 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all duration-300"
                placeholder="Enter 6-digit verification code"
                value={otp}
                onChange={handleOtpChange}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg overflow-hidden">
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </span>
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className="font-medium text-purple-400 hover:text-purple-300 disabled:text-gray-600 transition-colors duration-300 cursor-pointer"
            >
              {resendDisabled
                ? `Resend code in ${countdown}s`
                : "Didn't receive the code? Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
