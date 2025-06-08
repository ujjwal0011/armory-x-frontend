import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearPasswordResetErrors,
  resetPasswordReset,
} from "../../store/slice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  ArrowRight,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, message, success } = useSelector(
    (state) => state.passwordReset
  );

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(resetPasswordReset());

    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password");
    }
  }, [dispatch, navigate, location.state]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetPasswordReset());
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearPasswordResetErrors());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      })
    );
  };

  const handleResendCode = () => {
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <Card className="border border-gray-800 bg-gray-950/50 backdrop-blur-sm shadow-[0_0_15px_rgba(180,100,255,0.2)]">
          <CardHeader className="space-y-1">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-900 p-2 flex items-center justify-center border border-gray-800 shadow-[0_0_10px_rgba(180,100,255,0.3)]">
              <KeyRound className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white mt-4">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter the verification code sent to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-950/50 border-red-800 text-red-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert className="bg-green-950/50 border-green-800 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-medium text-gray-300"
                >
                  Verification Code
                </label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  placeholder="Enter verification code"
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-medium transition-all duration-300 shadow-[0_0_15px_rgba(180,100,255,0.3)]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <span className="mr-2">Resetting</span>
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                  </div>
                ) : (
                  <span className="flex items-center">
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-gray-400">
              <Button
                variant="link"
                onClick={handleResendCode}
                className="cursor-pointer text-purple-400 hover:text-purple-300 p-0 h-auto font-medium"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Resend verification code
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
