import * as React from "react";
//import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {
	FirebaseAppProvider,
	preloadFirestoreDoc,
	useFirebaseApp,
	preloadUser,
	preloadFirestore,
	//useFirestore,
	//useFirestoreCollectionData,
	//useFirestoreDoc,
	//StorageImage,
	//useUser,
	//useAuth,
	preloadAuth,
	SuspenseWithPerf,
	preloadStorage,

	//AuthCheck,
} from "reactfire";
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
	]);
};

const preloadData = async (firebaseApp) => {
	const user = await preloadUser(firebaseApp);

	if (user) {
		preloadFirestoreDoc(
			(firestore) => firestore.doc(`api/Users/users/${user.uid}`),
			firebaseApp
		);
	}
};

const wmgFirebaseConfig = {
	apiKey: "AIzaSyAsce1vZ82rHuTDHXlRE6wtOpeR8fo0vMM",
	authDomain: "watershed-app.firebaseapp.com",
	databaseURL: "https://watershed-app.firebaseio.com",
	projectId: "watershed-app",
	storageBucket: "watershed-app.appspot.com",
	messagingSenderId: "478129647871",
	appId: "1:478129647871:web:b3052cf16d07779fae9cca",
};
function Preload({children, fallback}) {
	const firebaseApp = useFirebaseApp();
	preloadSDKs(firebaseApp).then(preloadData(firebaseApp));
	return (
		<SuspenseWithPerf fallback={fallback} traceId={"preload-main-app"}>
			{children}
		</SuspenseWithPerf>
	);
}
export function FirebaseApp({
	children,
	config = wmgFirebaseConfig,
	fallback = "...loading",
}) {
	return (
		<FirebaseAppProvider firebaseConfig={config}>
			<Preload fallback={fallback}>{children}</Preload>
		</FirebaseAppProvider>
	);
}
export {SuspenseWithPerf};

////AUTH////
//function Auth() {
//	let main = {};
//	const SignIn = () => {

//		const uiConfig = {
//			signInFlow: "popup",
//			signInOptions: [
//				auth.GoogleAuthProvider.PROVIDER_ID,
//				auth.EmailAuthProvider.PROVIDER_ID,
//				auth.TwitterAuthProvider.PROVIDER_ID,
//			],
//			callbacks: {
//				// Avoid redirects after sign-in.
//				signInSuccessWithAuthResult: () => false,
//			},
//		};

//		return (
//			<Item>
//				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
//			</Item>
//		);
//	};

//	const SignOut = (props) => {
//		const auth = useAuth();
//		const signOut = () => auth.signOut().then(() => console.log("signed out"));

//		return (
//			<Button layout onClick={() => signOut()}>
//				Sign Out
//			</Button>
//		);
//	};
//	main.views.SignIn = SignIn;
//	main.views.SignOut = SignOut;

//	return main;
//}

//const useC = (id) => {
//	const firestore = useFirestore;
//	const db = firestore();
//	const {FieldValue} = firestore;
//	const collref = db.collection("app");
//	const docref = collref.doc(id);
//	const doc = useFirestoreDoc(docref);

//	return [
//		doc,
//		{
//			docref,
//			deleteDoc: docref.delete(),
//			add: ({name, ...rest}) => collref.add({name: name, ...rest}),
//			set: (data) => docref.set(data, {merge: true}),
//			update: (data) => docref.update(data),
//			arrayUnion: (key, arr) =>
//				docref.update({[key]: FieldValue.arrayUnion([...arr])}),
//			arrayRemove: (key, arr) =>
//				docref.update({[key]: FieldValue.arrayRemove([...arr])}),
//			incrementField: (key, num) =>
//				docref.update({[key]: FieldValue.increment(num)}),
//			removeField: (key) => docref.update({[key]: FieldValue.delete()}),
//		},
//	];
////};
//const useCollection = (id) => {
//	const [doc, {docref, ...rest}] = useRootFirestoreDoc(id);
//	const collref = docref.collection("data");
//	const collection = useFirestoreCollectionData(collref, {idField: "id"});
//	return [collection, {collref, docref, ...rest}];
//};
//function useDoc(docid, collid) {
//	const [collection, {collref, add}] = useCollection(collid);

//	return [doc, options];
//}
