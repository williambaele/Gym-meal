import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Azerty123!");

  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="h-screen">
      <body className="bg-[#0b0b0b] flex h-full items-center py-16">
        <main className="w-full max-w-md p-6 mx-auto">
          <div className="mt-7 bg-[#232323] rounded-xl shadow-sm dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-200">
                  Sign in
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  Don't have an account yet?{" "}
                  <a
                    className="text-[#593EFE] decoration-2 hover:underline font-medium"
                    href="/signup"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-400"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          className="block w-full px-4 py-3 text-sm rounded-md outline-none hover:outline-none"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm text-gray-400"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          className="block w-full px-4 py-3 text-sm rounded-md outline-none hover:outline-none "
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#593EFE] text-white hover:bg-[#593EFE]/80 focus:outline-none  transition-all text-sm "
                    >
                      Sign in
                    </button>
                    {error && <p>{error}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </body>
    </div>
  );
};

export default Login;
