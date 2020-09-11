import React from "react";
import * as C from "./COMPONENTS";
import {ThemeProvider} from "theme-ui";
//import {SignIn} from "./components/Auth";
//import _ from "lodash";
import {SuspenseWithPerf} from "./FIREBASE";
import {useFirestore, useUser, useFirestoreDoc} from "reactfire";
const {Loader} = C;

function Dashboard() {
	const db = useFirestore();
	const docref = db.doc("views/Dashboard");
	const doc = useFirestoreDoc(docref);
	const state = doc.data();
	const user = useUser();

	return (
		<div>
			<h3>{state.name}</h3>
			<h6>signed in as {user.email}</h6>
		</div>
	);
}

const initialTheme = {
	colors: {
		primary: "#DC3F32",
		background: "white",
		text: "black",
		modes: {
			dark: {
				text: "white",
				background: "black",
				primary: "#DC3F32",
			},
		},
	},
};

export default () => {
	return (
		<ThemeProvider theme={initialTheme}>
			<SuspenseWithPerf fallback={<Loader />} tracebackId={"dashboard"}>
				<Dashboard />
			</SuspenseWithPerf>
		</ThemeProvider>
	);
};
/////FIELDMAPPER, LAYOUT,
