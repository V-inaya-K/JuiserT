import '../styles/globals.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default MyApp;

// ----------------------------------
// import { ClerkProvider } from "@clerk/nextjs";
// import type { AppProps } from "next/app";

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <ClerkProvider>
//       <Component {...pageProps} />
//     </ClerkProvider>
//   );
// }

// export default MyApp;
