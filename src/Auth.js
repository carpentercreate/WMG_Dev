import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { SuspenseWithPerf, useUser, useAuth } from "reactfire";
import { motion } from "framer-motion";
const signOut = auth => auth.signOut().then(() => console.log("signed out"));

const UserDetails = ({ user }) => {
  const auth = useAuth();

  return (
    <>
      <button onClick={() => signOut(auth)}>Sign Out {user.displayName}</button>
    </>
  );
};

const SignInForm = () => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

const FirebaseAuthStateButton = ({
  style = {
    position: "absolute",
    bottom: 0,
    right: 0
  }
}) => {
  const user = useUser();
  return (
    <motion.div layout style={style}>
      {user ? <UserDetails user={user} /> : <SignInForm />}
    </motion.div>
  );
};

const AuthButton = props => {
  return (
    <SuspenseWithPerf
      traceId={"firebase-user-wait"}
      fallback={<p>loading...</p>}
    >
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  );
};

export default AuthButton;
