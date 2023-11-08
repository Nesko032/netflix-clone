import axios from "axios";

import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";

import Input from "@/components/input";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // switch login and create account
  const [variant, setVariant] = useState("signIn");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "signIn" ? "signUp" : "signIn",
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo Netflix" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="mt-2 w-full self-center rounded-md bg-black bg-opacity-70 p-16 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === "signIn" ? "Sign in" : "Sign up"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "signUp" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
              onClick={variant === "signIn" ? login : register}
            >
              {variant === "signIn" ? "Log in" : "Register"}
            </button>

            <div className="mt-8 flex flex-grow items-center justify-center gap-4">
              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-70"
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
              >
                <FcGoogle size={30} />
              </div>

              <div
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-70"
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className="mt-10 text-neutral-500">
              {variant === "signIn"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="ml-1 cursor-pointer text-white hover:underline"
                onClick={toggleVariant}
              >
                {variant === "signIn"
                  ? "Create an account"
                  : "Login with account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
