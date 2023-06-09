"use client";

import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  // ** auth methods
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  // ** login
  const handleLogin = () => {
    loginWithRedirect();
  };

  // ** logout
  const handleLogout = () => {
    logout();
  };

  return (
    <main className="flex flex-col p-24 space-y-8">
      <div className="space-y-2">
        <p className="font-bold text-6xl">Welcome</p>
        <p className="font-bold text-6xl">{user?.name}</p>
        {isAuthenticated ? null : (
          <p className="text-lg">
            To Access the other page, Please Sign In your Github Account
          </p>
        )}
      </div>
      {isAuthenticated ? (
        <button
          className="bg-blue-400 py-2 px-5 rounded-md self-center"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="bg-blue-400 py-2 px-5 rounded-md self-center"
          onClick={handleLogin}
        >
          Sign In
        </button>
      )}
    </main>
  );
}
