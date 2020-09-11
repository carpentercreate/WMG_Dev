import React, {useState, useRef} from "react";
import * as C from "./COMPONENTS";
import {ThemeProvider} from "theme-ui";
//import {SignIn} from "./components/Auth";
//import {
//	useTransform,
//	motion,
//	useMotionValue,
//	AnimateSharedLayout,
//	AnimatePresence,
//} from "framer-motion";
//import {Page, Color} from "framer";
//import _ from "lodash";

//import _ from "lodash";
import {SuspenseWithPerf} from "./FIREBASE";
import {useFirestore, useUser, useFirestoreDoc} from "reactfire";
const {Loader} = C;
function Input({name, ...rest}) {
	const ref = useRef();
	const [selected, setSelected] = useState("");

	const getSelection = () =>
		ref.current.value.substring(
			ref.current.selectionStart,
			ref.current.selectionEnd
		);
	return (
		<>
			{/*<button onClick={() => (ref)}>H</button>*/}
			<h6>{selected}</h6>
			<input
				ref={ref}
				onSelect={() => setSelected(getSelection())}
				className="Input"
				{...rest}
			/>
		</>
	);
}
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
			<Input />
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
