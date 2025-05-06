"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DynamicForm } from "ui/organisms/DynamicForm";
import { loginSchema } from "lib/validation/form.schema"
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });
      if (res?.error) {
        setError( "Invalid email or password.");
        console.error("sign in error", res.error);
      } else if (res?.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("An unexpected error occurred during login.");
        console.error("Unexpected error during login", res);
      }
    } catch (err: unknown) {
      console.error("Login failed", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <DynamicForm 
            type="login" 
            onSubmit={handleLogin} 
            isLoading={loading}
            globalError={error}
        />
       
        <p className="mt-4 text-center text-sm text-gray-600"> 
          Or{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create an account
          </Link>
        </p>
      </div>
    </div>
  );
}




//  <form
//           className="mt-8 space-y-6 bg-white p-8 shadow-lg rounded-lg"
//           onSubmit={handleSubmit}
//         >
//           <input type="hidden" name="remember" defaultValue="true" />
//           {error && (
//             <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
//               {error}
//             </div>
//           )}
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
        
//               <button
//                 type="button" 
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {/* Use text or icons */}
//                 {showPassword ? (
//                     // <EyeOffIcon className="h-5 w-5" /> // Example icon
//                     <span>Hide</span>
//                   ) : (
//                     // <EyeIcon className="h-5 w-5" /> // Example icon
//                     <span>Show</span>
//                   )}
//                 </button>
//               </div>
//             </div>
  
//             {/* Optional: Remember me / Forgot password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <a
//                   href="#" // Replace with actual forgot password link
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>
  
//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </div>
//           </form> 