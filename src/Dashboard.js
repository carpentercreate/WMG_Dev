import React, {useState} from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	useUser,
	AuthCheck,
	useFirestoreDocData,
	useFirestoreCollectionData,
} from "reactfire";
import {MdDragHandle} from "react-icons/md";

import * as I from "react-icons/fi";
import {Frame, Page} from "framer";
import {J, Menu} from "./components";
//import {useCollection, l} from "./Utilities";
import LoginBtn from "./Auth";
import {motion} from "framer-motion";
import {useToggle} from "react-use";

//const {stringify: st} = JSON;
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
	//const {FieldValue} = useFirestore;
	const userref = db.collection("users").doc(id);
	const profile = useFirestoreDocData(userref);
	const update = (v) => userref.set(v, {merge: true});
	const remove = (v) => userref.set(v);

	return <>{id ? <h1>{profile.name}</h1> : <h4>no user</h4>}</>;
};
function Views({children, selected, cb, isOpen, current, toggle, ...rest}) {
	return (
		<Frame height="100vh" width="100vw" top={0} {...rest}>
			<Menu
				style={{position: "absolute", zIndex: "999999"}}
				selected={selected}
				cb={cb}
				isOpen={isOpen}
				toggle={toggle}
				height="12vh"
			/>

			<Page
				defaultEffect="pile"
				size="100%"
				top={0}
				overflow="visible"
				wheelEnabled="true"
				paddingTop={150}
				currentPage={current}
				direction="vertical"
				gap={0}
				background="rgba(0,0,0,1)">
				{children}
			</Page>
		</Frame>
	);
}
function View({
	children,
	colors = {bg: "black", text: "white", primary: "red"},
	style,
	isMain,
	...rest
}) {
	return (
		<Frame
			style={{color: colors.text, textAlign: "center", ...style}}
			size="100%"
			//height={isMain ? "100%" : "88%"}
			background={isMain ? colors.bg : "#222"}
			{...rest}>
			{children}
		</Frame>
	);
}

function SongForm({
	fields = [
		{
			name: "name",
			label: "Name",
			type: "Text",
		},
		{
			name: "gross",
			label: "Name",
			type: "number",
		},
	],
}) {
	return (
		<motion.ul
			layout
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "space-evenly",
				justifyContent: "center",
				margin: "12px",
			}}>
			{fields.map((v, k) => {
				return (
					<li
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "left",
							width: "100%",
						}}>
						<label style={{alignSelf: "flex-start"}} htmlFor={v.name}>
							{v.name}
						</label>
						<input
							id={v.name}
							style={{
								margin: "12px 0px",
								fontSize: "1.4em",
								border: "0px",
								width: "100%",
								background: "rgba(255,255,255,0.2)",
							}}
							key={v.name}
							{...v}
						/>
					</li>
				);
			})}
		</motion.ul>
	);
}
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
	//const selectedSong = songs[0];
	//const journalsRef = db
	//	.collection("journals")
	//	.where("songID", "==", selectedSong.id);
	//const journals = useFirestoreCollectionData(journalsRef, {idField: "id"});

	const [menuIsOpen, toggleMenu] = useToggle(false);
	const [selected, setSelected] = useState();

	return (
		<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
			<>
				<User id={user.uid} />

				<Views
					selected={selected}
					cb={setSelected}
					isOpen={menuIsOpen}
					toggle={(v) => toggleMenu(v)}>
					<View isMain={true}>1</View>

					<View
						overflow="hidden"
						radius="24px 24px 0px 0px"
						y={"-8vh"}
						style={{height: "108vh"}}>
						<MdDragHandle
							size="33px"
							color="#555"
							style={{transform: "scaleX(1.6)", margin: 8}}
						/>
						<SongForm />
					</View>
				</Views>
			</>
		</SuspenseWithPerf>
	);
}
function name({children, ...rest}) {
	return <motion.div layout className="name" {...rest} />;
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
