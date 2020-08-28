import React from "react";
import createPersistedState from "use-persisted-state";

import {Frame, Stack, Page, Scroll} from "framer";
import _ from "lodash";
import {preloadFirestore} from "reactfire";
import {
	preloadFirestoreDoc,
	useFirebaseApp,
	preloadUser,
	preloadAuth,
	useFirestore,
	SuspenseWithPerf,
	preloadStorage,
	useFirestoreDocData,
	preloadRemoteConfig,
} from "reactfire";
import {Loader} from "./Loader";
const preloadSDKs = (firebaseApp) => {
	return Promise.all([
		preloadFirestore({
			firebaseApp,
			setup(firestore) {
				return firestore().enablePersistence({synchronizeTabs: true});
			},
		}),
		preloadStorage({
			firebaseApp,
			setup(storage) {
				return storage().setMaxUploadRetryTime(10000);
			},
		}),
		preloadAuth({firebaseApp}),
		preloadRemoteConfig({
			firebaseApp,
			setup(remoteConfig) {
				remoteConfig().settings = {
					minimumFetchIntervalMillis: 10000,
					fetchTimeoutMillis: 10000,
				};
				return remoteConfig().fetchAndActivate();
			},
		}),
	]);
};

const preloadData = async (firebaseApp) => {
	const user = await preloadUser(firebaseApp);

	if (user) {
		preloadFirestoreDoc(
			(firestore) => firestore.doc("api/accounts"),
			firebaseApp
		);
	}
};
const useGlobalState = createPersistedState("test");

export default () => {
	const firebaseApp = useFirebaseApp();
	preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
	const [state, setState] = useGlobalState({name: "WMG"});
	return (
		<SuspenseWithPerf fallback={"loading"} traceId={"main-app"}>
			<Dashboard />
		</SuspenseWithPerf>
	);
};

function Dashboard(props) {
	const ref = React.createRef();
	const db = useFirestore();

	const accountRef = db.collection("api").doc("accounts");
	const account = useFirestoreDocData(accountRef, {
		startWithValue: {
			name: "Account Settings",
			admins: ["garmon@gnome.garden"],
			reports: {financial: {grossIncome: 3445}},
		},
	});
	accountRef.set(
		{
			name: "Account Settings",
			admins: ["garmon@gnome.garden"],
			reports: {financial: {grossIncome: 3445}},
		},
		{merge: true}
	);
	React.useEffect(() => {
		console.log(ref.current);
	}, [ref]);
	return (
		<div style={{minHeight: "100vh", position: "relative"}}>
			<h1>{account.name}</h1>
			<Frame center whileTap={{scale: 1.2}}>
				<Frame
					center
					animate={{x: props.x}}
					transition={{mass: 2}}
					background={"red"}
					size="50%"
				/>
			</Frame>
		</div>
	);
}
//animation controls
//globalState.animationEditorState
