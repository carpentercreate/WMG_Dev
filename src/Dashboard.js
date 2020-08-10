import React from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	//useUser,
	AuthCheck,
	StorageImage,
	//useFirestoreDocData,
	//useFirestoreCollectionData,
} from "reactfire";
import {ThemeProvider} from "theme-ui";
import {motion} from "framer-motion";
import {MainView, Box} from "./components";
import LoginBtn from "./Auth";
import {toNumber} from "lodash";
//User
//const User = ({id}) => {
//	const db = useFirestore();
//	//const {FieldValue} = useFirestore;
//	const userref = db.collection("users").doc(id);
//	const profile = useFirestoreDocData(userref);

//	return <>{id ? <h1>{profile.name}</h1> : <h4>no user</h4>}</>;
//};
//function Loading() {
//	return (
//		<Box align="center" w={100}>
//			<motion.div
//				initial={{rotate: 0}}
//				style={{
//					width: "80px",
//					height: "10px",
//					background: "rgba(255,0,0,.5)",
//				}}
//				animate={{rotate: 360}}
//				transition={{
//					yoyo: Infinity,

//					duration: 3,
//				}}
//				className="Loading"
//			/>
//		</Box>
//	);
//}
function Progress({value = 0, goal = 4000}) {
	return (
		<>
			<motion.div layout style={{width: "100%"}}>
				<Box p={1} direction="x" justify="between">
					<p style={{color: "red"}}>
						Current: <br />${value}
					</p>
					<p style={{color: "red"}}>
						Goal: <br />${goal}
					</p>
				</Box>
				<motion.div
					layout
					initial={false}
					animate={{
						background: "red",
						height: "70px",
						width: `${(100 / goal) * value}vw`,
					}}
				/>
			</motion.div>
		</>
	);
}
function BigMoneyView({value}) {
	//rounding and masking fn
	return (
		<Box height="auto">
			<Progress value={value} />
			<motion.h1
				style={{
					fontSize: "7em",
					fontWeight: "initial",
				}}
				layout>
				<span style={{fontSize: ".6em", fontWeight: "initial"}}>$</span>
				{value || 0}
			</motion.h1>
		</Box>
	);
}
// Document reference
function NumberField({value, name, onChange, onSubmit}) {
	return (
		<motion.div
			style={{display: "flex", width: "100vw", flexDirection: "column"}}>
			<BigMoneyView value={value} />
			<motion.input
				name={name}
				type="number"
				value={value}
				onChange={onChange}
			/>
			<motion.button onClick={() => onSubmit(value)}>submit</motion.button>
		</motion.div>
	);
}
function GrossIncome({id}) {
	const [value, setValue] = React.useState();
	const db = useFirestore();
	const {FieldValue} = useFirestore;
	const inc = (v) => FieldValue.increment(v);
	const songsref = db.collection("songs");
	const docref = songsref.doc(id);
	const updateGross = (val) => docref.update({grossIncome: inc(val)});

	return (
		<NumberField
			name="Gross"
			onChange={(e) => setValue(toNumber(e.target.value))}
			value={value}
			onSubmit={() => updateGross(value)}
		/>
	);
}

//function Providers() {
//	const db = useFirestore();
//	const user = useUser();
//	const accountsRef = db
//		.collection("accounts")
//		.where("admins", "array-contains", user.email);
//	const accounts = useFirestoreCollectionData(accountsRef, {idField: "id"});
//	const selectedAccount = accounts[0];
//	const songsRef = db
//		.collection("songs")
//		.where("interestedParties", "array-contains", selectedAccount.id);
//	const songs = useFirestoreCollectionData(songsRef, {idField: "id"});
//	//const selectedSong = songs[0];
//	//const journalsRef = db
//	//	.collection("journals")
//	//	.where("songID", "==", selectedSong.id);
//	//const journals = useFirestoreCollectionData(journalsRef, {idField: "id"});

//	//const [menuIsOpen, toggleMenu] = useToggle(false);
//	//const [selected, setSelected] = useState();
//	return <>hi</>;
//}

export function Dashboard() {
	return (
		<>
			<ThemeProvider
				theme={{colors: {background: "white", text: "black", primary: "red"}}}>
				<>
					<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
						<AuthCheck fallback={<LoginBtn />}>
							<>
								<Box bg="red" h="100px">
									<SuspenseWithPerf fallback={""} traceId="ss">
										<StorageImage
											width="90px"
											storagePath="images/logo-black.png"
										/>
									</SuspenseWithPerf>
								</Box>

								<MainView>
									<GrossIncome id="jesusAtTheCenter" />
								</MainView>
							</>
						</AuthCheck>
					</SuspenseWithPerf>
				</>
			</ThemeProvider>
		</>
	);
}
