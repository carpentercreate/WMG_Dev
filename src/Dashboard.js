import React from "react";
import {
	useFirestore,
	SuspenseWithPerf,
	//useUser,
	//AuthCheck,
	//StorageImage,
	useFirestoreDocData,
	//useFirestoreCollectionData,
} from "reactfire";
import {Stack, Page, Frame} from "framer";
//const red = "#DC3F32";
//User
//const User = ({id}) => {
//	const db = useFirestore();
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
function ThemeEditor({
	initial = {
		color: {
			group: {
				primary: {
					background: "#DC3F32",
					color: "#000",
				},
				dark: {
					background: "#000",
					color: "#fff",
				},
				darkPrimary: {
					background: "#000",
					color: "#DC3F32",
				},
				light: {
					background: "#fff",
					color: "#000",
				},
				lightPrimary: {
					background: "#fff",
					color: "#DC3F32",
				},
				muted: {
					background: "lightgray",
					color: "black",
				},
			},
		},
	},
	...rest
}) {
	const db = useFirestore();
	const theme = db.collection("views").doc("theme");
	return (
		<Frame
			height={40}
			width={110}
			radius={4}
			{...initial.color.group.primary}
			style={{cursor: "pointer"}}
			whileHover={{scale: 1.1}}
			shadow={"5px 15px 30px 0px rgba(0,0,0,.20)"}
			onTap={theme.set(initial)}
			{...rest}>
			setTheme
		</Frame>
	);
}
function Main() {
	const db = useFirestore();
	//const user = useUser();
	const themeref = db.collection("views").doc("theme");
	const theme = useFirestoreDocData(themeref);

	return (
		<Frame backgroundColor="white" width="100vw" height="100vh">
			<Stack direction="horizontal" gap={6} alignment="start">
				{[
					"GROSS INCOME",
					"TOP SOURCES",
					"TOP PROGRAMS",
					"TOP PROGRAMS",
					"TOP PROGRAMS",
					"TOP PROGRAMS",
					"TOP PROGRAMS",
				].map((v) => (
					<Frame
						key={v}
						height={40}
						radius={2}
						width={110}
						whileTap={{
							scale: 0.95,
						}}
						whileHover={{scale: 1.05}}
						style={{
							fontSize: ".7em",
							cursor: "pointer",
						}}
						{...theme.color.group.primary}
						shadow="0px 24px 20px -10px rgba(0,0,0,.2)">
						{v}
					</Frame>
				))}
			</Stack>
			<Page
				overflow="visible"
				shadow="12px 30px 52px 0px rgba(0,0,0,.2)"
				center
				radius={24}
				direction="horizontal"
				currentPage={0}>
				{[{name: "Gross Income"}, {name: "Top Soures"}, {name: "Top"}].map(
					(v) => (
						<Frame
							key={v.name}
							backgroundColor={"white"}
							shadow="5px 15px 50px 0px rgba(0,0,0,.3)">
							{v.name}
						</Frame>
					)
				)}
			</Page>
			<ThemeEditor bottom={30} center="x" />
		</Frame>
	);
}

export function Dashboard() {
	return (
		<>
			<SuspenseWithPerf fallback={"loading"} traceId={"hello"}>
				<Main />
			</SuspenseWithPerf>
		</>
	);
}
