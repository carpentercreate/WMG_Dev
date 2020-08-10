import React from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	useUser,
	AuthCheck,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";

import {MainViews} from "./components";
import LoginBtn from "./Auth";

//User
const User = ({id}) => {
	const db = useFirestore();
	//const {FieldValue} = useFirestore;
	const userref = db.collection("users").doc(id);
	const profile = useFirestoreDocData(userref);

	return <>{id ? <h1>{profile.name}</h1> : <h4>no user</h4>}</>;
};

function Providers() {
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
	//const selectedSong = songs[0];
	//const journalsRef = db
	//	.collection("journals")
	//	.where("songID", "==", selectedSong.id);
	//const journals = useFirestoreCollectionData(journalsRef, {idField: "id"});

	//const [menuIsOpen, toggleMenu] = useToggle(false);
	//const [selected, setSelected] = useState();

	return (
		<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
			<MainViews>
				<User id={user.uid} />
				<h1>{songs[0].name}</h1>
			</MainViews>
		</SuspenseWithPerf>
	);
}

export function Dashboard() {
	return (
		<>
			<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
				<AuthCheck fallback={<LoginBtn />}>
					<Providers />
				</AuthCheck>
			</SuspenseWithPerf>
		</>
	);
}
