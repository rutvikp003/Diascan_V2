"use client";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../src/slices/authSlice";
import { useRouter } from "next/navigation";


const SignUp = () => {
  useEffect(() => {
    document.title = "Sign up | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign up to access Diascan features.");
  }, []);
  
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      dispatch(setUser(data.user)); // Save user in Redux
      router.push("/"); // Redirect to Home after signup
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-xl mx-auto max-w-[600px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
              </h3>

              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[120px] bg-body-color/50 sm:block" />
                <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  register with your email
                </p>
                <span className="hidden h-[1px] w-full max-w-[120px] bg-body-color/50 sm:block"/>
              </div>

            <form 
              className="space-y-4"
              onSubmit={handleSubmit}
              >
              <div>
                <label 
                  htmlFor="name"
                  className="mb-3 block text-sm text-dark dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  className="border-stroke dark:text-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                    htmlFor="email"
                    className="mb-3 block text-sm text-dark dark:text-white">
                  {" "}Email{" "}
                </label>
                <input 
                  type="text" 
                  id="email"
                  name="email"
                  placeholder="Enter your email" 
                  value={formData.email}
                  className="border-stroke dark:text-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-3 block text-sm text-dark dark:text-white"
                >
                  {" "}Your Password{" "}
                </label>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  placeholder="Enter your password" 
                  value={formData.password}
                  className="border-stroke dark:text-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-dark outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  onChange={handleChange}
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
                      required
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
                <div className="mb-8">
                <button 
                  type="submit" 
                  className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                  disabled= {loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </button>
                </div>  
              </form>
              
              {error && (
                <>
                  <div className={`mt-4 text-2xl text-center font-semibold ${error ? "text-green-600" : "text-red-600"}`}>
                      {error}
                  </div>
                  <p className="text-center mt-4">
                    Already have an account? {" "}
                    <a href="/signin" className="text-blue-400">
                      Sign in
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
  );
};

export default SignUp;
