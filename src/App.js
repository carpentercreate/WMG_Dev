/**@jsx jsx */
import React, {useState, useEffect, useRef, Suspense} from "react";
import {useMediatedState} from "react-use";
import {
	jsx,
	ThemeProvider,
	Avatar,
	Heading,
	Text,
	Slider,
	Logobox,
	Label,
} from "theme-ui";
import {When} from "react-if";
import {
	Color,
	Frame,
	Page,
	useCycle,
	useSpring,
	useMotionValue,
	useTransform,
	AnimatePresence,
	Stack,
} from "framer";
import _ from "lodash";
import * as I from "react-icons/fi";
import matchSorter from "match-sorter";

import {
	SuspenseWithPerf,
	useUser,
	useAuth,
	useStorage,
	StorageImage,
	useStorageDownloadURL,
	useFirestoreCollectionData,
	useFirestoreCollection,
	useFirestore,
	useFirestoreDocData,
	useFirestoreDoc,
} from "reactfire";
import {createReducerContext} from "react-use";

const kindof = require("kind-of");
const red = Color("#Dc3f32");
const white = Color("#fff");

export default ({children}) => {
	const theme = {
		colors: {
			primary: "#dc3f32",
			text: "#333",
			background: "white",
			modes: {
				dark: {
					background: "#000",
					text: "white",
					primary: "#dc3f32",
				},
			},
		},
	};
	return (
		<ThemeProvider theme={theme}>
			<Logo fallback={<Auth />}>
				<Dashboard />
			</Logo>
		</ThemeProvider>
	);
};

function Auth({fallback = "no user"}) {
	const [token, setToken] = useState();
	const Auth = useAuth;
	const auth = Auth();
	var googleProvider = new Auth.GoogleAuthProvider();
	var twitterProvider = new Auth.TwitterAuthProvider();
	var githubProvider = new Auth.GithubAuthProvider();

	const {
		createUserWithEmailAndPassword,
		signInWithEmailAndPassword,
		signInWithRedirect,
		getRedirectResult,
	} = auth;
	function Login({children}) {
		return (
			<button onClick={() => signInWithRedirect(googleProvider)}>Login</button>
		);
	}
	return <Login />;
}
export function Dashboard() {
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<div className="Dashboard">
			<div>
				<SuspenseWithPerf fallback="user">
					<User />
				</SuspenseWithPerf>
			</div>
		</div>
	);
}

