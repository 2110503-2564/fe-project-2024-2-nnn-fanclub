"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { userRegister } from "@/libs/uerRegister";
import { useSession } from "next-auth/react";
import Links from "next/link";
import { Mail, KeyRound, CircleX, User, Phone, Lock } from "lucide-react";

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await userRegister({ ...formData } as UserModel);
      if (res.message !== "Register Success") {
        setError(res.message);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Auto-login failed. Please log in manually.");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }

    setLoading(false);
  };

  if (session) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen items-center justify-center bg-foreground"
    >
      <div className="bg-c2 p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="flex justify-center">
          <Lock size={30} />
        </div>
        <h2 className="text-xl font-bold mt-4">Register here</h2>
        {error && (
          <div className="mt-4 flex items-start bg-red-100 border border-red-400 rounded-md p-4">
            <div className="flex-shrink-0 rounded-full p-1">
              <CircleX className="text-red-600" />
            </div>
            <div className="ml-3 text-left">
              <p className="font-semibold text-red-800">Error!</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        <div className="mt-4 text-left">
          <label className="text-sm font-semibold flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>E-mail</span>
          </label>
          <input
            name="email"
            autoComplete="email"
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mt-1"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 text-left">
          <label className="text-sm font-semibold flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Name</span>
          </label>
          <input
            name="name"
            autoComplete="name"
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full mt-1"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 text-left">
          <label className="text-sm font-semibold flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Telephone</span>
          </label>
          <input
            name="telephone"
            autoComplete="tel"
            type="tel"
            placeholder="Enter your telephone"
            className="input input-bordered w-full mt-1"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4 text-left">
          <label className="text-sm font-semibold flex items-center space-x-2">
            <KeyRound className="w-4 h-4" />
            <span>Password</span>
          </label>
          <input
            name="password"
            autoComplete="new-password"
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full mt-1"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="btn mt-5 px-2 py-1 w-full md:px-4 md:py-2 bg-black text-white rounded-md text-xs hover:bg-white hover:text-black hover:border-black transition duration-500 ease-in-out"
          type="submit"
          disabled={loading}
        >
          <span className="flex items-center space-x-2">
            <span className="text-sm">{loading ? "Registering..." : "Register"}</span>
          </span>
        </button>
        <div className="divider mt-6"></div>
        <p className="text-sm">
          Do you have an account?{' '}
          <Links href="/auth/signin" className="font-bold underline">Login here.</Links>
        </p>
      </div>
    </form>
  );
}