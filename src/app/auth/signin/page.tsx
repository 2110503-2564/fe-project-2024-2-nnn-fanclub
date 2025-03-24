'use client';

import Link from 'next/link';
import { Mail, KeyRound, CircleX } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log(email, password);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  }

  useEffect(() => {
    // wait for browser autofill to finish
    const timer = window.setTimeout(() => {
      const emailEl = document.querySelector<HTMLInputElement>('input[type="email"]');
      const passEl = document.querySelector<HTMLInputElement>('input[type="password"]');
      if (emailEl?.value) setEmail(emailEl.value);
      if (passEl?.value) setPassword(passEl.value);
    }, 200);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex min-h-screen items-center justify-center bg-foreground">
      <div className="bg-c2 p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-c1">NNN</div>
        </div>
        <h2 className="text-xl font-bold mt-4">Welcome Back!</h2>
        { error && (
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
          <input autoComplete="email" type="email" placeholder="Enter your email" className="input input-bordered w-full mt-1" onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mt-4 text-left">
          <label className="text-sm font-semibold flex items-center space-x-2">
            <KeyRound className="w-4 h-4" />
            <span>Password</span>
          </label>
          <input autoComplete="password" type="password" placeholder="Enter your password" className="input input-bordered w-full mt-1" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button className="btn mt-5 px-2 py-1 w-full md:px-4 md:py-2 bg-black text-white rounded-md text-xs hover:bg-white hover:text-black hover:border-black transition duration-500 ease-in-out" type="submit">
          <span className="flex items-center space-x-2">
            <span className="text-sm">Sign-in</span>
          </span>
        </button>
        <div className="divider mt-6"></div>
        <p className="text-sm">
          Don’t register?{' '}
          <Link href="/auth/register" className="font-bold underline">Register here.</Link>
        </p>
      </div>
    </form>
  );
}
