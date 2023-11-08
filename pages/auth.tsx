import axios from "axios";

import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Input from "@/components/input";

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    // switch login and create account
    const [variant, setVariant] = useState("signIn");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === "signIn" ? "signUp" : "signIn"
        );
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);

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
        <div className="h-full w-full relative bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="h-full w-full bg-black lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img
                        src="/images/logo.png"
                        alt="Logo Netflix"
                        className="h-12"
                    />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "signIn" ? "Sign in" : "Sign up"}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {variant === "signUp" && (
                                <Input
                                    id="name"
                                    type="text"
                                    label="Username"
                                    value={name}
                                    onChange={(e: any) =>
                                        setName(e.target.value)
                                    }
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
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        <button
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                            onClick={variant === "signIn" ? login : register}
                        >
                            {variant === "signIn" ? "Log in" : "Register"}
                        </button>

                        <div className="flex flex-grow items-center gap-4 mt-8 justify-center">
                            <div
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition"
                                onClick={() =>
                                    signIn("google", { callbackUrl: "/" })
                                }
                            >
                                <FcGoogle size={30} />
                            </div>

                            <div
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition"
                                onClick={() =>
                                    signIn("github", { callbackUrl: "/" })
                                }
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>

                        <p className="text-neutral-500 mt-10">
                            {variant === "signIn"
                                ? "First time using Netflix?"
                                : "Already have an account?"}
                            <span
                                className="text-white ml-1 hover:underline cursor-pointer"
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
