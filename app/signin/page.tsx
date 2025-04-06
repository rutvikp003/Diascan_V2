"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {
  useEffect(() => {
    document.title = "Sign in | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign in to access Diascan features.");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Email/Password Sign-In
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      localStorage.setItem("token", data.token); // Store JWT
      localStorage.setItem("user_id", JSON.stringify(data.user)); // Store user data
      localStorage.setItem("Email", JSON.stringify(data.user.email)); // Store user Email

      
      setTimeout(() => {
        router.refresh() // Redirect after reload
      }, 100);
      router.push("/profile"); // Redirect to profile/dashboard

    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <>
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
          <div className="shadow-three mx-auto max-w-[600px] rounded bg-gray-100 px-6 py-10 dark:bg-dark sm:p-[60px]">
            <h2 className="text-3xl font-bold text-center mb-6">
              Sign in to your account
            </h2>

            <div className="mb-8 flex items-center justify-center">
              <span className="hidden h-[1px] w-full max-w-[120px] bg-body-color/50 sm:block">
              </span>
              <p className="w-full px-5 text-center text-base font-medium text-body-color">
              Or, sign in with your email
              </p>
              <span className="hidden h-[1px] w-full max-w-[120px] bg-body-color/50 sm:block"></span>
            </div>

            <form 
            className="space-y-4"
            onSubmit={handleSubmit}>
              <div>
                <label 
                htmlFor="email"
                className="mb-3 block text-sm text-dark dark:text-white">
                  Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-gray-200 text-white border border-gray-700 mb-3 dark:bg-gray-800"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-dark dark:text-white">
                  Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-gray-200 text-white border border-gray-700 mb-3 dark:bg-gray-800"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        By creating account means you agree to the
                        <a href="/Guidelines" className="text-primary hover:underline">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        , and our
                        <a href="/Guidelines" className="text-primary hover:underline">
                          {" "}
                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>
              <button
                type="submit"
                className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"              >
                Sign in
              </button>
            </form>
              
            {error && (
              <>
                <div className={`mt-4 text-2xl text-center font-semibold ${error ? "text-green-600" : "text-red-600"}`}>
                    {error}
                </div>
                <p className="text-center mt-4 text-gray-400">
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-blue-400 hover:underline">
                    Sign up
                  </a>
                </p>
              </>
              )}


          </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
    </section>
    </>
  );
};

export default SignIn;