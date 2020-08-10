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
import {motion, AnimateSharedLayout, AnimatePresence} from "framer-motion";
import {MainView, Box} from "./components";
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
		<Box align="center" w={100}>
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
		</Box>
	);
}
function Song({songs}) {
	return (
		<Box
			h="auto"
			bg="#000"
			color="#fff"
			justify="center"
			shadow="0px 0px 90px -31px rgba(244,244,244, .4)">
			<SuspenseWithPerf fallback={<Loading />}>
				<Box align="center" w={120} alignSelf="center" radius="120px">
					<StorageImage
						style={{width: "120px"}}
						storagePath="images/adam-carpentar.jpg"
					/>
				</Box>
			</SuspenseWithPerf>
			<Box whileHover={{color: "#fff"}}>
				<h1 layout>{songs[0].name}</h1>
				<h4 layout>{songs[0].id}</h4>
			</Box>
		</Box>
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
		<ThemeProvider
			theme={{
				colors: {text: "#fff", primary: "#f00", background: "#000"},
			}}>
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
