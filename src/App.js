import React from "react";

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

export default () => {
	const firebaseApp = useFirebaseApp();
	preloadSDKs(firebaseApp).then(preloadData(firebaseApp));

	return (
		<SuspenseWithPerf fallback={"loading"} traceId={"main-app"}>
			<Dashboard />
		</SuspenseWithPerf>
	);
};
function Dashboard() {
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

	return (
		<div>
			<h1>{account.name}</h1>
			<Loader />
		</div>
	);
}
