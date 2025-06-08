import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearPasswordResetErrors,
  clearPasswordResetMessages,
} from "../../store/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, ArrowRight, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { motion } from "motion/react";
import clsx from "clsx";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, success } = useSelector(
    (state) => state.passwordReset
  );

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 3000);
    }
  }, [success, navigate, email]);

  useEffect(() => {
    return () => {
      dispatch(clearPasswordResetErrors());
      dispatch(clearPasswordResetMessages());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  const AnimatedGrid = () => (
    <motion.div
      className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        duration: 40,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-20" />
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950">
      <AnimatedGrid />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="absolute h-[480px] w-[480px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={clsx(
                "absolute inset-0 rounded-full",
                "border-2 bg-linear-to-br to-transparent",
                i === 0
                  ? "border-purple-500/60"
                  : i === 1
                  ? "border-purple-400/50"
                  : "border-slate-600/30",
                "from-blue-500/30"
              )}
              animate={{
                rotate: 360,
                scale: [1, 1.05 + i * 0.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div
                className={clsx(
                  "absolute inset-0 rounded-full mix-blend-screen",
                  "bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)/10%,transparent_70%)]"
                )}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-6 text-center opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        ></motion.div>
      </div>

      <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0369A1/30%,transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0EA5E9/15%,transparent)] blur-[80px]" />
      </div>

      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border border-gray-700 bg-gray-900/60 backdrop-blur-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <CardHeader className="space-y-1">
              <div className="mx-auto h-12 w-12 rounded-full bg-gray-800 p-2 flex items-center justify-center border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white mt-4">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Enter your email and we'll send you a verification code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-950/50 border-red-800 text-red-300"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {typeof error === "object" ? JSON.stringify(error) : error}
                  </AlertDescription>
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
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      className="bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium transition-all duration-300 shadow-[0_0_15px_rgba(0,100,255,0.3)]"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <span className="mr-2">Sending</span>
                      <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    </div>
                  ) : (
                    <span className="flex items-center">
                      Send Reset Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-center w-full text-gray-300">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
