"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../../../../config/axiosConfig';

export default function CreatePassword() {
  const params = useParams();
  const { companyId, userId } = params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_URL;

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const validateForm = () => {
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Password too short",
        text: "Password must be at least 8 characters long.",
        toast: true,
        position: "bottom-right",
        timer: 3000,
        showConfirmButton: false,
      });
      return false;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please ensure both passwords match.",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post(`${apiEndpoint}create-user-password/${companyId}/${userId}`, {
          userId,
          companyId,
          password,
      });

      if (response.success === false) {
        throw new Error("Server error");
      }

      Swal.fire({
        icon: "success",
        title: "Password Created!",
        text: "Your password has been updated successfully.",
        toast: true,
        position: "bottom-right",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        toast: true,
        position: "bottom-right",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <main className="flex min-h-screen p-0">
      <div className="w-full">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 sm:p-8">
                <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Password
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Password Field */}
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-9"
                    >
                      {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-2 top-9"
                    >
                      {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                    <button 
                    type="submit" 
                    className="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Create Password
                    </button>
                </form>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Unable to Create Password?{" "}
                  <a
                    href="https://www.ilevatech.com/contact"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
