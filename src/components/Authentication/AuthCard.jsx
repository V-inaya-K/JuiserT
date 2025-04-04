// 'use client';

// import { SignIn, SignUp } from '@clerk/nextjs';


// export default function AuthCard() {
//   const [mode, setMode] = useState<'signin' | 'signup'>('signin');

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
//         </h2>

//         {mode === 'signin' ? <SignIn afterSignInUrl="/" /> : <SignUp afterSignUpUrl="/" />}

//         <p className="mt-4 text-center text-sm text-gray-600">
//           {mode === 'signin' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
//           <button
//             onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
//             className="text-blue-600 hover:underline"
//           >
//             {mode === 'signin' ? 'Sign up' : 'Sign in'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
export default function AuthCard({ children }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
      {children}
    </div>
  );
}
