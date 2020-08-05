import React, {useState} from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	useUser,
	AuthCheck,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
import * as I from "react-icons/fi";
import {Flex, Box, J, Menu} from "./components";
import {useCollection, l} from "./Utilities";
import LoginBtn from "./Auth";
import {motion, AnimatePresence} from "framer-motion";
import {useToggle} from "react-use";

const {stringify: st} = JSON;
const Json = ({name, data, ...rest}) => {
	return (
		<>
			<h2>{name}</h2>
			<J src={data} {...rest} />
		</>
	);
};
//User
const User = ({id}) => {
	const db = useFirestore();
	const {FieldValue} = useFirestore;
	const userref = db.collection("users").doc(id);
	const profile = useFirestoreDocData(userref);
	const update = (v) => userref.set(v, {merge: true});
	const remove = (v) => userref.set(v);

	return (
		<Json
			name="User"
			data={profile}
			onAdd={update}
			onDelete={remove}
			onEdit={update}
		/>
	);
};
//Accounts
const Accounts = ({account}) => {
	return <Json name="Accounts" data={account} />;
};

///Songs
const Songs = ({songs}) => {
	return <Json name="Songs" data={songs} />;
};

///Journals
const Journals = ({songID}) => {
	return <Json name="Journals for Song #1" data={songID} />;
};

function Layout() {
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
	const journalsRef = db
		.collection("journals")
		.where("songID", "==", selectedSong.id);
	const journals = useFirestoreCollectionData(journalsRef, {idField: "id"});

	const [menuIsOpen, toggleMenu] = useToggle(false);
	const variants = {
		initial: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		exit: {opacity: 0},
	};
	return (
		<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
			<>
				<Flex direction="column" style={{minHeight: "100vh"}}>
					<Menu isOpen={menuIsOpen} cb={toggleMenu} />
					<Box fr={0} min="80px">
						<Box style={{margin: "24px"}} justify="flex-start">
							<motion.h2 layout> WMG</motion.h2>
						</Box>

						<Box
							fr={0}
							min="auto"
							cursor="pointer"
							onClick={() => toggleMenu()}>
							<I.FiMenu style={{margin: "24px"}} size="23px" color="#000" />
						</Box>
					</Box>
					<Box
						bg="lightgray"
						direction="column"
						style={{height: "auto", overflow: "scroll"}}>
						{user && <User id={user.uid} />}
						<SuspenseWithPerf fallback={"loading data"} traceId={"hello"}>
							<Accounts account={selectedAccount} />
							<Songs songs={songs} />
							<Journals songID={selectedSong} />
						</SuspenseWithPerf>
					</Box>
					<Box bg="primary" fr={0} min="80px" />
				</Flex>
			</>
		</SuspenseWithPerf>
	);
}
export function Dashboard() {
	return (
		<>
			<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
				<AuthCheck fallback={<LoginBtn />}>
					<Layout />
				</AuthCheck>
			</SuspenseWithPerf>
		</>
	);
}