function User() {
	const user = useUser();
	const db = useFirestore();
	const profileRef = db.collection("users").doc(user.uid);
	const profile = useFirestoreDocData(profileRef, {idField: "id"});
	const accountsRef = db
		.collection("accounts")
		.where("admins", "array-contains", user.email);
	const accounts = useFirestoreCollectionData(accountsRef, {
		idField: "id",
	});
	const [selected, select] = useState(accounts[1].id);
	return (
		<div>
			<Logo />
			<select value={selected} onChange={(e) => select(e.target.value)}>
				{accounts.map((l) => (
					<option key={l.id} value={l.id}>
						{l.id}
					</option>
				))}
			</select>
			<Account id={selected} />
			<div
				className="profile"
				style={{
					background: "lightgray",
					width: "40vw",
					display: "flex",
					flexDirection: "column",
				}}>
				<h4>Profile</h4>
				<li>
					<Avatar sx={{maxWidth: 40}} src={user.providerData[0].photoURL} />

					<input type="file" />
				</li>
				<li>
					<h6>Display Name:</h6> <input placeholder={user.displayName} />
				</li>
				<li>
					<h6>UID:</h6> <input placeholder={user.uid} />
				</li>
			</div>
		</div>
	);
}
function Account({id}) {
	const db = useFirestore();
	const accountRef = db.collection("accounts").doc(id);
	const account = useFirestoreDocData(accountRef, {idField: "id"});

	return (
		<SuspenseWithPerf falback="loading">
			<Reports reports={account.reports} />
		</SuspenseWithPerf>
	);
}
function Songs({account}) {
	const [songId, setSongId] = useState("happyBirthDay");
	const db = useFirestore();
	const songsRef = db
		.collection("songs")
		.where("accounts", "array-contains", account.id);
	const songs = useFirestoreCollectionData(songsRef, {idField: "id"});
	const songref = (id) => db.collection("songs").doc(id);
	const song = useFirestoreDocData(songref(songId));

	return (
		<div style={{background: "lightgray"}}>
			<h2>SONGS:</h2>
			<React.Fragment>
				{songs.map((song) => (
					<div key={song.id} className="flex column">
						<button onClick={() => setSongId(song.id)}>{song.name}</button>
					</div>
				))}

				<SuspenseWithPerf falback="loading">
					<div style={{borderTop: "4px solid black"}}>
						<h4>Song ID:</h4>
						<p>{song.name}</p>
						<h4>Writers:</h4>
						<p>{_.join(song.writers, ", ")}</p>
					</div>
				</SuspenseWithPerf>
			</React.Fragment>{" "}
		</div>
	);
}
export function useCollectionRef(name = "test") {
	const db = useFirestore();
	const [ref, setRef] = useState(db.collection(name));

	const setCollectionRef = (newId) => setRef(db.collection(newId));

	return [ref, {setCollectionRef}];
}
export function useQuery(ref) {
	const [query, setQuery] = useState(ref);
	const where = (...args) => setQuery(ref.where(...args));
	const orderBy = (...args) => setQuery(ref.orderBy(...args));
	const limitTo = (...args) => setQuery(ref.limitTo(...args));
	const startAt = (...args) => setQuery(ref.startAt(...args));

	return [query, {where, orderBy, limitTo, startAt}];
}
export function useDoc(path) {
	const db = useFirestore;
	const docref = db().doc(path);
	const doc = useFirestoreDocData(docref, {idField: "id"});
	const {FieldValue} = db;
	const {arrayUnion, arrayRemove, increment} = FieldValue;
	const removeField = (k) => docref.update({[k]: FieldValue.delete()});
	const merge = (v) => docref.set(v, {merge: true});
	const {set, update} = docref;
	const doc = useFirestoreDocData(docref);

	return [
		doc,
		{
			ref: docref,
			set,
			merge,
			update,
			arrayUnion,
			arrayRemove,
			increment,
			removeField,
			deleteArrayItems,
			updateArrayItems,
			inc,
		},
	];
}
function Reports(props) {
	const [songId, setSongId] = useState("happyBirthDay");
	const songsRef = db
		.collection("songs")
		.where("accounts", "array-contains", account.id);
	const songs = useFirestoreCollectionData(songsRef, {idField: "id"});
	const songref = (id) => db.collection("songs").doc(id);
	const song = useFirestoreDocData(songref(songId));

	return (
		<div style={{background: "lightgray"}}>
			<h2>Reports:</h2>
		</div>
	);
}
//- Top Activity
//- Top Assets
//- Top Earnings
//- Top Licensed
//- Top Paid (people/companies)
//- Top Products
//- Top Songs
//- Top Sources
//- Top Territory
/////////////////////Styled Components
export function Logo({children}) {
	const [current, cycle] = useCycle("on", "off");
	const variants = {
		on: {
			background: "#fff",
		},
		off: {
			background: "black",
		},
		whileHover: {
			scale: 1.087,
		},
		whileTap: {
			scale: 0.4,
			rotate: 360,
			transition: {
				type: "spring",
				damping: 600,
			},
		},
	};
	return (
		<Frame
			size={60}
			style={{cursor: "pointer"}}
			overflow="visible"
			initial={{border: 3, rotate: 0}}
			onTap={() => cycle()}
			variants={variants}
			radius={100}
			scale={1}
			top={0}
			right={0}
			animate={current}
			whileHover="whileHover"
			whileTap="whileTap"
			background={red}>
			<Frame
				size={28}
				x={-3}
				overflow="visible"
				background="rgba(0,0,0,0)"
				center>
				<Frame
					width={8}
					height={28}
					center
					skewX={-33}
					//originY={1}
					//originX={1}
					//x={-4}
					//y={-14}
					background={red}
				/>
				<Frame
					width={8}
					height={28}
					center
					skewX={-33}
					//originY={0.5}
					//x={}
					x={12}
					background={red}
				/>
				<Frame
					shadow={`inset 0px 16px 0px ${red.toValue()}`}
					width={8}
					height={28}
					center
					skewX={-33}
					x={-12}
					background="rgba(0,0,0,0)"
					style={{mixBlendMode: "color"}}
				/>
			</Frame>
		</Frame>
	);
}
