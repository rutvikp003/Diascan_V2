"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateProfile, fetchProfile } from "@/src/slices/profileSlice";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Profile | Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Profile page is here.");
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const profile = useSelector((state: RootState) => state.profile.profile);

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch user profile on component mount
  useEffect(() => {
    dispatch(fetchProfile() as any);
  }, [dispatch]);

  // Update state when profile data is available
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setDob(profile.dob || "");
      setGender(profile.gender || "");
      setImage(profile.profileImage || null);
    }
  }, [profile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = { 
      name, 
      email, 
      dob, 
      gender, 
      profileImage: image 
    };
    dispatch(updateProfile(updatedProfile) as any);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("Email");
    dispatch({ type: "LOGOUT" });
    window.location.href = "/signin";
  };

  return (
  <>
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-5xl rounded-lg bg-gray-200 p-8 shadow-lg dark:bg-dark">
            <h2 className="text-3xl font-bold text-center mb-6">
              Profile Page
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Profile Image */}
              <div
                className="relative cursor-pointer rounded-full border-4 border-primary p-1 overflow-hidden w-40 h-40 md:w-52 md:h-52 shadow-lg"
                onClick={handleImageClick}
              >
                <Image
                  src={image || "/images/profile/profile.jpg"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full object-cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* User Details Form */}
              <div className="flex-1">
                <form className="space-y-4" onSubmit={handleUpdateProfile}>
                  <div>
                    <label className="text-sm text-dark dark:text-white">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-400 dark:bg-gray-800 text-white border border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-dark dark:text-white">Email</label>
                    <input
                      type="email"
                      defaultValue={email}
                      readOnly={user?.authType === "google"}
                      className="w-full p-3 rounded-lg bg-gray-400 dark:bg-gray-800 text-white border border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-dark dark:text-white">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-400 dark:bg-gray-800 text-white border border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-dark dark:text-white">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-400 dark:bg-gray-800 text-white border border-gray-700"
                    >
                      <option value="">Select Gender</option>
                      <option id="1" value="male">Male</option>
                      <option id="2" value="female">Female</option>
                      <option id="3" value="other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="shadow-submit dark:shadow-submit-dark w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </form>
                <button
                  onClick={handleLogout}
                  className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
                >
                  Logout
                </button>
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
        </div>
      </div>
    </section>
    </>
  );
};

export default ProfilePage;
