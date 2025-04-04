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

      </div>
    </div>
  );
}
