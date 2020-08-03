import React from "react";
import { AuthCheck, useAuth } from "reactfire";

// Omitted

export function AuthenticationButtons({ children }) {
  const auth = useAuth();
  const Goog = new useAuth.GoogleAuthProvider();
  const signIn = async () => {
    await auth.signInWithPopup(Goog);
  };
  const signOut = async () => {
    await auth.signOut();
  };
  // When authenticated, show the Sign out button, else Sign in
  return (
    <>
      <AuthCheck
        fallback={
          <div>
            <button className="button is-primary" onClick={signIn}>
              Sign In
            </button>
          </div>
        }
      >
        <div>
          <button className="button is-info" onClick={signOut}>
            Sign Out
          </button>
        </div>
        {children}
      </AuthCheck>
    </>
  );
}
