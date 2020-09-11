import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {motion} from "framer-motion";
import {useAuth} from "reactfire";

export const SignIn = () => {
	const auth = useAuth;

	const uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			auth.GoogleAuthProvider.PROVIDER_ID,
			auth.EmailAuthProvider.PROVIDER_ID,
			auth.TwitterAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false,
		},
	};

	return (
		<motion.div layout>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
		</motion.div>
	);
};

export const SignOut = (props) => {
	const auth = useAuth();
	const signOut = () => auth.signOut().then(() => console.log("signed out"));

	return (
		<motion.button layout onClick={() => signOut()}>
			Sign Out
		</motion.button>
	);
};
