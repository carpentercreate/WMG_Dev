import React from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	useUser,
	AuthCheck,
	StorageImage,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
import {ThemeProvider} from "theme-ui";
import {motion} from "framer-motion";
import {MainView, J} from "./components";
import LoginBtn from "./Auth";

//User
const User = ({id}) => {
	const db = useFirestore();
	//const {FieldValue} = useFirestore;
	const userref = db.collection("users").doc(id);
	const profile = useFirestoreDocData(userref);

	return <>{id ? <h1>{profile.name}</h1> : <h4>no user</h4>}</>;
};
function Loading() {
	return (
		<motion.div
			initial={{rotate: 0}}
			style={{
				width: "80px",
				height: "10px",
				background: "rgba(255,0,0,.5)",
			}}
			animate={{rotate: 360}}
			transition={{
				yoyo: Infinity,

				duration: 3,
			}}
			className="Loading"
		/>
	);
}
function Song({songs}) {
	return (
		<div>
			<SuspenseWithPerf fallback={<Loading />}>
				<StorageImage
					style={{width: "120px"}}
					storagePath="images/adam-carpentar.jpg"
				/>
			</SuspenseWithPerf>
			<h1>{songs[0].name}</h1>
			<h4>{songs[0].id}</h4>
		</div>
	);
}
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
		<ThemeProvider>
			<SuspenseWithPerf fallback={<Loading />} traceId={"hello"}>
				<MainView>
					<Song songs={songs} />
				</MainView>
			</SuspenseWithPerf>
		</ThemeProvider>
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
