import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthErrors } from "../../store/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, emailForVerification } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (emailForVerification) {
      navigate("/verify-email", { state: { email: emailForVerification } });
    }
  }, [emailForVerification, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "object" ? JSON.stringify(error) : error);
    }

    return () => {
      dispatch(clearAuthErrors());
    };
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }

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
      toast.error("Please enter a password");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(register(formData));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b14] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-[#0a0b14] [background-image:linear-gradient(rgba(25,33,57,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(25,33,57,0.3)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#9921e6]/10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#21e6a6]/10 blur-[100px]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="backdrop-blur-xl bg-[#12152e]/40 border border-[#352a52] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8">
          <div className="mb-8">
            <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#faa2e6] to-[#a264ff]">
              Create your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#a264ff]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#352a52] rounded-xl bg-[#171b36]/50 text-white placeholder-[#8f9bbd] focus:outline-none focus:ring-2 focus:ring-[#a264ff] focus:border-transparent transition-all duration-200"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#a264ff]"
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
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#352a52] rounded-xl bg-[#171b36]/50 text-white placeholder-[#8f9bbd] focus:outline-none focus:ring-2 focus:ring-[#a264ff] focus:border-transparent transition-all duration-200"
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
                      className="h-5 w-5 text-[#a264ff]"
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
                    autoComplete="new-password"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-[#352a52] rounded-xl bg-[#171b36]/50 text-white placeholder-[#8f9bbd] focus:outline-none focus:ring-2 focus:ring-[#a264ff] focus:border-transparent transition-all duration-200"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-[#9921e6] to-[#e621a6] hover:from-[#a52bff] hover:to-[#ff21b6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9921e6] transition-all duration-200 shadow-[0_4px_20px_rgba(153,33,230,0.5)]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-[#faa2e6] group-hover:text-white transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            <div className="text-sm text-center text-[#8f9bbd]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#a264ff] hover:text-[#faa2e6] transition-colors duration-200"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>

        <div className="absolute -bottom-2 -left-12 w-24 h-24 bg-gradient-to-r from-[#9921e6] to-[#e621a6] rounded-full blur-xl opacity-20"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-[#faa2e6] to-[#a264ff] rounded-full blur-xl opacity-20"></div>
      </div>
    </div>
  );
};

export default Register;
