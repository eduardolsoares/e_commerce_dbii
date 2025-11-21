"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import AccountDropdown from "./layout/AccountDropdown";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-4 py-1.5 rounded-full text-m font-medium border border-gray-300 cursor-pointer transition-colors"
      aria-label="Sign in with Google"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 32 32"
        data-name="Layer 1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
          fill="#00ac47"
        />
        <path
          d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
          fill="#4285f4"
        />
        <path
          d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
          fill="#ffba00"
        />
        <polygon
          fill="#2ab2db"
          points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
        />
        <path
          d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
          fill="#ea4435"
        />
        <polygon
          fill="#2ab2db"
          points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
        />
        <path
          d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
          fill="#4285f4"
        />
      </svg>
      Sign in with Google
    </button>
  );
}

export function SignOutButton({ variant = "dropdown" }) {
  const baseClasses =
    "text-sm text-gray-700 hover:text-black font-medium cursor-pointer transition-all outline-none focus:ring-0 focus:outline-none bg-gray-100";
  const variantClasses = {
    dropdown: "block w-full text-left px-4 py-2",
    inline: "px-3 py-1.5 rounded-md",
  };

  return (
    <button
      onClick={() => signOut()}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      Sign out
    </button>
  );
}

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">Signed in as {session.user?.email}</div>
        <SignOutButton />
      </div>
    );
  }

  // When not signed in, don't render a second sign-in CTA. The hero primary
  // CTA should be the standalone <SignInButton /> placed in the layout.
  return null;
}

export function GetStartedButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full cursor-pointer font-medium transition-colors shadow-sm"
      aria-label="Get started with GitHub"
    >
      Get Started
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

export function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="w-24 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
    );

  if (session) {
    return (
      <AccountDropdown />
    );

  }

  return <SignInButton />;
}
