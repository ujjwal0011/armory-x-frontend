import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearAuthErrors } from "../../store/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, error]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthErrors());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login(formData));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b14] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-[#0a0b14] [background-image:linear-gradient(rgba(25,33,57,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(25,33,57,0.3)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4d21e6]/10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#21a6e6]/10 blur-[100px]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="backdrop-blur-xl bg-[#12152e]/40 border border-[#2a2f52] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#a2facf] to-[#64acff]">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#64acff]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#2a2f52] rounded-xl bg-[#171b36]/50 text-white placeholder-[#8f9bbd] focus:outline-none focus:ring-2 focus:ring-[#64acff] focus:border-transparent transition-all duration-200"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#64acff]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#2a2f52] rounded-xl bg-[#171b36]/50 text-white placeholder-[#8f9bbd] focus:outline-none focus:ring-2 focus:ring-[#64acff] focus:border-transparent transition-all duration-200"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#64acff] hover:text-[#a2facf] transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[#4d21e6] to-[#21a6e6] hover:from-[#5a2bff] hover:to-[#21b6ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4d21e6] transition-all duration-200 shadow-[0_4px_20px_rgba(77,33,230,0.5)]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-[#a2facf] group-hover:text-white transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="text-sm text-center text-[#8f9bbd]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#64acff] hover:text-[#a2facf] transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </form>
        </div>

        <div className="absolute -bottom-2 -right-12 w-24 h-24 bg-gradient-to-r from-[#4d21e6] to-[#21a6e6] rounded-full blur-xl opacity-20"></div>
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-[#a2facf] to-[#64acff] rounded-full blur-xl opacity-20"></div>
      </div>
    </div>
  );
};

export default Login;
