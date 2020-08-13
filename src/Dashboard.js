import React from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	useUser,
	//AuthCheck,
	//StorageImage,
	//useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
import {ThemeProvider} from "theme-ui";
import {
	//Page,
	Frame,
	//StackX,
	//StackY,
	SwipeX,
	//SwipeY,
} from "./components/Layouts";
//User
//const User = ({id}) => {
//	const db = useFirestore();
//	//const {FieldValue} = useFirestore;
//	const userref = db.collection("users").doc(id);
//	const profile = useFirestoreDocData(userref);

//	return <>{id ? <h1>{profile.name}</h1> : <h4>no user</h4>}</>;
//};

//function Accounts({children}) {
//	return <div className="Accounts">{children}</div>;
//}
//function Reports({children}) {
//	return <div className="Reports">{children}</div>;
//}
//function Songs({children}) {
//	return <div className="Songs">{children}</div>;
//}
//function Journals({children}) {
//	return <div className="Journals">{children}</div>;
//}

function Main() {
	const db = useFirestore();
	const user = useUser();
	const accountsRef = db
		.collection("accounts")
		.where("admins", "array-contains", user.email);
	const accounts = useFirestoreCollectionData(accountsRef, {idField: "id"});
	const selectedAccount = accounts[0];
	const songsRef = db
		.collection("songs")
		.where("interestedParties", "array-contains", selectedAccount.id);
	const songs = useFirestoreCollectionData(songsRef, {idField: "id"});
	const selectedSong = songs[0];
	const reportsRef = db
		.collection("reports")
		.where("interestedParties", "array-contains", selectedAccount.id);

	const reports = useFirestoreCollectionData(reportsRef);
	console.log(selectedAccount.id);
	return (
		<SuspenseWithPerf fallback={"loading data"} traceId="poo">
			<SwipeX size="100%">
				<Frame background="red">{user.displayName}</Frame>
				<Frame background="blue">{selectedSong.name}</Frame>
				<Frame background="white">${reports[0].grossIncome}.00</Frame>
			</SwipeX>
		</SuspenseWithPerf>
	);
}

export function Dashboard() {
	return (
		<>
			<ThemeProvider
				theme={{colors: {background: "white", text: "black", primary: "red"}}}>
				<>
					<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
						<Main />
					</SuspenseWithPerf>
				</>
			</ThemeProvider>
		</>
	);
}
