import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        {isSignUp ? (
          <SignUp routing="path" path="/auth/sign-up" />
        ) : (
          <SignIn routing="path" path="/auth/sign-in"  />
        )}

        {/* <button
          className="mt-4 text-blue-500"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button> */}
      </div>
    </div>
  );
}
